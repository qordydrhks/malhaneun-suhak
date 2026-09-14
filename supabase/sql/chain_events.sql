-- 생각 사슬(chain) — 학생이 고른 선택지·입력값 기록  [chain v0.7]
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여 넣고 Run.  여러 번 실행해도 안전하다.
--
-- 이 표가 없어도 앱은 돌아간다. 기록은 학생 폰에 모아 두었다가, 표가 생기면 그때 보낸다.
--
-- 누가 무엇을 할 수 있나
--   · 앱(공개 키): 기록을 "넣기"만 가능. 읽기·고치기·지우기 불가 → 학생 이름이 밖으로 새지 않는다
--   · 선생님 보기 화면: chain_stats() 로 "이름 없이 개수만" 모아서 본다
--   · 학생별로 보고 싶으면: 대시보드 → Table Editor → chain_events (대시보드 로그인 필요)

create table if not exists public.chain_events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  day         date        not null default ((now() at time zone 'Asia/Seoul')::date),  -- 한국 날짜 기준
  session_id  text        not null,   -- 문제 하나를 한 번 푼 단위 (다시 풀면 새 값)
  student     text,                   -- 학생이 적은 이름 (안 적으면 비어 있음)
  problem_id  text        not null,   -- t01, q02 …
  node_key    text,                   -- 어느 단계에서
  kind        text        not null,   -- start | found | nocond | pick | solve | hint | finish | quit
  ok          boolean,                -- pick·solve 가 맞았는지
  choice      text,                   -- 고른 선택지 글자 / 입력한 값 / 누른 문장 조각
  extra       jsonb                   -- finish: 힌트 수·계산 고친 수·걸린 초
);
create index if not exists chain_events_problem on public.chain_events (problem_id, node_key, kind);
create index if not exists chain_events_day     on public.chain_events (day);

alter table public.chain_events enable row level security;

-- 넣기만 허용 (값 모양이 이상한 것은 막음)
drop policy if exists chain_events_insert on public.chain_events;
create policy chain_events_insert on public.chain_events
  for insert to anon, authenticated
  with check (
    kind in ('start','found','nocond','pick','solve','hint','finish','quit')
    and char_length(session_id) <= 40
    and char_length(problem_id) <= 20
    and char_length(coalesce(node_key,'')) <= 40
    and char_length(coalesce(choice,''))   <= 300
    and char_length(coalesce(student,''))  <= 40
  );
grant insert on public.chain_events to anon, authenticated;

-- 선생님 보기: 이름 없이 개수만 모아서 돌려준다
create or replace function public.chain_stats(p_from date default null, p_to date default null)
returns table (problem_id text, node_key text, kind text, ok boolean, choice text, n bigint, sessions bigint)
language sql stable security definer set search_path = public as $$
  select problem_id, node_key, kind, ok, choice, count(*), count(distinct session_id)
  from chain_events
  where (p_from is null or day >= p_from)
    and (p_to   is null or day <= p_to)
  group by problem_id, node_key, kind, ok, choice;
$$;
revoke all on function public.chain_stats(date, date) from public;
grant execute on function public.chain_stats(date, date) to anon, authenticated;

-- ────────────────────────────────────────────────────────────
-- (필요할 때만) 테스트하며 쌓인 기록을 지우고 새로 시작하려면 아래 한 줄의 맨 앞 -- 를 지우고 Run
-- delete from public.chain_events;
