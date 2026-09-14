-- [v80.9] 질문 번호 칸 추가 — Supabase SQL Editor 에 통째로 붙여 넣고 Run
-- 이게 없어도 앱은 돌아간다(번호 빼고 저장). 대신 편집기에서 질문을 고치면 통과 기록이 사라진다.
-- 여러 번 실행해도 안전하다.
alter table submissions add column if not exists question_id text;
create index if not exists submissions_question_id_idx on submissions (question_id);
