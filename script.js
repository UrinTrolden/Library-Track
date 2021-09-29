const bookshelf = document.getElementById("bookshelf");
const bookform = document.getElementById("bookform");
const pageread = document.getElementById("pageread");

let pagereadNum = 0;
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

//function that displays each book on the dom.
function libraryDisplay() {
    
  //removes all existing books from dom so there won't be duplicates
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.lastChild);
  }
  
  myLibrary = myLibrary.filter(function(item, pos) {
    return myLibrary.indexOf(item) == pos;
  })

  myLibrary.forEach(book => {
        let newBook = document.createElement("div");
        newBook.id = book.id;
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
        //add remove button
        let bookRemove = document.createElement("button");
        bookRemove.innerText = "Remove book";
        bookRemove.id = "bookremove";
        newBook.appendChild(bookRemove).className = "bookremove"; 

        if ((book.id == bookIdCount) && (book.pages > 0)) {
          pagereadNum += parseInt(book.pages);
          console.log(pagereadNum)
        }
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
});


//eventlistener for removing books
addEventListener("click", function(e){
  if (e.target && e.target.classList.contains("bookremove")) {
    console.log("jeff");
    
    pagereadNum -= parseInt(myLibrary[e.target.id].pages);
    console.log(pagereadNum)
    
    const index = Number(e.target.id.slice(-1));
    myLibrary.splice(index, 1);


    libraryDisplay();
  }
});


libraryDisplay()