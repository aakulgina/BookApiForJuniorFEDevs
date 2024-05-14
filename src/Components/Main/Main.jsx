// import react from 'react';
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

import { useState } from 'react';
import Card from "../Card/Card";
import Pagination from '../Pagination/Pagination';
import axios from "axios";
import style from "./style.module.scss";

const Main = () => {
	const [search, setSearch] = useState("");
	const [bookData, setBookData] = useState([]);
	const [totalBooks, setTotalBooks] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [booksPerPage, setBooksPerPage] = useState(5);
	const [isLoading, setIsLoading] = useState(false);

	const handleBooksPerPageChange = (event) => {
		const selectedValue = parseInt(event.target.value);
		setBooksPerPage(selectedValue);
		setCurrentPage(1);

		if (!bookData || bookData.length) {
			searchBook({ page: 1, size: selectedValue });
		}
	};

	const saveSearchQuery = (evt) => {
		const searchText = evt.target.value;
		setSearch(searchText);
	}

	const searchBook = (params = {}) => {
		setIsLoading(true);
		const { page = currentPage, size = booksPerPage } = params;
		const startIndex = (page - 1) * size;

		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyC67QiTZW4v9H874NsrUPxZGB-z1k-ZBkk&startIndex=${startIndex}&maxResults=${size}`)
			.then(({ data: { items, totalItems } }) => {
				setBookData(items);
				setTotalBooks(totalItems);
			})
			.catch(err => {
				throw new Error('Произошла ошибка: некорректное тело запроса.', { cause: err });
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	const handleSearchClick = () => {
		setCurrentPage(1);
		searchBook({ page: 1 });
	}

	const paginate = (pageNumber) => (evt) => {
		evt.preventDefault();
		setCurrentPage(pageNumber);
		searchBook({ page: pageNumber });
	}

	return (
		<>
			<div className={style.header}>
				<div className={style.row1}>
					<h1>Find your book here</h1>
					<p>
						<span>Books are the plane, and the train, and the road.
							They are the destination, and the journey.</span>
						<span>They are home.</span>
					</p>
				</div>

				<div className={style.row2}>
					<div className={style.search}>
						<input
							type="text"
							role='search'
							placeholder="Enter the book you are looking for"
							value={search}
							onChange={saveSearchQuery}
						/>
						<button type="button" aria-label='Search' onClick={handleSearchClick}>
							<i className="fas fa-search" />
						</button>
					</div>
				</div>
			</div>

			{isLoading
				? (
					<div className={style.loader} aria-label='Loading, please wait' />
				)
				: (
					<>
						{!bookData && (
							<section aria-label='Search results' className={style.container + ' ' + style.error}>
								<span>
									Something went wrong:
									either there are no books corresponding to your query
									or the request ended up with some unexpected error.
								</span>
								<span>
									Please change your search query and try again
								</span>
							</section>
						)}

						{bookData?.length > 0 && (
							<section aria-label='Search results' className={style.container}>
								{bookData.map(book => <Card book={book} key={book.id} />)}
							</section>
						)}
					</>
				)
			}

			<Pagination
				booksPerPage={booksPerPage}
				totalBooks={totalBooks}
				paginate={paginate}
				handleBooksPerPageChange={handleBooksPerPageChange}
				currentPage={currentPage}
			/>
		</>
	)
}

export default Main;
