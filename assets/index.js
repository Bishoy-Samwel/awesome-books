const books = [{ title: 'title1', author: 'author1' }, { title: 'title2', author: 'author2' }];

const addBook = (title, author) => {
  const book = { title, author };
  books.push(book);
};

const removeBook = (title) => {
  books.filter((book) => book.title !== title);
};

// This function receive a book object return book div
const createBookDiv = (book) => {
  const bookDiv = document.createElement('div');
  const title = document.createElement('p');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = book.author;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Remove';
  const hr = document.createElement('hr');
  bookDiv.append(title, author, delBtn, hr);
  return bookDiv;
};

// this function add book list
const showBooks = () => {
  const bookList = document.querySelector('#books-list');
  const booksDiv = document.createElement('div');
  books.forEach((book) => {
    booksDiv.appendChild(createBookDiv(book));
  });
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
  addBook(title, author);
  showBooks();
  clearInputs();
});
