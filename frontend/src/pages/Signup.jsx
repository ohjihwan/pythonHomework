import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
	const [userid, setUserid] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault(); // ✅ 폼 기본 동작 막기

		if (!userid || !password) {
			alert("아이디와 비밀번호를 모두 입력하세요.");
			return;
		}

		try {
			const res = await fetch('http://localhost:5000/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userid, password }),
			});

			console.log(res);

			const txt = await res.text();
			console.log('📦 서버 응답 내용:', txt);

			if (!res.ok) {
				alert("회원가입 요청 실패 (HTTP " + res.status + ")");
				return;
			}

			const data = JSON.parse(txt); // ✅ 이미 읽은 텍스트를 json으로 파싱

			if (data.status === 'success') {
				alert("회원가입이 완료되었습니다.");
				navigate('/login');
			} else {
				alert(data.message || "회원가입에 실패했습니다.");
			}
		} catch (err) {
			alert("서버에 연결할 수 없습니다.");
			console.error(err);
		}
	};

	const handleGoLogin = (e) => {
		e.preventDefault();
		navigate('/login');
	};

	return (
		<form className="signup">
			<h2 className="signup__title">회원가입</h2>
			<input
				type="text"
				placeholder="아이디"
				className="signup__id"
				value={userid}
				onChange={(e) => setUserid(e.target.value)}
			/>
			<input
				type="password"
				placeholder="비밀번호"
				className="signup__pw"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="signup__button" onClick={handleSignup}>회원가입</button>
			<button className="signup__button signup__button--text" onClick={handleGoLogin}>로그인으로 이동</button>
		</form>
	);
}

export default Signup;
