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
  bookInfo.innerHTML = `"${book.title}" by <span class="author">${book.author}</span>`;
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
  booksDiv.setAttribute('class', 'd-flex');
  booksDiv.setAttribute('id', 'books-div');
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

// nav-btn id => section id
var nav_section_dict = {
  'list': "books-list",
  "add-new": "book-form",
  "contact": "contact-sec"
};
const showSection = (id) => {
  document.querySelectorAll('section').forEach((ele) => ele.classList.add('d-none'))
  document.querySelector(`#${nav_section_dict[id]}`).classList.remove('d-none')
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

document.querySelector('#nav-links').onclick = (event) => {
  if (event.target.className === 'nav-btn') {
    showSection(event.target.id)
  }
};

document.addEventListener('DOMContentLoaded', showBooks);
