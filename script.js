const bookshelf = document.getElementById("bookshelf")

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

const hobbit = new Book("Hobbit","Tolkien","200","read")

const ass = new Book("ass eating","papa frank","69","read")

myLibrary.push(hobbit)
myLibrary.push(ass)

console.log(myLibrary)

function addBookToLibrary() {
  // do stuff here
}

//function that displays each book on the dom.
function libraryDisplay() {
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

libraryDisplay()