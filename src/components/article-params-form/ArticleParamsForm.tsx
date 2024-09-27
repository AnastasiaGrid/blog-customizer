import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import classNames from 'classnames';

import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
import { Select } from '../select/Select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	IFormData,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type IIsUpdate = {
	isUpdate: (formData: IFormData) => void;
};
export const ArticleParamsForm = ({ isUpdate }: IIsUpdate) => {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<IFormData>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const genHandleOnChange = (formKey: keyof IFormData) => {
		return function (selected: OptionType) {
			setForm((previousValue) => ({ ...previousValue, [formKey]: selected }));
		};
	};
	const onClickHandler = () => {
		open ? setOpen(false) : setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	useOutsideClickClose({
		isOpen: open,
		rootRef,
		onClose,
	});

	const handleSubmit = () => {
		localStorage.setItem('form', JSON.stringify(form));
		isUpdate(form);
		setOpen(false);
	};
	const handleReset = () => {
		setForm(defaultArticleState);
		isUpdate(defaultArticleState);
		localStorage.clear();
		setOpen(false);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={onClickHandler} isOpen={open} />
			<aside
				className={classNames(styles.container, {
					[styles.container_open]: open,
				})}>
				<form className={styles.form}>
					<label>
						<Select
							selected={form.fontFamilyOption}
							options={fontFamilyOptions}
							title={'Шрифт'}
							onChange={genHandleOnChange('fontFamilyOption')}
						/>
					</label>
					<RadioGroup
						selected={form.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер'}
						name={'Размер'}
						onChange={genHandleOnChange('fontSizeOption')}
					/>
					<Select
						selected={form.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={genHandleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={form.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={genHandleOnChange('backgroundColor')}
					/>
					<Select
						selected={form.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={genHandleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='button' onClick={handleSubmit} />
					</div>
				</form>
			</aside>
		</div>
	);
};
