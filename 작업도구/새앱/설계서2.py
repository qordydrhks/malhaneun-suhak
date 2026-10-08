# -*- coding: utf-8 -*-
"""새 앱 설계서 2판 (2026-10-07) — 게임식 새 앱 전체 설계. 1판(10/3) + 10/6 마스터 결정(도움 아이템·통과 방식·블랙홀·지도 2판) + GPT 검토의 '만들기 전 정할 것'을 한데.
   python -X utf8 작업도구/새앱/설계서2.py → 작업도구/새앱/설계서_새앱_v2.pdf
   표시: <b class="k">확정</b> = 마스터 결정 · <b class="w">제안</b> = Claude 안(마스터 결정 필요)
"""
import io, os, shutil, subprocess, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))

CSS = '''@page{size:A4;margin:9mm 10mm}
body{font:8.3pt/1.42 "Pretendard","Malgun Gothic",sans-serif;color:#1f2430;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1{font-size:15.5pt;margin:0}.sub{color:#5b6270;font-size:8.6pt;margin:2px 0 6px}
h2{font-size:10pt;margin:8px 0 3px;padding-bottom:2px;border-bottom:1.6px solid #1f2430;break-after:avoid}
h3{font-size:8.8pt;margin:5px 0 2px;color:#2f5fb3}
.cols{columns:2;column-gap:7mm}.cols section{break-inside:avoid}
ul,ol{margin:0;padding-left:15px}li{margin:1px 0}
table{width:100%;border-collapse:collapse;font-size:7.9pt;margin:2px 0 4px}td,th{border:1px solid #d6dae2;padding:1.5px 4px;text-align:left;vertical-align:top}
th{background:#f1f3f7;font-weight:700}
.k{color:#15803d;font-weight:700}.w{color:#b45309;font-weight:700}.x{color:#8b93a1}.r{color:#b91c1c;font-weight:700}
.box{border:1px solid #d6dae2;border-radius:6px;padding:5px 8px;margin:4px 0;background:#fafbfc;break-inside:avoid}
.flag{border-left:4px solid #b91c1c;background:#fff6f5}
.page{break-before:page}
.flow{display:flex;flex-wrap:wrap;gap:3px;align-items:center;margin:3px 0}
.flow span{border:1px solid #9aa3b2;border-radius:5px;padding:1px 6px;background:#fff;white-space:nowrap}
.flow i{color:#8b93a1;font-style:normal}
.chk{color:#5b6270;font-size:7.6pt}
.lines span{display:block;border-bottom:1px solid #c9a36b;height:14px}'''

