import { createContext, useReducer } from 'react';

const DUMMY_READS = [
	{
		id: 'read1',
		title: 'Title 1',
		author: 'Author 1',
		date_started: new Date('2021-12-01'),
		date_finished: new Date('2021-12-03'),
		genre: 'contemprorary',
		pages: 120,
	},
	{
		id: 'read2',
		title: 'Title 2',
		author: 'Author 2',
		date_started: new Date('2022-01-07'),
		date_finished: new Date('2022-01-14'),
		genre: 'horror',
		pages: 508,
	},
	{
		id: 'read3',
		title: 'Title 3',
		author: 'Author 3',
		date_started: new Date('2022-01-08'),
		date_finished: new Date('2022-01-14'),
		genre: 'romance',
		pages: 340,
	},
	{
		id: 'read4',
		title: 'Title 4',
		author: 'Author 4',
		date_started: new Date('2022-02-13'),
		date_finished: new Date('2022-02-19'),
		genre: 'contemprorary',
		pages: 297
	}
]


export const ReadBooksContext = createContext({
	books: [],
	addBook: ({title, author, date_started, genre, pages}) => {},
	updateBook: (id, {date_started, date_finished}) => {},
	deleteBook: (id) => {}
});

function readBooksReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = 'read' + (state.length + 1).toString();
			return [{ ...action.payload, id: id}, ...state];
		case 'UPDATE':
			const bookToUpdateIndex = state.findIndex((book) => book.id === action.payload.id);
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

function ReadBooksContextProvider({children}) {

	const [readBooksState, dispatch] = useReducer(readBooksReducer, DUMMY_READS);

	function addReadBook(bookData) {
		dispatch({type: 'ADD', payload: bookData});
	}

	function deleteReadBook(id) {
		dispatch({type: 'DELETE', payload: id});
	}

	function updateReadBook(id, bookData) {
		dispatch({type: 'UPDATE', payload: {id: id, data: bookData}});
	}

	const value = {
		books: readBooksState,
		addReadBook: addReadBook,
		deleteReadBook: deleteReadBook,
		updateReadBook: updateReadBook
	};

	return <ReadBooksContext.Provider value={value}>{children}</ReadBooksContext.Provider>
}

export default ReadBooksContextProvider;