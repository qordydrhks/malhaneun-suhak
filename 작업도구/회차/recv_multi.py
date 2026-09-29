# 브라우저가 보낸 내보내기를 주소 뒤 이름 그대로 한 폴더에 저장하는 수신 서버 (포트 8977)
import http.server, io, os, sys, urllib.parse
DIR = sys.argv[1]

class H(http.server.BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_POST(self):
        name = os.path.basename(urllib.parse.unquote(self.path.split('?')[0])) or 'out.json'
        n = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(n).decode('utf-8')
        io.open(os.path.join(DIR, name), 'w', encoding='utf-8', newline='').write(body)
        self.send_response(200); self._cors(); self.send_header('Content-Type', 'text/plain'); self.end_headers()
        self.wfile.write(b'ok'); print('saved', name, len(body), flush=True)
    def log_message(self, *a): pass

http.server.HTTPServer(('127.0.0.1', 8977), H).serve_forever()
