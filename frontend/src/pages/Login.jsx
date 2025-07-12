import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
	const signupRef = useRef(null);
	const loginBtnRef = useRef(null);
	const [userid, setUserid] = useState('');
	const [password, setPassword] = useState('');
	const [hoverIndex, setHoverIndex] = useState(0);
	const [hoverCount, setHoverCount] = useState(0);
	const isPasswordValid = password.length >= 6;
	const moveLocked = userid && isPasswordValid;
	const navigate = useNavigate();
	

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!userid || !password) {
			alert("아이디와 비밀번호를 모두 입력하세요.");
			return;
		}

		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userid, password })
			});

			const data = await res.json();

			if (data.status === 'success') {
				sessionStorage.setItem('token', data.token);
				navigate('/content');
			} else {
				const message = {
					not_found: "존재하지 않는 회원입니다.",
					wrong_password: "비밀번호가 틀렸습니다.",
				}[data.error] || "로그인 실패. 서버 오류가 발생했습니다.";
				alert(message);
			}
		} catch (err) {
			alert("서버에 연결할 수 없습니다.");
			console.error(err);
		}
	};

	const handleInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	const handleLoginBtnFocus = () => {
		if (!moveLocked && signupRef.current) {
			signupRef.current.focus();
		}
	};

	const handleHover = () => {
		if (moveLocked) return;

		setHoverIndex((prev) => {
			const next = (prev % 5) + 1;

			setHoverCount((count) => {
				const updated = count + 1;
				if (updated == 10) {
					alert("🎉 힌트: 비밀번호 6자리 이상 입력하면 버튼이 도망가지 않아요! 😜😜");
				}
				return updated;
			});

			return next;
		});
	};

	return (
		<form className="login" onSubmit={handleLogin}>
			<h2 className="login__title">로그인</h2>
			<input
				type="text"
				placeholder="아이디"
				value={userid}
				className="login__id"
				onChange={handleInputChange(setUserid)}
			/>
			<input
				type="password"
				placeholder="비밀번호"
				value={password}
				className="login__pw"
				onChange={handleInputChange(setPassword)}
			/>
			<button 
				type="submit"
				ref={loginBtnRef}
				tabIndex={moveLocked ? 0 : -1}
				onFocus={handleLoginBtnFocus}
				className={`login__button login__button--login${!moveLocked && hoverIndex > 0 ? ` move${hoverIndex}` : ''}`}
				onMouseEnter={handleHover}>
				로그인
			</button>
			<Link to="/signup" ref={signupRef} className="login__button login__button--text">회원가입</Link>
		</form>
	);
}

export default Login;
