-- 말하는 수학 — AI 사용량·비용 기록  [v80.0]
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여 넣고 Run.  여러 번 실행해도 안전하다.
--
-- 이 표는 서버 함수(ai)만 쓴다. RLS를 켜고 정책을 하나도 안 만들어서,
-- 앱(공개 키)으로는 읽을 수도 쓸 수도 없다 → 비용 기록이 밖으로 새지 않는다.

create table if not exists public.ai_usage (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  day           date        not null default ((now() at time zone 'Asia/Seoul')::date),  -- 한국 날짜 기준
  kind          text        not null,              -- 'student'(채점 등, Gemini) | 'gen'(문제 출제, Opus)
  task          text        not null,              -- grade · hint · blanks · talk · appeal · report · comment · quiz · verify
  provider      text        not null,              -- google | anthropic
  model         text        not null,
  student_id    text,
  grade_id      text,
  unit_id       text,
  input_tokens  integer     not null default 0,
  output_tokens integer     not null default 0,
  cost_usd      numeric(12,6) not null default 0,   -- 공식 단가로 계산한 추정치
  ok            boolean     not null default true,
  error         text
);
create index if not exists ai_usage_day_kind    on public.ai_usage (day, kind);
create index if not exists ai_usage_day_student on public.ai_usage (day, student_id);
alter table public.ai_usage enable row level security;

-- 오늘(한국 날짜) 쓴 돈과 그 학생의 호출 수 — 서버가 한도를 확인할 때 쓴다
create or replace function public.dd_ai_today(p_kind text, p_student text)
returns table (spent numeric, student_calls bigint)
language sql stable security definer set search_path = public as $$
  select
    coalesce((select sum(cost_usd) from ai_usage
              where day = (now() at time zone 'Asia/Seoul')::date and kind = p_kind), 0),
    coalesce((select count(*) from ai_usage
              where day = (now() at time zone 'Asia/Seoul')::date and student_id = p_student), 0);
$$;

-- 기간별 요약 (작업·모델별)
create or replace function public.dd_ai_report(p_from date, p_to date)
returns table (kind text, task text, model text, calls bigint,
               input_tokens bigint, output_tokens bigint, cost_usd numeric)
language sql stable security definer set search_path = public as $$
  select kind, task, model, count(*), sum(input_tokens), sum(output_tokens), sum(cost_usd)
  from ai_usage where day between p_from and p_to
  group by kind, task, model order by sum(cost_usd) desc;
$$;

-- 기간별 학생 1명당 비용 (채점 등 학생 사용분만)
create or replace function public.dd_ai_report_students(p_from date, p_to date)
returns table (student_id text, calls bigint, cost_usd numeric)
language sql stable security definer set search_path = public as $$
  select student_id, count(*), sum(cost_usd)
  from ai_usage where day between p_from and p_to and kind = 'student'
  group by student_id order by sum(cost_usd) desc;
$$;

-- 앱(공개 키)이 이 함수들을 부르지 못하게. 서버 함수는 비밀 키로 부르므로 영향 없음.
revoke all on function public.dd_ai_today(text, text)             from public, anon, authenticated;
revoke all on function public.dd_ai_report(date, date)            from public, anon, authenticated;
revoke all on function public.dd_ai_report_students(date, date)   from public, anon, authenticated;
