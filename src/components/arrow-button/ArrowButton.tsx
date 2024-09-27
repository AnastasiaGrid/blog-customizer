import arrow from 'src/images/arrow.svg';
import classNames from 'classnames';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type TOnClick = () => void;
type TArrowButton = {
	onClick: TOnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNames(styles.container, {
				[styles.container_open]: isOpen,
			})}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={classNames(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
