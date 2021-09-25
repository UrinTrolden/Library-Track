const bookshelf = document.getElementById("bookshelf");
const bookform = document.getElementById("bookform");

let myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.id = id
}

let bookIdCount = 0;

function bookIdCreator() {
  return ++bookIdCount;
}


function addBookToLibrary() {
  // do stuff here
}
 
//function that displays each book on the dom.
function libraryDisplay() {
    
  //removes all existing books so there won't be duplicates
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.lastChild);
  }
  
  myLibrary = myLibrary.filter(function(item, pos) {
    return myLibrary.indexOf(item) == pos;
  })

  myLibrary.forEach(book => {
        let newBook = document.createElement("div");
        bookshelf.appendChild(newBook).className = "books";
        //adds title
        let bookTitle = document.createElement("h1");
        bookTitle.innerText = book.title;
        newBook.appendChild(bookTitle).className = "booktitle";
        //adds author
        let bookAuthor = document.createElement("h2");
        bookAuthor.innerText = book.author;
        newBook.appendChild(bookAuthor).className = "bookauthor"; 
        //adds pages
        let bookPages = document.createElement("h3");
        bookPages.innerText = book.pages;
        newBook.appendChild(bookPages).className = "bookpages";     
        //adds read status
        let bookRead = document.createElement("h3");
        bookRead.innerText = book.read;
        newBook.appendChild(bookRead).className = "bookread"; 
    });
}

bookform.addEventListener("submit", (e) => {
  e.preventDefault();
  let bookTitle = bookform.querySelector('input[id="title"]').value;
  let bookAuthor = bookform.querySelector('input[id="author"]').value;
  let bookPages = bookform.querySelector('input[id="pages"]').value;
  let bookRead = bookform.querySelector('input[id="read"]').checked;
  if(bookRead) {
    bookRead = "Read.";
  } else {
    bookRead = "Not read.";
  }
  let bookId = bookIdCreator();
  myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead, bookId));
  libraryDisplay();
  console.log(myLibrary)
})


libraryDisplay()