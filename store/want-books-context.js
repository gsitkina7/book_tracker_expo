import { createContext, useReducer } from 'react';

const DUMMY_WANTS = [
	{
		id: 'want1',
		title: 'Title 1',
		author: 'Author 1',
		date_added: new Date('2021-12-01'),
		pages: 120,
		genre: 'contemporary'
	},
	{
		id: 'want2',
		title: 'Title 2',
		author: 'Author 2',
		date_added: new Date('2022-01-07'),
		page: 452,
		genre: 'fantasy',
	},
	{
		id: 'want3',
		title: 'Title 3',
		author: 'Author 3',
		date_added: new Date('2022-01-08'),
		pages: 341,
		genre: 'young adult'
	},
	{
		id: 'want4',
		title: 'Title 4',
		author: 'Author 4',
		date_added: new Date('2022-02-13'),
		pages: 653,
		genre: 'horror',
		description: 'This is a description'
	}
]


export const WantBooksContext = createContext({
	books: [],
	addBook: ({title, author, pages, genre, description}) => {},
	updateBook: (id, {title}) => {},
	deleteBook: (id) => {}
});

function wantBooksReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = 'want' + (state.length + 1).toString();
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

function WantBooksContextProvider({children}) {

	const [wantBooksState, dispatch] = useReducer(wantBooksReducer, DUMMY_WANTS);

	function addWantBook(bookData) {
		dispatch({type: 'ADD', payload: bookData});
	}

	function deleteWantBook(id) {
		dispatch({type: 'DELETE', payload: id});
	}

	function updateWantBook(id, bookData) {
		dispatch({type: 'UPDATE', payload: {id: id, data: bookData}});
	}

	const value = {
		books: wantBooksState,
		addWantBook: addWantBook,
		deleteWantBook: deleteWantBook,
		updateWantBook: updateWantBook
	};

	return <WantBooksContext.Provider value={value}>{children}</WantBooksContext.Provider>
}

export default WantBooksContextProvider;