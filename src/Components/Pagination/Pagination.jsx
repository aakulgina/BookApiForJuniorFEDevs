// import react from 'react';
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

import { useMemo } from "react";
import style from "./style.module.scss";

const PAGE_SIZES = [5, 10, 15, 20];

const Pagination = ({booksPerPage, totalBooks, paginate, currentPage, handleBooksPerPageChange}) =>{
	const totalPages = useMemo(
		() => Math.ceil(totalBooks / booksPerPage),
		[totalBooks, booksPerPage]
	);

	const pagesToShow = [];
	for (let i = -3; i < 3; i++) {
		const value = currentPage + i;

		if ((value <= 0) || (value > totalPages)) {
			continue;
		} else {
			pagesToShow.push(value);
		}
	}

	return (
		<div className={style.pagination}>
    		<p aria-hidden='true'>Books shown on page</p>

			<div className={style.select}>
				<select
					aria-label={`Page size select. Current value ${booksPerPage}`}
					value={booksPerPage}
					onChange={handleBooksPerPageChange}
				>
					{PAGE_SIZES.map(value => (
						<option value={value} key={value}>
							{value}
						</option>
					))}
  				</select>
			</div>

			{!!totalBooks && (
				<>
					<p>{`Total pages: ${totalPages}`}</p>

		    		<ul
						role='navigation'
						aria-label={`Pagination for search results. Current page ${currentPage}`}
						className={style.pageNumbers}
					>
						{currentPage !== 1 && (
							<li aria-label="Go to first page" className={style.pageItem}>
								<button className={style.pageLink} onClick={paginate(1)}>
									First
								</button>
							</li>
						)}

						{pagesToShow.map(page => (
							<li aria-label={`Page ${page}`} className={style.pageItem} key={page}>
		        				<button className={page === currentPage ? style.current : ''} onClick={paginate(page)}>
		            				{page}
		            			</button>   
		            		</li>
						))}

						{currentPage !== totalPages && (
							<li aria-label="Go to last page" className={style.pageItem}>
								<button className={style.pageLink} onClick={paginate(totalPages)}>
									Last
								</button>
							</li>
						)}
					</ul>
				</>
			)}
		</div>
    )
}

export default Pagination;