BODY = '''
<h1>새 앱 설계서 2판 — 말하는 수학 · 우주 탐험 (숫자 친구들)</h1>
<div class="sub">2026-10-07 · 1판(10/3) + 10/6 결정(도움 아이템 · 통과 방식 · 블랙홀 관문 · 지도 2판) + 만들기 전에 정할 것 · <b class="k">확정</b> = 마스터 결정 · <b class="w">제안</b> = 결정해 주실 것</div>
<div class="box"><b>대전제</b> ① 아이가 개념을 정확히 이해했는지 확인하고 이해하게 만든다 ② 어른이 그 이해도를 정확히 판단한다.
<b>게임은 이 둘을 돕는 만큼만</b> — 속도 순위·하트 깎기·찍어서 받는 보상은 넣지 않는다. 문제를 푸는 화면에는 지도·상점·통계를 띄우지 않는다.</div>

<div class="cols">
<section><h2>1. 한 문장 · 첫 판 범위</h2><ul>
<li><b>한 문장</b>: 아이가 우주를 탐험하며 행성(소단원)마다 친구의 질문에 말로 답하고, 이해한 만큼 우주가 밝아진다.</li>
<li><b class="k">확정</b> 첫 판 과정 = <b>초4-2</b>(학원 4학년 시범). 다음 = 초6-2(설계 끝남) · 초5-2. 옛 앱 v92 는 그대로 두고 참고만.</li>
<li><b class="k">확정</b> 첫 판에 넣음: 로그인·기기 등록 · 친구 고르기 · <b>지도</b> · 질문 스테이지(1·2·3회차) · 도움 아이템 · 문제 풀기 · 응용 보너스 · <b>타이머</b> · 블랙홀 관문 · 등급 · 나의 기록 · 7일 복습</li>
<li><b class="w">제안</b> 둘째 판으로: 상점 꾸미기 전체 · 펫 · 스피드 연산 · 용어 맞히기 · 메달 보관함 · 새 선생님 대시보드 · 새 학부모 리포트(그동안은 옛 화면이 새 기록을 읽음)</li></ul></section>

<section><h2>2. 용어 하나로 (화면마다 같은 말)</h2>
<table><tr><th>교과</th><th>우주</th><th>아이에게 보이는 말</th></tr>
<tr><td>학기(과정)</td><td>은하</td><td>"4학년 2학기 은하"</td></tr>
<tr><td>대단원</td><td>별(별계)</td><td>"사각형 별"</td></tr>
<tr><td>소단원</td><td>행성</td><td>"평행사변형 행성"</td></tr>
<tr><td>1회차</td><td>행성 탐사</td><td>행성에 착륙</td></tr>
<tr><td>2회차</td><td>달 탐사</td><td>행성을 도는 달</td></tr>
<tr><td>3회차(계단)</td><td>핵 탐사</td><td>행성을 잘라 핵으로</td></tr>
<tr><td>대단원 최종 질문</td><td>블랙홀 관문</td><td>별계 끝의 블랙홀</td></tr>
<tr><td>기본문제 · 응용</td><td>보급 임무 · 보너스 임무</td><td>"임무"</td></tr>
<tr><td>복습</td><td>다시 빛내기</td><td>흐려진 행성</td></tr></table>
<span class="chk">「스테이지」「미션」은 화면에 쓰지 않는다(GPT 검토: 한 대상을 여러 말로 부르지 않기).</span></section>

<section><h2>3. 화면 목록 (학생)</h2>
<table><tr><th>#</th><th>화면</th><th>하는 일</th></tr>
<tr><td>1</td><td>첫 화면 · 로그인</td><td>이름·비밀번호, 자동 로그인, 미등록 기기면 안내</td></tr>
<tr><td>2</td><td>친구 고르기</td><td>처음 한 번(나중에 바꾸기)</td></tr>
<tr><td>3</td><td>처음 안내</td><td>친구가 3~4장 · 건너뛰기</td></tr>
<tr><td>4</td><td><b>은하 지도(홈)</b></td><td>별·행성·달·핵 · 등급 배지 · 큰 단추 「오늘 갈 곳」</td></tr>
<tr><td>5</td><td>별계</td><td>대단원의 행성들 + 블랙홀</td></tr>
<tr><td>6</td><td>행성 입구</td><td>이번 탐사 질문 수 · 시간 · 출발</td></tr>
<tr><td>7</td><td><b>질문 화면</b></td><td>질문 하나 · 말하기 · 친구 반응</td></tr>
<tr><td>8</td><td>결과</td><td>점수 · 짚은 핵심 ✓ · 모범 답(통과일 때)</td></tr>
<tr><td>9</td><td>도움 꺼내기</td><td>되묻기 뒤 키워드·짧은·긴 설명 고르기</td></tr>
<tr><td>10</td><td>보급 임무</td><td>소단원 끝 기본문제 → 보너스</td></tr>
<tr><td>11</td><td>블랙홀 관문</td><td>대단원 최종 질문</td></tr>
<tr><td>12</td><td>나의 기록</td><td>별자리 · 한 번에/힌트 후/아직</td></tr>
<tr><td>13</td><td>우주 안내서</td><td>등급·점수·친구 설명(눌러서 보기)</td></tr>
<tr><td>14</td><td><span class="x">둘째 판</span> 상점 · 연습 공간</td><td>꾸미기 · 용어 맞히기 · 스피드 연산</td></tr></table></section>

<section><h2>4. 하루의 흐름 — 「오늘 갈 곳」</h2>
<div class="flow"><span>로그인</span><i>→</i><span>지도</span><i>→</i><span>오늘 갈 곳</span><i>→</i><span>행성 입구</span><i>→</i><span>질문 ×n</span><i>→</i><span>보급 임무</span><i>→</i><span>지도(행성이 빛남)</span></div>
<ul><li><b class="w">제안</b> 「오늘 갈 곳」 고르는 순서: ① 다시 빛내기(7일 복습: 힌트·실패만) ② 어제 잠겨 오늘 열린 질문 ③ 선생님이 연 회차의 다음 행성. 아이는 지도에서 다른 행성도 고를 수 있음(열린 곳만).</li>
<li><b class="k">확정</b> 회차는 선생님이 연다. 테스트 학생은 바로 열림.</li>
<li><b class="w">제안</b> 한 번 앉는 시간: 선생님이 "오늘 20분"처럼 정하면 시간이 되면 지금 질문까지만 하고 끝(수업 지장 방지).</li></ul></section>
</div>

<h2 class="page">5. 질문 스테이지 — 한 질문의 상태 흐름 (학습 엔진 하나로)</h2>
<div class="flow"><span>질문</span><i>→</i><span>답(말·글)</span><i>→</i><span>채점: 핵심별 판정</span><i>→ 다 짚음 →</i><span class="k">통과</span><i>· 빠짐 →</i><span>되묻기(빠진 핵심마다 1번)</span><i>→</i><span>다시 답</span><i>→ 그래도 빠짐 →</i><span>"살짝 부족해" + 도움 꺼내기 고르기</span></div>
<div class="cols">
<section><h3>도움 꺼내기 (10/6 확정)</h3>
<table><tr><th>고른 것</th><th>그다음</th><th>통과 인정</th></tr>
<tr><td>안 씀</td><td>그날 잠금 · 내일 다시</td><td>내일 통과하면 「다음 날」</td></tr>
<tr><td>키워드</td><td>같은 질문에 다시 답</td><td><b class="k">오늘 통과</b>(점수 조금 낮게)</td></tr>
<tr><td>짧은 설명</td><td>설명 → 다시 묻기는 <b>다음 날</b></td><td>다음 날 다시 묻기로 통과</td></tr>
<tr><td>긴 설명(그림)</td><td>같음</td><td>같음(점수 더 낮게)</td></tr></table>
<ul><li>되묻기는 방향만 · 틀린 생각엔 "살짝 부족해" + 키워드만 · 설명은 교재 개념 쪽 문장 그대로</li>
<li>다시 묻기 = 숫자·이름만 바꾼 새 질문(그림도 새로)</li>
<li>아이템을 쓴 답은 <b>어떤 아이템인지까지</b> 어른 화면에 남음</li></ul></section>
<section><h3>시간 · 잠금 · 끊김</h3><ul>
<li><b class="k">확정</b> 질문당 1회차 2분 · 2회차 3분 · 3회차 4분 · 계산 필요 +1분(3회차 제외) · 채점 시간 빼고 · 다 되면 떨어진 것과 같음</li>
<li><b class="w">제안</b> 그날 = 새벽 4시에 바뀜(밤늦게 한 것이 바로 풀리지 않게) · 선생님은 학생별로 잠금 풀기 가능(기록에 남음)</li>
<li><b class="w">제안</b> 이어하기: 질문 단계(답 전·되묻기 중·설명 본 뒤)를 이 기기와 서버에 저장 → 다시 들어오면 그 질문 처음부터(시간은 새로). 설명을 본 질문은 계속 「다음 날」</li>
<li><b class="k">확정</b> AI가 실패하면 가짜 통과·점수 없음 → "다시 해 볼까?" · 기록 안 함</li>
<li><b class="w">제안</b> 마이크가 막히거나 두 번 못 알아들으면 글 입력 칸이 저절로 열림(수식 기호 버튼 포함)</li></ul></section>
<section><h3>결과 화면</h3><ul>
<li><b class="k">확정</b> 통과: 점수 + 짚은 핵심 ✓ + 모범 답 · 친구 기뻐함(대사 10개 이상 랜덤)</li>
<li><b class="k">확정</b> 통과 못 함: 모범 답 안 보임(외워서 통과 방지) · "내일 열려요"</li>
<li>3회차(핵) = 계단 칸마다 같은 흐름. 칸의 채점 기준은 숫자 없는 전략 문장(이미 만든 방식)</li></ul></section>
<section><h3>보급 임무 · 보너스 · 블랙홀</h3><ul>
<li><b class="k">확정</b> 소단원 회차 질문을 다 통과 → 보급 임무(기본문제, 처음 결과만 점수) → 원하면 보너스(응용, 맞히면 가산점 · 틀려도 감점 없음 · 심화는 더 큼)</li>
<li><b class="k">확정</b> 블랙홀 관문(별계 끝): 1회차 = 단원에서 배운 낱말 말하기 · 2회차 = 내용 정리하기 · 3회차 = 어떻게 쓸지 + 느낀 점. 통과하면 큰 보상</li>
<li class="r">⚑ 3회차 「느낀 점」은 맞고 틀림이 없어 <b>채점·점수에서 빼고</b> 어른 화면에 그대로 보여 주자(대전제 ② — 운으로 맞는 채점이 되지 않게). 「어떻게 쓸지」만 채점.</li></ul></section>
</div>

<h2>6. 점수 · 등급 · 화폐 (실력과 노력을 섞지 않는다)</h2>
<div class="cols">
<section><h3>이해 점수 (선생님만 봄)</h3>
<table><tr><th>통과한 모습</th><th>품질</th></tr>
<tr><td>한 번에</td><td>1.0</td></tr>
<tr><td>되묻기 뒤</td><td>0.8</td></tr>
<tr><td>키워드 아이템 뒤(오늘)</td><td><b class="w">0.7</b></td></tr>
<tr><td>짧은 설명 → 다음 날</td><td><b class="w">0.5</b></td></tr>
<tr><td>긴 설명 → 다음 날 · 그냥 다음 날</td><td><b class="w">0.4</b></td></tr>
<tr><td>복습에서 회복</td><td>0.8(처음 한 번에보다 낮게)</td></tr></table>
<ul><li>질문 점수 = 회차 무게(1회차 1 · 2회차 1.5 · 3회차 2) × 품질 · 처음 통과만 · 다시 해도 안 오름</li>
<li>기본문제 넣음(처음 결과만) · 응용은 가산점</li>
<li><span class="w">제안</span> 아이템 품질값은 1판 표(힌트 0.7·다음 날 0.4)를 10/6 결정에 맞춰 나눈 것</li></ul></section>
<section><h3>등급 (아이에게 보임)</h3><ul>
<li><b class="k">확정</b> 루나(달) → 테라(지구) → 솔(태양) → 갤럭시(은하) → 코스모스(우주) · 학기마다 새로 · 지난 학기는 메달</li>
<li><b class="k">확정</b> 첫 소단원부터 바로 나옴 = 지금까지 푼 질문의 품질 <b>평균</b> + 깊이 관문(갤럭시는 2회차, 코스모스는 3회차까지)</li>
<li><b class="w">제안</b> 경계 루나 시작 · 테라 50 · 솔 70 · 갤럭시 80 · 코스모스 90 — 시범 기록 보고 조정</li>
<li>배지 옆에 진도(행성 n/33)를 같이 → 평균만 보고 "조금 하고 높은 등급" 착각 막기</li></ul>
<h3>두 가지 화폐 (10/6 확정: 서로 다름)</h3>
<table><tr><th></th><th>별가루(꾸미기)</th><th><b class="w">제안</b> 지혜 조각(도움)</th></tr>
<tr><td>얻는 곳</td><td>질문 처음 통과 · 임무 · 관문</td><td>복습 회복 · 관문 · 처음 시작할 때 조금 · (둘째 판) 연습 공간</td></tr>
<tr><td>쓰는 곳</td><td>상점 꾸미기(둘째 판)</td><td>질문 화면에서 바로 — 키워드 1 · 짧은 설명 2 · 긴 설명 3 (상점 없이도 첫 판에 됨)</td></tr>
<tr><td>성격</td><td>노력 보상</td><td>쉽게 못 사게 · 하루 상한</td></tr></table></section>
</div>
<div class="box flag"><b>⚑ 결정이 꼭 필요한 것 — 도움 화폐가 0인 아이</b><br>
설명이 아이템뿐이면, 화폐가 없는 아이는 막힌 질문을 <b>영영 이해할 길이 없다</b>(대전제 ① 위반). <b class="w">제안</b>: 잠긴 질문이 다음 날 열릴 때 <b>짧은 설명을 한 번 무료로</b> 볼 수 있게(품질 0.5 그대로) + 선생님 도움 알림. 이러면 "아이템 = 빨리 가는 길", "무료 = 하루 기다리는 길"이 되어 아무도 막히지 않는다.</div>

<div class="cols">
<section><h2>7. 지도 (시안 2판)</h2><ul>
<li>은하 한 장에 별(대단원) 6개 · 별마다 행성(소단원) 4~8개 · 행성 8종(고리·대륙·구름·폭풍·용암·얼음 …), 별빛 방향 그림자</li>
<li>1회차 통과 → 행성에 빛 · 2회차 → 달과 궤도가 생김 · 3회차 → 행성을 잘라 핵이 빛남 · 블랙홀 통과 → 별이 완성</li>
<li>흐려짐 = 복습할 행성 · 잠금 = 아직 안 연 회차(그림자)</li>
<li>배운 것: 성운을 노이즈로 꽉 채우면 지저분 → 색 수를 줄이고 검정 여백 넓게</li>
<li><b class="w">제안</b> 지도는 미리 그린 그림(SVG) + 상태만 바꿈 → 태블릿에서도 가볍게</li></ul></section>

<section><h2>8. 숫자 친구들</h2><ul>
<li><b class="k">확정</b> 엑시0 · 폴라1 · 아레시2 · 이리스7 · 렘마8 — 고르기 · 상황별 몸짓 · 눈 깜빡임 · 이야기(v92.0~92.1 그대로 가져옴)</li>
<li>말풍선 대사 = 상황 10가지 × 10개 이상 랜덤(v92.3)</li>
<li>지켜야 할 것: 채점 전에 평가하는 말 금지 · 지루함 그림은 학습 화면 금지</li>
<li><span class="x">둘째 판</span> 꾸미기(크기·장식·받침대·배경) · 별자리 펫</li></ul></section>

<section><h2>9. 선생님 · 학부모</h2><ul>
<li><b class="k">확정</b> 첫 판 동안 = 옛 앱 화면이 새 기록을 읽는다(기록 모양을 맞춤) · 그다음 새 대시보드 → 새 리포트</li>
<li>새 대시보드에 꼭: 질문마다 「한 번에 / 되묻기 뒤 / 아이템(무엇) / 다음 날 / 아직」 · 막힌 핵심 · 도움 알림 · 잠금 풀기 · 회차 열기 · 이해 점수와 내역</li>
<li>학부모: "무엇을 시키면 되는지" 한 줄(예: 🌱 3학년 분수부터 다시) · <b class="k">확정</b> 링크에 비밀 글자(토큰)</li></ul></section>

<section><h2>10. 기록 (데이터 계약)</h2><ul>
<li><b>submissions</b> 그대로 씀 — 질문 하나 끝날 때 한 줄: 학생·과정·소단원·level(r1·r2·r3)·question_id(qn…)·말한 글·점수·attempt·hints_used·need_teacher</li>
<li><b class="w">제안</b> 새 칸 3개: <code>help</code>(none·kw·short·long) · <code>stage</code>(first·reask·again·nextday) · <code>quality</code>(위 품질값). 옛 화면은 모르는 칸을 무시하므로 안전</li>
<li><b class="w">제안</b> 새 표: <code>progress</code>(학생×과정: 회차·잠금·이어하기) · <code>wallet</code>(두 화폐·하루 사용량) · 둘째 판에 <code>inventory</code>·<code>medals</code></li>
<li>말소리는 저장 안 함(글만) — 상용화 때 다시(보류 결정 그대로)</li></ul></section>

<section><h2>11. 만드는 방법</h2><ul>
<li>저장소 안 새 폴더 <code>app/</code> — 같은 GitHub Pages 주소 아래 · 옛 dodream.html 은 손대지 않음</li>
<li>화면 = 가벼운 JS 파일 여러 개(빌드 도구 없이 · 이 PC에 node 없음) · PWA</li>
<li>내용 = 설계 파일(e42_* · help_e42_* · 그림)을 파이썬으로 <code>app/data/e4-2.json</code> 하나로 → 앱은 그 파일만 읽음</li>
<li>가져다 쓰는 것: AI 채점 서버(task 하나 추가) · 수식 표시 mfmt · 쌓기나무·도형 그림(draw.py로 미리 SVG) · 캐릭터 그림</li>
<li>검사: 데이터 자동 검사(빠진 칸·숫자 검산·조사) + AI 채점 시험(모범/절반/틀린 답) + 실제 태블릿</li></ul></section>
</div>

<h2>12. 만드는 차례와 각 단계 끝의 확인</h2>
<table><tr><th>단계</th><th>만드는 것</th><th>끝났다고 할 수 있는 때</th></tr>
<tr><td>0</td><td>마스터 결정(13번) · 데이터 계약 확정 · 서버에 새 칸</td><td>표·칸이 생기고 옛 화면이 그대로 뜸</td></tr>
<tr><td>1</td><td><b>질문 화면 하나로 끝까지</b> — 초4-2 사각형 한 소단원 · 1회차 · 진짜 AI·마이크</td><td>되묻기·아이템·잠금·이어하기·AI 실패가 다 맞게 기록됨 · 옛 선생님 화면에 보임</td></tr>
<tr><td>2</td><td>로그인·기기 등록·친구 고르기 · 행성 입구 · 결과 · 보급 임무 · 타이머</td><td>태블릿에서 학생이 설명 없이 한 소단원을 끝냄</td></tr>
<tr><td>3</td><td>지도 · 2·3회차 · 블랙홀 · 7일 복습 · 「오늘 갈 곳」</td><td>초4-2 전 과정(33행성)이 지도에서 돌아감</td></tr>
<tr><td>4</td><td>이해 점수 · 등급 · 나의 기록 · 지혜 조각</td><td>점수가 기록으로 다시 계산해도 같음</td></tr>
<tr><td>5</td><td>시범(학원 4학년) 2~3주</td><td>통과율 낮은 질문·막힌 핵심 목록으로 내용 고침</td></tr>
<tr><td>6</td><td>둘째 판: 상점·펫·용어 맞히기·스피드 연산 · 새 대시보드 → 새 리포트</td><td>—</td></tr></table>

<h2>13. 결정해 주실 것 (☐에 표시만 해 주셔도 됩니다)</h2>
<table><tr><th>#</th><th>무엇</th><th>Claude 제안</th><th>☐ 좋아요 ☐ 바꿈</th></tr>
<tr><td>1</td><td>도움 화폐가 0인 아이</td><td>다음 날 열릴 때 짧은 설명 1번 무료</td><td></td></tr>
<tr><td>2</td><td>도움 화폐 이름 · 얻는 곳</td><td>「지혜 조각」 · 연습 공간·복습·관문</td><td></td></tr>
<tr><td>3</td><td>아이템별 점수(품질)</td><td>키워드 0.7 · 짧은 0.5 · 긴 0.4</td><td></td></tr>
<tr><td>4</td><td>블랙홀 3회차 「느낀 점」</td><td>채점 안 하고 어른에게 보여 주기만</td><td></td></tr>
<tr><td>5</td><td>그날이 바뀌는 시각 · 잠금 풀기</td><td>새벽 4시 · 선생님이 학생별로 풀기</td><td></td></tr>
<tr><td>6</td><td>한 번 앉는 시간</td><td>선생님이 정함(예 20분)</td><td></td></tr>
<tr><td>7</td><td>「오늘 갈 곳」 순서</td><td>복습 → 어제 잠긴 것 → 다음 행성</td><td></td></tr>
<tr><td>8</td><td>상점·연습 공간을 첫 판에서 뺄지</td><td>둘째 판으로(학습 흐름 먼저)</td><td></td></tr>
<tr><td>9</td><td>용어 (2번 표)</td><td>은하·별·행성·달·핵·블랙홀·임무</td><td></td></tr>
<tr><td>10</td><td>새 칸·새 표(10번)</td><td>help · stage · quality / progress · wallet</td><td></td></tr></table>
<div class="lines">메모:<span></span><span></span><span></span></div>
'''

def make_pdf(html_text, name):
    out = os.path.join(HERE, name + '.html'); io.open(out, 'w', encoding='utf-8').write(html_text)
    tmp = os.path.join(tempfile.gettempdir(), 'claude', 'sheet'); os.makedirs(tmp, exist_ok=True)
    shutil.copy(out, os.path.join(tmp, 'u.html'))
    chrome = r'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    subprocess.run([chrome, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-data-dir=' + os.path.join(tmp, 'prof'),
                    '--print-to-pdf=' + os.path.join(tmp, 'u.pdf'), 'file:///' + os.path.join(tmp, 'u.html').replace('\\\\', '/')], check=True, timeout=180)
    shutil.copy(os.path.join(tmp, 'u.pdf'), os.path.join(HERE, name + '.pdf'))
    return os.path.join(HERE, name + '.pdf')

if __name__ == '__main__':
    html = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>새 앱 설계서 2판</title><style>%s</style></head><body>%s</body></html>' % (CSS, BODY)
    print(make_pdf(html, '설계서_새앱_v2'))
