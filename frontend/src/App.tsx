import { Home } from '@views/Home';
import { LoginView } from '@views/LoginView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<LoginView />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
