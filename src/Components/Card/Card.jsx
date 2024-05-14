// import react from 'react';
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

import { useState } from 'react'
import style from "./style.module.scss";
import BookInfoModal from '../Modal/Modal';

const BookCard = ({ book }) => {
	const [show, setShow] = useState(false);

	if (!book) {
		return null;
	}

	const image = book?.volumeInfo?.imageLinks?.smallThumbnail;
	const authors = book?.volumeInfo?.authors?.join(', ');
	const title = book?.volumeInfo.title;

	const triggerModal = (isOpened) => () => {
		if (typeof isOpened !== 'boolean') {
			throw new Error('Произошла ошибка: невозможно открыть информацию о книге');
		}

		setShow(isOpened);
	};

	return (
		<>
			<div className={style.card} onDoubleClick={triggerModal(true)} onTouchStart={triggerModal(true)}>
				<img src={image} alt="" />
				{title && <h2 className={style.title}>Title: {title}</h2>}
				{authors && <p className={style.author}>Author: {authors}</p>}
			</div>

			<BookInfoModal show={show} item={book} onClose={triggerModal(false)} />
		</>
	)
}

export default BookCard;