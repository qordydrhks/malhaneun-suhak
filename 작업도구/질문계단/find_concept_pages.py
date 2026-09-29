# 교재 PDF 에서 개념 쪽(왼쪽 위 노란 번호 원) 찾기 — 디딤돌 3학년처럼 주황 띠가 없는 책용. 사용: python -X utf8 find_concept_pages.py "<pdf 이름>" (저장소 루트에서)
# 출력 (인덱스, 노랑 비율). 0.5 넘는 쪽이 개념 쪽. 인쇄 쪽 = 인덱스 + 오프셋(책마다 먼저 확인).
import pypdfium2 as pdfium, sys
sys.stdout.reconfigure(encoding='utf-8')
R="C:/Users/qordy/Documents/GitHub/malhaneun-suhak/"
f=sys.argv[1]; pdf=pdfium.PdfDocument(R+f); res=[]
for i in range(len(pdf)):
    im=pdf[i].render(scale=0.3).to_pil().convert('RGB'); W,H=im.size
    box=im.crop((0,0,int(W*0.12),int(H*0.08))); px=box.getdata()
    r=sum(1 for (a,b,c) in px if a>220 and 150<b<215 and c<90)/max(1,len(px))
    res.append((i,round(r,3)))
print([x for x in res if x[1]>0.04])
