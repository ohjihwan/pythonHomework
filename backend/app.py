import sys
import os
os.environ['PYTHONUNBUFFERED'] = '1'

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, User
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)

# ✅ 절대경로 기반 SQLite 설정
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'instance', 'db.sqlite3')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# JWT 시크릿 키
SECRET_KEY = 'mysecretkey'

@app.before_request
def log_request_info():
	print(f"[요청 수신됨] {request.method} {request.path}")


# 회원가입 API
@app.route('/api/signup', methods=['POST'])
def signup():
	print(">>> 회원가입 요청 받음")
	try:
		data = request.get_json()
		userid = data.get('userid')
		password = data.get('password')

		if not userid or not password:
			return jsonify({'status': 'error', 'message': '아이디 또는 비밀번호가 누락되었습니다.'}), 400

		if User.query.filter_by(userid=userid).first():
			return jsonify({'status': 'error', 'message': '이미 존재하는 사용자입니다.'}), 409

		hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
		new_user = User(userid=userid, password=hashed_pw)
		db.session.add(new_user)
		db.session.commit()

		return jsonify({'status': 'success', 'message': '회원가입 완료'})
	except Exception as e:
		print("[회원가입 에러]", str(e))
		return jsonify({'status': 'error', 'message': '서버 내부 오류'}), 500

# 로그인 API
@app.route('/api/login', methods=['POST'])
def login():
	data = request.get_json()
	userid = data.get('userid')
	password = data.get('password')

	user = User.query.filter_by(userid=userid).first()
	if not user:
		return jsonify({'status': 'error', 'error': 'not_found'})

	if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
		payload = {
			'userid': user.userid,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
		}
		token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
		return jsonify({'status': 'success', 'token': token})
	else:
		return jsonify({'status': 'error', 'error': 'wrong_password'})

# 보호된 API
@app.route('/api/protected', methods=['GET'])
def protected():
	auth_header = request.headers.get('Authorization')
	if not auth_header:
		return jsonify({'status': 'error', 'message': '토큰이 없습니다.'}), 401

	try:
		token = auth_header.split(" ")[1]
		decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
		return jsonify({'status': 'success', 'message': f"안녕하세요, {decoded['userid']}님!"})
	except jwt.ExpiredSignatureError:
		return jsonify({'status': 'error', 'message': '토큰이 만료되었습니다.'}), 401
	except jwt.InvalidTokenError:
		return jsonify({'status': 'error', 'message': '유효하지 않은 토큰입니다.'}), 401
	
@app.route('/')
def index():
    return 'Hello from Flask in Docker!'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)
