# -*- coding: utf-8 -*-
"""브라우저에서 fetch POST 로 보낸 내용을 파일로 저장하는 작은 서버 (포트 8977).
   python recv.py <저장폴더>     →  POST http://127.0.0.1:8977/<파일이름>"""
import http.server, os, sys
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
os.makedirs(OUT, exist_ok=True)

class H(http.server.BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_POST(self):
        name = os.path.basename(self.path.strip('/')) or 'out.txt'
        data = self.rfile.read(int(self.headers.get('Content-Length', 0)))
        open(os.path.join(OUT, name), 'wb').write(data)
        self.send_response(200); self._cors(); self.end_headers(); self.wfile.write(b'ok')

http.server.HTTPServer(('127.0.0.1', 8977), H).serve_forever()
