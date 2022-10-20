const startBooks = [
    {
        title: 'Miej wyje**ne, będzie Ci dane. O trudnej sztuce odpuszczania',
        year: 2021,
        category: 'Rozwój osobisty',
        image:'https://cf-taniaksiazka.statiki.pl/images/large/115/9788328381391.jpg',
        alt: 'foto',
        author: 'Katarzyna Czyż'
    },
    {
        title: 'Werdykt. Joanna Chyłka. Tom 16',
        year: 2022,
        category: 'Kryminał',
        image:'https://cf-taniaksiazka.statiki.pl/images/large/7F0/9788366981720.jpg',
        alt: 'foto',
        author: 'Remigiusz Mróz'
    },
    {
        title: 'Rodzina Pętelków czeka na święta',
        year: 2022,
        category: 'Dla dzieci',
        image:'https://cf-taniaksiazka.statiki.pl/images/large/8AE/9788382408072.jpg',
        alt: 'foto',
        author: 'Barbara Supeł'
    },
    {
        title: 'Kaczyński i jego pajęczyna. Tkanie sieci 1949-1995',
        year: 2022,
        category: 'Fakty',
        image:'https://cf-taniaksiazka.statiki.pl/images/large/AB2/9788366095359.jpg',
        alt: 'foto',
        author: 'Tomasz Piątek'
    }, 
    {
        title: 'Pułapki myślenia',
        year: 2012,
        category: 'Psychologia',
        image:'https://cf-taniaksiazka.statiki.pl/images/large/34F/9788372786777.jpg',
        alt: 'foto',
        author: 'Daniel Kahneman'
    }    
]

let books = [];
const booksList = document.querySelector('#bookList');
const formSearch = document.querySelector('#SearchForm');
const searchInput = document.querySelector('#searchInput');
const searchAlert = document.querySelector('#searchAlert');
const showNewBookForm = document.querySelector('#showNewBookForm');
const showAllBooks = document.querySelector('#showAllBooks');

const newBookForm = document.querySelector('#newBookForm');
let newBookTitle = document.querySelector('#newBookTitle');
let newBookYear = document.querySelector('#newBookYear');
let newBookCategory = document.querySelector('#newBookCategory');
let newBookImage = document.querySelector('#newBookImage');
let newBookAlt = document.querySelector('#newBookAlt');
let newBookAuthor = document.querySelector('#newBookAuthor');
const cancel = document.querySelector('#btnCancel');

const generateBookList = (bookCollection) =>{
    booksList.innerHTML = '';
    bookCollection.forEach((book) => {
        booksList.innerHTML += `
        <li>
            <div class="book">
                <h3 class="book-title">${book.title}</h2>
                <img class="book_photo" src=${book.image} alt=${book.alt}/>
                <div class="book-info">
                    <div> Tytuł: ${book.title} </div>
                    <div> Kategoria: ${book.category} </div>
                    <div> Autor: ${book.author} </div>
                    <div> Rok wydania: ${book.year} </div>
                </div>
            </div>
        </li>
        `
    })
}

const filterBookList = (bookCollection, phrase) =>{
    return bookCollection.filter(book => book.title.toUpperCase().includes(phrase.toUpperCase()));
}

const validateSearchItem = () => {
    if ( 0 == searchInput.value.length || searchInput.value.length >= 3) {
        console.log(searchInput.value.length, 'true')
        searchAlert.classList.add('visible-non');
        return true;
    }
    else{
        console.log(searchInput.value.length, 'false')
        searchAlert.classList.remove('visible-non');
        return false;
    }
}

const getFilteredBookList  = (event) => {
    event.preventDefault();
  
    const isValid = validateSearchItem();
    if (isValid) {
        const filteredBooksList = filterBookList(books, searchInput.value);
        return generateBookList(filteredBooksList);
    }
    else{
        return generateBookList(books);
    }
}

const showNewBookFormEvent = (event) => {
    event.preventDefault();
    newBookForm.style.display = "block";
}

const showAllBookEvent = (event) =>{
    event.preventDefault();
    return generateBookList(books);   
}

const cancelForm = (event) => {
    event.preventDefault();
    
    clearNewBookForm();
    newBookForm.style.display = "none"; 
    return      
}

const addNewBookToLibraryEvent = (event) =>{
    event.preventDefault();

    const newBook = {
        title: newBookTitle.value,
        year: newBookYear.value,
        category: newBookCategory.value,
        image: newBookImage.value,
        alt: newBookAlt.value,
        author: newBookAuthor.value
    }                           
    books.push(newBook);
    addToLocalStorage(newBook);
    
    clearNewBookForm();
    newBookForm.style.display = "none";
    return generateBookList(books);
}

const clearNewBookForm = () =>{
    newBookTitle.value = '';
    newBookYear.value = '';
    newBookCategory.value = '';
    newBookImage.value = '';
    newBookAlt.value = '';
    newBookAuthor.value = '';
}

const addToLocalStorage = (book) =>{
	let storageJSON = localStorage.getItem("DM_Library");
	if(storageJSON != null){
		let storage = JSON.parse(storageJSON);
		storage.push(book);
		storageJSON = JSON.stringify(storage);
		localStorage.setItem("DM_Library", storageJSON);
	}
	else{
		localStorage.setItem("DM_Library", JSON.stringify([book]));
	}	
}

const initialLocalSorage = (books) =>{
	let storageJSON = localStorage.getItem("DM_Library");
	if(storageJSON == null){  
        localStorage.setItem("DM_Library", JSON.stringify(books));
    }
}

const loadBooksFromLocalStorage = () =>{
    const StorageJSON = localStorage.getItem("DM_Library");
    books = JSON.parse(StorageJSON); 
	return generateBookList(books);	
}

initialLocalSorage(startBooks);
loadBooksFromLocalStorage();
formSearch.addEventListener('submit', getFilteredBookList);
searchInput.addEventListener('input', getFilteredBookList); 
showNewBookForm.addEventListener('click', showNewBookFormEvent);
showAllBooks.addEventListener('click', showAllBookEvent);
newBookForm.addEventListener('submit', addNewBookToLibraryEvent);
cancel.addEventListener('click', cancelForm);