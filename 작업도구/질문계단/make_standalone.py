# -*- coding: utf-8 -*-
"""검토.html + 데이터(.js) → 파일 하나짜리 검토 페이지.  python make_standalone.py m3/review_m31_1.js 검토_중3-1_1단원.html"""
import io, sys
page = io.open('검토.html', encoding='utf-8').read()
data = io.open(sys.argv[1], encoding='utf-8').read()
a = page.index('<script>\n// 사용'); b = page.index('</script>', a) + len('</script>')
io.open(sys.argv[2], 'w', encoding='utf-8').write(page[:a] + '<script>\n' + data + '</script>' + page[b:])
print('ok', sys.argv[2])
