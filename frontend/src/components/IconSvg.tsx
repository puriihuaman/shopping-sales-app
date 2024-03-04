export const IconSvg = ({
	iconID,
	otherClass = 'icon-sm',
}: {
	iconID: string;
	otherClass?: string;
}) => {
	return (
		<span className="flex justify-center, items-center">
			<svg className={`icon-svg ${otherClass}`}>
				<use href={'path' + iconID}></use>
			</svg>
		</span>
	);
};
