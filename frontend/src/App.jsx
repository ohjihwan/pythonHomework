import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '@page/Login';
import Signup from '@page/Signup';
import Content from '@page/Content';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/content" element={<Content />} />
				<Route path="*" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
