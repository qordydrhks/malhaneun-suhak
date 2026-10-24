# 시안 — 중등(A 밝게 · B 어둡게) · 고등 화면(마스터 10/24). 같은 엔진, 화면만 다르게. 앱 무변경.
# 내용은 실제 원천: 중3-1 m31_quad.py(k3 질문 · 문제 M2) · 고등 h_calc1_maxmin.py(지점 A3 · 2회차 숫자 문제).
# 실행: python -X utf8 작업도구/새앱/make_시안_중고등화면.py  →  작업도구/새앱/시안_중고등화면.html
import os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..', '..')
MF_JS = open(os.path.join(ROOT, 'app/js/mfmt.js'), encoding='utf8').read()
MF_CSS = open(os.path.join(ROOT, 'app/mfmt.css'), encoding='utf8').read()
page = open(os.path.join(HERE, '시안_중고등화면_src.html'), encoding='utf8').read()
page = page.replace('/*MF_CSS*/', MF_CSS).replace('/*MF_JS*/', MF_JS)
open(os.path.join(HERE, '시안_중고등화면.html'), 'w', encoding='utf8').write(page)
print('ok', len(page))
