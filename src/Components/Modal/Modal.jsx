// import react from 'react';
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

import style from "./style.module.scss";

// Не забывайте документировать свой код.
// Это сделает его более удобным для использования и дальнейшей поддержки
// Вот здесь можно изучить формат JSDoc https://jsdoc.app

/**
 * Модальное окно для демонстрации детальной информации о книге
 * @param {boolean} show Состояние модального окна 
 * @param {*} item Объект с детальной информацией о книге 
 * @param {*} onClose Коллбэк-функция для закрытия модального окна 
 * @return {JSX.Element} 
 */
const BookInfoModal = ({ show, item, onClose }) => {
	if (!show) {
		return null;
	}

	const { publishedDate, imageLinks, title, authors, publisher, previewLink, description } = item.volumeInfo;

	const publishedYear = new Date(publishedDate).getFullYear();
	const thumbnail = imageLinks?.smallThumbnail;

	return (
		<div className={style.modal}>
			<div role="dialog" aria-label='Book details' className={style.inner}>
				<div className={style.box}>
					<img src={thumbnail} alt="" />

					<div className={style.info}>
						<h3>
							{title && <span className={style.title}>{`Title: ${title}`}</span>}
							{authors && <span className={style.author}>{`Author: ${authors}`}</span>}
						</h3>

						{publisher && (
							<p>
								{`Published by ${publisher}`.concat(!isNaN(publishedYear) ? " in ".concat(publishedYear) : '')}
							</p>
						)}

						{previewLink && (
							<a href={previewLink}>More</a>
						)}
					</div>
				</div>

				{description && (
					<p className={style.description}>
						{description}
					</p>
				)}

				<button aria-label="Close book info" className={style.close} onClick={onClose}>
					<i aria-hidden='true' className="fas fa-times" />
				</button>
			</div>
		</div>
	)
}
export default BookInfoModal;