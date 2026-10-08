-- 새 앱(app/)이 기록에 더 남기는 칸 3개 (2026-10-08)
-- Supabase → SQL Editor 에 통째로 붙여 넣고 Run. 이미 있으면 그냥 지나간다.
-- 옛 앱(dodream.html)은 이 칸을 모르고 무시하므로 영향 없음. 칸이 없어도 새 앱은 이 칸만 빼고 저장한다.
alter table submissions add column if not exists help    text;   -- 쓴 도움: none · kw(키워드) · short(짧은 설명) · long(긴 설명)
alter table submissions add column if not exists stage   text;   -- 어떻게 통과/멈췄나: first · reask · kw · nextday · again · lock · timeout · practice
alter table submissions add column if not exists quality int;    -- 이해 점수 품질(100 · 90 · 85 · 75 · 60 · 복습 80) — 선생님만 봄
