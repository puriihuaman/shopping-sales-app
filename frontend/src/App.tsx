import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { Home } from '@views/Home';
import { LoginView } from '@views/LoginView';
import { Products } from '@views/Products';
import { Profile } from '@views/Profile';
import { Shopping } from '@views/Shopping';
import { ShoppingList } from '@views/ShoppingList';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleShowSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<>
			<div
				className={`h-screen grid grid-rows-[72px_minmax(0,_1fr)] transition-all duration-300 ${
					showSidebar
						? 'grid-cols-[256px_minmax(0,_1fr)]'
						: 'grid-cols-[50px_minmax(0,_1fr)]'
				}`}
			>
				<BrowserRouter basename="/">
					<Header isShowSidebar={showSidebar} />

					<div className="row-start-2 row-end-3 col-span-1">
						<Sidebar
							isShowSidebar={showSidebar}
							handleShowSidebar={handleShowSidebar}
						/>
					</div>

					<Routes>
						<Route path="/" element={<LoginView />} />
						<Route path="/perfiles" element={<Profile />} />
						<Route path="/compras" element={<Shopping />} />
						<Route path="/ventas" element={<Home />} />
						<Route path="/lista-compras" element={<ShoppingList />} />
						<Route path="/lista-ventas" element={<Home />} />
						<Route path="/productos" element={<Products />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
