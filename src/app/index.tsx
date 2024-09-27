import { CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';
import { defaultArticleState, IFormData } from 'src/constants/articleProps';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import { Article } from 'src/components/article/Article';

import styles from '../styles/index.module.scss';

export const App = () => {
	const [state, setState] = useState<IFormData>(defaultArticleState);
	useEffect(() => {
		setState(
			localStorage.getItem('form') !== null
				? JSON.parse(localStorage.form)
				: defaultArticleState
		);
	}, []);

	const handleUpdate = (formData: IFormData) => {
		setState(formData);
	};
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm isUpdate={handleUpdate} />
			<Article />
		</div>
	);
};
