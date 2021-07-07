class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static books = JSON.parse(localStorage.getItem('books')) || [];

  static addBook(book) {
    Book.books.push(book);
    localStorage.setItem('books', JSON.stringify(Book.books));
  }

  static removeBook(title) {
    Book.books = Book.books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(Book.books));
  }

  static exist(title) {
    return Book.books.find((book) => book.title === title);
  }
}

// This function receive a book object return book div
const createBookDiv = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.setAttribute('class', 'bookDiv d-flex');

  const bookInfo = document.createElement('p');
  bookInfo.textContent = `${book.title} by ${book.author}`;
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', book.title);
  delBtn.textContent = 'Remove';
  delBtn.setAttribute('class', 'delete');
  bookDiv.append(bookInfo, delBtn);
  return bookDiv;
};

// this function add book list
const showBooks = () => {
  const bookList = document.querySelector('#books-list');
  const booksDiv = document.createElement('div');
  booksDiv.setAttribute('class', 'd-flex')
  booksDiv.setAttribute('id', 'books-div')
  Book.books.forEach((book) => {
    booksDiv.appendChild(createBookDiv(book));
  });
  bookList.innerHTML = '';
  bookList.appendChild(booksDiv);
};

const clearInputs = () => {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
};

document.querySelector('#book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (!Book.exist(title)) {
    const book = new Book(title, author);
    Book.addBook(book);
  }
  showBooks();
  clearInputs();
});

document.querySelector('#books-list').onclick = (event) => {
  if (event.target.className === 'delete') {
    const bookDiv = event.target.closest('.bookDiv');
    const { id } = bookDiv.querySelector('.delete');
    Book.removeBook(id);
    bookDiv.remove();
  }
};

document.addEventListener('DOMContentLoaded', showBooks);