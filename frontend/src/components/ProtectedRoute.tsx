import { useState, type ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const ProtectedRoute = ({
	isAuthenticated,
	children,
	redirectTo = '/login',
}: {
	isAuthenticated: boolean;
	children?: ReactElement;
	redirectTo?: string;
}) => {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleShowSidebar = (): void => {
		setShowSidebar(!showSidebar);
	};

	if (!isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}

	return (
		<div
			className={`h-screen grid grid-rows-[72px_minmax(0,_1fr)] transition-all duration-300 ${
				showSidebar
					? 'grid-cols-[256px_minmax(0,_1fr)]'
					: 'grid-cols-[50px_minmax(0,_1fr)]'
			}`}
		>
			<Header isShowSidebar={showSidebar} />

			<div className="row-start-2 row-end-3 col-span-1">
				<Sidebar
					isShowSidebar={showSidebar}
					handleShowSidebar={handleShowSidebar}
				/>
			</div>

			{children ? children : <Outlet />}
		</div>
	);
};
