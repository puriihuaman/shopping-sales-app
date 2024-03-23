import { ProtectedRoute } from '@components/ProtectedRoute';
import { Home } from '@views/Home';
import { LoginView } from '@views/LoginView';
import { Products } from '@views/Products';
import { Profile } from '@views/Profile';
import { Shopping } from '@views/Shopping';
import { ShoppingList } from '@views/ShoppingList';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	const [user, setUser] = useState({ username: '', password: '' });

	const getUser = ({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): void => {
		setUser({ username, password });
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={<LoginView userLogin={user} getUser={getUser} />}
					/>

					<Route
						element={
							<ProtectedRoute
								isAuthenticated={user.username !== '' && user.password !== ''}
							/>
						}
					>
						<Route index element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/compras" element={<Shopping />} />
						<Route path="/ventas" element={<Home />} />
						<Route path="/productos" element={<Products />} />
					</Route>

					<Route
						element={
							<ProtectedRoute
								isAuthenticated={!!user.username && !!user.password}
							/>
						}
					>
						<Route path="/perfiles" element={<Profile />} />
						<Route path="/lista-compras" element={<ShoppingList />} />
						<Route path="/lista-ventas" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
