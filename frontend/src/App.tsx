import { Sidebar } from '@components/Sidebar';
import { Home } from '@views/Home';
import { LoginView } from '@views/LoginView';
import { Products } from '@views/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<div className="flex">
				<BrowserRouter basename="/">
					<Sidebar />

					<Routes>
						<Route path="/" element={<LoginView />} />
						<Route path="/compras" element={<Home />} />
						<Route path="/ventas" element={<Home />} />
						<Route path="/lista-compras" element={<Home />} />
						<Route path="/lista-ventas" element={<Home />} />
						<Route path="/productos" element={<Products />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
