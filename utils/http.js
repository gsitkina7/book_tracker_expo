import axios from 'axios';

export function storeCurrentBook(bookData) {
	const response = axios.post(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/current.json',
		bookData
	);
	const id = response.id.name;
	return id;
}

export function storeWantBook(bookData) {
	const response = axios.post(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/want.json',
		bookData
	);
	const id = response.id.name;
	return id;
}

export function storeReadBook(bookData) {
	axios.post(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/read.json',
		bookData,
	)
}

export async function getCurrentBook() {
	const response = axios.get(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/current.json'
	)
	const books = [];

	for (const key in response.data) {
		const bookObj = {
			id: key,
			title: response.data[key].title,
			author: response.data[key].author,
			pages: response.data[key].title,
			genre: response.data[key].genre,
			date_started: new Date(response.data[key].date_started),
			description: response.data[key].description
		}
		books.push(bookObj);
	}
	
	return books;
}

export async function getWantBook() {
	const response = axios.get(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/want.json'
	)
}

export async function getReadBook() {
	const response = axios.get(
		'https://book-tracker-3b5ad-default-rtdb.firebaseio.com/read.json'
	)
}

export function updateCurrentBook(id, bookData) {
	return axios.put(`https://book-tracker-3b5ad-default-rtdb.firebaseio.com/current/${id}.js`, bookData);
};

export function deleteCurrentBook() {
	return axios.delete(`https://book-tracker-3b5ad-default-rtdb.firebaseio.com/current/${id}.js`);
}