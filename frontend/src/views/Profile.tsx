interface Profile {
	idProfile: string;
	profile: string;
}

const profiles: Profile[] = [
	{ idProfile: crypto.randomUUID(), profile: 'ADMINISTRADOR' },
	{ idProfile: crypto.randomUUID(), profile: 'CAJERO' },
	{ idProfile: crypto.randomUUID(), profile: 'ALMACENERO' },
];

export const Profile = () => {
	return (
		<main className="row-start-2 row-end-3 col-start-2 col-end-3 h-full text-slate-800 bg-slate-50 overflow-hidden dark:text-slate-50 dark:bg-slate-950 transition-colors duration-300">
			<section>
				<div className="py-8 text-center">
					<h2 className="text-2xl font-heading md:text-3xl">Perfiles</h2>
				</div>

				<div className="px-4 max-w-3xl mx-auto">
					<div className="relative overflow-x-auto shadow-md rounded-lg">
						<div className="w-full min-w-max text-sm text-left rtl:text-right text-slate-600 bg-slate-100 dark:text-current dark:bg-slate-900 transition-colors duration-300">
							<div className="grid grid-cols-[300px_minmax(0,_1fr)] text-xs text-center font-heading uppercase text-slate-100 bg-purple-800">
								<div className="px-6 py-3">CÓDIGO</div>
								<div className="px-6 py-3">PERFIL</div>
							</div>

							<div>
								{profiles.map(({ idProfile, profile }: Profile) => (
									<div
										key={idProfile}
										className="grid grid-cols-[300px_minmax(0,_1fr)] text-center bg-slate-100 border-b last:border-none border-slate-300 hover:text-purple-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors duration-300"
									>
										<div className="px-6 py-4 whitespace-nowrap uppercase overflow-hidden text-ellipsis">
											{idProfile}
										</div>
										<div className="px-6 py-4 whitespace-nowrap uppercase">
											{profile}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};
