# ddFig 설계도 쓰는 법 — 개념카드 그림용

"말하는 수학" 앱의 그림 생성기 `ddFig` 는 **설계도(JSON 객체)** 를 받아 SVG 를 그린다.
너는 그림을 그리지 않는다. **좌표와 식만 정확히 쓰면** 앱이 계산해서 그린다.

이 그림은 **학생에게 개념을 가르치는 그림**이다. 출제 문제 그림과 달리
**답·결론을 다 보여줘도 된다.** 오히려 꼭짓점 좌표, 절편, 대칭축 같은 걸 라벨로 분명히 적어 줘야 좋다.

---

## 1. 두 가지 좌표계

### ① 좌표평면 (`axes` 를 쓴다) — 수학 좌표, y 는 위로
```json
{"axes":{"xMin":-3,"xMax":5,"yMin":-5,"yMax":4}}
```
- 점·곡선·원의 좌표를 **수학 좌표 그대로** 쓴다.
- 범위는 중요한 점(꼭짓점·절편·교점)이 **모두 안에 들어오게** 잡고, 여백을 1~2 준다.
- `axes` 선택 칸: `step`(x 눈금 간격) `yStep` `grid`(false 면 격자 없음) `ticks`(false 면 눈금 숫자 없음)

### ② 도형 (`axes` 없음) — 화면 좌표, **y 는 아래로 커진다**
- 가로 40~500, 세로 40~380 안에 점을 놓는다.
- 모양만 대략 맞으면 되지만 **조건과 어긋나 보이면 안 된다**
  (이등변삼각형이면 두 변을 실제로 같게, 직각이면 직각으로, 평행이면 평행하게 좌표를 잡아라).
- 길이·각도는 **반드시 라벨 글자로** 적는다("6 cm", "40°", "x").

### ③ 수직선 (`numberLine`)
```json
{"numberLine":{"min":-5,"max":5,"step":1,
  "ranges":[{"from":-2,"to":3,"fromOpen":true}],
  "points":[{"x":2.236,"label":"√5"}]}}
```
- 한쪽으로 끝없이 가면 `from` 또는 `to` 를 뺀다. ○(포함 안 함)은 `fromOpen`/`toOpen`: true.
- `numberLine` 을 쓰면 `axes`·`points`·`shapes` 등은 무시된다. 섞지 마라.

---

## 2. 쓸 수 있는 칸 — **여기 없는 이름은 절대 쓰지 마라** (조용히 무시돼서 안 그려진다)

| 칸 | 허용되는 이름 |
|---|---|
| `axes` | xMin xMax yMin yMax scale yScale ox oy step yStep grid ticks origin |
| `points` | (이름→[x,y] 지도. 예 `{"A":[1,-4],"B":[3,0]}`) |
| `derive` | name type point over a b t center r through deg fn x |
| `shapes` | points close style fill stroke strokeWidth |
| `angles` | at to r color opacity stroke label deg labelOffset textColor |
| `rightAngles` | at to size stroke |
| `parallelMarks` | points count stroke |
| `labels` | point at text dx dy color dot dotColor |
| `curves` | fn color from to fill fillColor style width label labelAt dx dy |
| `lines` | x y through color width style label dx dy |
| `circles` | center r through color fill fillOpacity width style |
| `arcs` | center from to r ccw color width style label |
| `tickMarks` | points count color |
| `numberLine` | min max step points ranges |
| (맨 위) | title caption + 위의 칸 이름들 |

`numberLine.points` = x label open color · `numberLine.ranges` = from to fromOpen toOpen color

### 자주 하는 실수 (실제로 났던 것)
- 🚫 **`lines` 에 `fn` 을 쓰는 것.** `fn`(식)은 `curves` 전용이다.
  `y=x` 를 그리려면 `{"curves":[{"fn":"x"}]}` 또는 `{"lines":[{"through":[[0,0],[1,1]]}]}`.
- 🚫 `circles` 에 `label` — 원에는 라벨 칸이 없다. `labels` 로 따로 붙여라.
- 🚫 `shapes` 로 직선을 그리려는 것 — `shapes` 는 **끝이 있는 선분/다각형**이다.

---

## 3. 각 칸 자세히

### curves (함수 곡선) — 좌표평면에서만
```json
{"fn":"x^2-2*x-3","label":"y=x²-2x-3","labelAt":3.6,"color":"#185FA5"}
```
- `fn` 은 x 에 대한 식: `+ - * / ^` 괄호, `2x` 처럼 곱셈 생략 가능,
  `sqrt abs sin cos tan log ln exp pi`. 로그 밑 2 는 `ln(x)/ln(2)`.
- 정의역이 제한되면 `"from":0,"to":3`.
- 부등식 영역은 `"fill":"above"` 또는 `"below"`, 경계 미포함이면 `"style":"dashed"`.
- `labelAt` 은 라벨을 붙일 x 값. 곡선끼리 라벨이 겹치지 않게 서로 다른 값을 줘라.
- 점근선이 있는 함수(유리함수 등)는 **끊어서 두 개로** 써라:
  `{"fn":"2/(x-2)+1","from":-4,"to":1.7}` 와 `{"fn":"2/(x-2)+1","from":2.3,"to":6}`

