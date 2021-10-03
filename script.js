const bookshelf = document.getElementById("bookshelf");
const bookform = document.getElementById("bookform");
const pagesread = document.getElementById("pagesread");



let pagereadNum = 0;
let myLibrary = [];

if (!localStorage.getItem('storedLib')) {
  populateStorage()
  console.log('populate storage')
} else {
  setStyles();
  console.log('set styles')
}

function populateStorage() {
  localStorage.setItem('storedLib', JSON.stringify(myLibrary));
  setStyles()
}

function setStyles() {
  myLibrary = JSON.parse(localStorage.getItem('storedLib'));
  libraryDisplay() 
}



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
        //add change read status
        let bookChangeRead = document.createElement("button");
        bookChangeRead.innerText = "Change read status";
        bookChangeRead.id = "changeread";
        newBook.appendChild(bookChangeRead).className = "changeread"; 
    });
    pagesread.innerText = pagereadNum;
    localStorage.setItem('storedLib', JSON.stringify(myLibrary));
}

bookform.addEventListener("submit", (e) => {
  e.preventDefault();
  let bookTitle = bookform.querySelector('input[id="title"]').value;
  let bookAuthor = bookform.querySelector('input[id="author"]').value;
  let bookPages = bookform.querySelector('input[id="pages"]').value;
  let bookRead = bookform.querySelector('input[id="read"]').checked;
  console.log(bookform.querySelector('input[id="pages"]').value)
  
  if (bookPages > 0 && bookRead) {
    pagereadNum += Number(bookPages);
  }

  if(bookRead) {
    bookRead = "Read. ✅";
  } else {
    bookRead = "Not read. ❌";
  }

  let bookId = bookIdCreator();
  myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead, bookId));
  libraryDisplay();
  console.log(myLibrary)
});


//eventlistener for removing books and change read status
addEventListener("click", function(e){
  
  let myLibIndex = myLibrary.findIndex((num) => num.id == e.target.parentNode.id);

  if (e.target && e.target.classList.contains("bookremove")) {
    console.log("jeff");
    
    if (e.target.parentNode.childNodes[3].innerText == "Read. ✅") {
      pagereadNum -= e.target.parentNode.childNodes[2].innerText;
    }
    
    myLibrary.splice(myLibIndex, 1);


    libraryDisplay();
  }
  
  if (e.target && e.target.classList.contains("changeread")) {
    if (e.target.parentNode.childNodes[3].innerText == "Read. ✅") {
      myLibrary[myLibIndex].read = "Not read. ❌";
      pagereadNum -= Number(e.target.parentNode.childNodes[2].innerText);     
    } else {
      myLibrary[myLibIndex].read = "Read. ✅";
      pagereadNum += Number(e.target.parentNode.childNodes[2].innerText);  
    }

    libraryDisplay();
  }
});


libraryDisplay()