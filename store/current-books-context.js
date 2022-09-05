import { createContext, useReducer } from 'react';

const DUMMY_BOOKS = [
	{
		id: 'book1',
		title: 'Test Book 1',
		author: 'Moi',
		progress: 0,
		pages: 457,
		date_started: new Date('2022-03-09')
	},
	{
		id: 'book2',
		title: 'Test Book 2',
		author: 'Not Moi',
		progress: 40,
		pages: 269,
		date_started: new Date('2022-04-07')
	},
	{
		id: 'book3',
		title: 'Test Book 3',
		author: 'Moi Aussi',
		progress: 124,
		pages: 320,
		date_started: new Date('2022-03-17')
	}
];

export const CurrentBooksContext = createContext({
	books: [],
	addBook: ({title, author, pages, genre, date_started, progress}) => {},
	updateBook: (id, {progress}) => {},
	deleteBook: (id) => {}
});

function currentBooksReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = 'book' + (state.length + 1).toString();
			const progress = 0;
			return [{ ...action.payload, id: id, progress: progress}, ...state];
		case 'UPDATE':
			const bookToUpdateIndex = state.findIndex((book) => book.id == action.payload.id);
			console.log(bookToUpdateIndex);
			const bookToUpdate = state[bookToUpdateIndex];
			const updatedItem = {...bookToUpdate, ...action.payload.data};
			const updatedBooks = [...state];
			updatedBooks[bookToUpdateIndex] = updatedItem;
			return updatedBooks;
		case 'DELETE':
			return state.filter((book) => book.id !== action.payload)
		default:
			return state;
	}
}

function CurrentBooksContextProvider({children}) {

	const [currentBooksState, dispatch] = useReducer(currentBooksReducer, DUMMY_BOOKS);

	function addCurrentBook(bookData) {
		dispatch({type: 'ADD', payload: bookData});
	}

	function deleteCurrentBook(id) {
		dispatch({type: 'DELETE', payload: id});
	}

	function updateCurrentBook(id, bookData) {
		dispatch({type: 'UPDATE', payload: {id: id, data: bookData} });
	}

	const value = {
		books: currentBooksState,
		addCurrentBook: addCurrentBook,
		deleteCurrentBook: deleteCurrentBook,
		updateCurrentBook: updateCurrentBook
	};

	return <CurrentBooksContext.Provider value={value}>{children}</CurrentBooksContext.Provider>
}

export default CurrentBooksContextProvider;