### lines (직선)
- `{"x":2,"style":"dashed"}` 세로선 · `{"y":-1}` 가로선 · `{"through":["A","B"]}` 두 점을 지나는 직선(화면 끝까지).
- `through` 에는 점 이름 또는 좌표 배열을 쓴다: `{"through":[[0,0],[1,1]]}`

### shapes (선분·다각형)
- `{"points":["A","B","C"]}` 삼각형(자동으로 닫힘) · `{"points":["A","B"],"close":false}` 선분 하나
- `style`: `"solid"`(기본) `"dashed"` `"ghost"`(회색 점선, 이동 전 도형에 좋다)

### circles / arcs
- `{"center":"O","r":2}` 또는 `{"center":[0,0],"r":2}` 또는 `{"center":"O","through":"P"}`
- `arcs`: `{"center":"O","from":"A","to":"B"}` — **from 에서 to 로 화면상 반시계 방향**으로 그린다.
  ⚠️ 순서를 거꾸로 쓰면 짧은 호가 아니라 **반대쪽 큰 호(270°)** 가 그려진다. 1사분면 사분원이면
  `from` 은 x축 위의 점, `to` 는 y축 위의 점이다: `{"center":"O","from":"C","to":"E","r":1}`.
  (`"ccw":false` 를 주면 방향이 반대가 된다.)

### angles / rightAngles (도형에서 각 표시)
- `{"at":"A","to":["B","C"],"label":"40°"}` — **label 을 안 주면 숫자가 안 나온다**(모양만 표시).
- 직각: `{"at":"H","to":["A","B"]}` 를 `rightAngles` 에.

### labels (글자)
- `{"point":"A","text":"A(1, -4)","dx":6,"dy":-6}` — `dx`/`dy` 는 화면 픽셀(y 는 아래로 +).
- 점 이름 없이 아무 자리에: `{"at":[2,3],"text":"여기","dot":false}`
- **`dot:false` 를 안 주면 까만 점이 같이 찍힌다.** 글자만 원하면 `"dot":false`.
- 글자가 곡선·다른 라벨과 겹치지 않게 dx/dy 를 조절해라.

### derive (좌표를 손으로 계산하지 말고 앱에 시키기)
- 곡선 위의 점: `{"name":"P","type":"onCurve","fn":"x^2","x":2}`
- 원 위의 점: `{"name":"P","type":"onCircle","center":"O","r":3,"deg":40}`
- 중점: `{"name":"M","type":"mid","a":"A","b":"B"}`
- 두 직선의 교점: `{"name":"X","type":"intersect","a":["A","B"],"b":["C","D"]}`
- 수선의 발: `{"name":"H","type":"foot","point":"P","over":["A","B"]}`
- 대칭점: `{"name":"A2","type":"reflect","point":"A","over":["P","Q"]}`

### title / caption
- `title` 은 그림의 제목(화면에 안 보이고 읽기 도구용). 짧게.
- `caption` 은 **그림 아래 회색 상자에 나오는 설명**. 문자열 하나 또는 배열(줄 나눔).
  개념카드 그림에서는 **caption 을 꼭 써라.** 그림이 말하려는 핵심을 1~2줄로.

### 색
`#185FA5`(파랑, 기본 곡선) `#D85A30`(주황, 강조·비교 대상) `#3FB98C`(초록, 세 번째)
`#9A9890`(회색, 이동 전·보조선) `#534AB7`(보라)

---

## 4. 그림을 만들 때 지킬 것

1. **개념 하나에 그림 하나.** 여러 개념을 한 그림에 욱여넣지 마라.
2. **그 학년이 배우는 범위 안에서.** 중3에게 미분·삼각함수 그래프를 쓰지 마라.
3. **숫자는 반드시 맞아야 한다.** 꼭짓점·절편·교점을 직접 계산해서 넣어라.
   예: `y=x²-2x-3` → 꼭짓점 (1,-4), x절편 -1과 3, y절편 -3. 하나라도 틀리면 학생이 틀리게 배운다.
4. **라벨은 넉넉히.** 좌표·식·각도·길이를 글자로 적어 줘라 (가르치는 그림이니까).
5. **겹치지 않게.** 곡선 라벨은 `labelAt` 을 서로 다르게, 점 라벨은 `dx`/`dy` 로 피해라.
6. 그릴 수 없는 것(표, 화살표 도식, 입체도형, 순서도)은 **억지로 만들지 말고 건너뛴다.**
   `"skip"` 으로 표시하고 이유를 적어라.

---

## 5. 내놓을 파일 모양

`scenes_<맡은이름>.json` 한 개. 배열이고, 항목 하나가 개념 하나다.

```json
[
 { "grade":"m3-1",
   "big":"4. 이차함수",
   "small":"92. 이차함수 y=ax²+bx+c의 그래프는 어떻게 그릴까?",
   "scene":{ "title":"...", "axes":{...}, "curves":[...], "caption":"..." } },

 { "grade":"h1-1", "big":"1. 다항식", "small":"08. 조립제법",
   "skip":"표와 화살표 도식이라 ddFig 로 못 그림" }
]
```

- `grade`·`big`·`small` 은 **받은 그대로 한 글자도 바꾸지 말고** 복사해라 (이걸로 카드를 찾는다).
- 건너뛸 것은 `scene` 대신 `skip` 에 이유를 쓴다.
