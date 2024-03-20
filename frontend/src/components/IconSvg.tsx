type IconSize = 'sm' | 'md' | 'lg';

const iconSizes: Record<IconSize, string> = {
	sm: 'w-6 h-6',
	md: 'w-8 h-8',
	lg: 'w-12 h-12',
};

export const IconSvg = ({
	iconID,
	iconSize = 'sm',
}: {
	iconID: string;
	iconSize?: IconSize;
}) => {
	const PATH = '/assets/icons/svg-icons.svg#';

	const sizeClass = iconSizes[iconSize] || iconSizes['sm'];

	return (
		<span className="flex justify-center items-center select-none">
			<svg
				className={`block text-current fill-current select-none ${sizeClass}`}
			>
				<use href={PATH + iconID}></use>
			</svg>
		</span>
	);
};
