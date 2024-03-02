import style from './icon-svg.module.scss';

const path = '/assets/icons/svg-icons.svg#';

export const IconSvg = ({
	iconID,
	otherClass,
}: {
	iconID: string;
	otherClass?: string;
}) => {
	return (
		<span className={style.icon}>
			<svg
				className={`${style['icon-svg']} ${
					style[String(otherClass)] ?? style['icon-sm']
				}`}
			>
				<use href={path + iconID}></use>
			</svg>
		</span>
	);
};
