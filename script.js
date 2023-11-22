// Book Class with getters and setters
class Book {
    constructor(title, author, pages, isRead) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._isRead = isRead;
    }

    // Getters and setters
    get title() {return this._title;}
    set title(title) {this._title = title;}
    
    get author() {return this._author;}
    set author(author) {this._author = author;}

    get pages() {return this._pages;}
    set pages(pages) {this._pages = pages;}

    get isRead() {return this._isRead;}
    set isRead(isRead) {this._isRead = isRead;}

    // Class methods
    info() {
        return `${title} by ${author}, ${pages} pages, ${isRead ? "read." : "not read yet."}`;
    }
} 

// Hardcoded library
let myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", "295", false), 
    new Book("La Odisea", "Homero", "250", true), 
    new Book("Harry Potter and the chamber of secrets", "J.K. Rowling", "300", true), 
    new Book("Harry Potter and the goblet of fire", "J.K. Rowling", "455", true)
];

displayBooks(myLibrary);

// =============================================================================
// ----------------------------- FUNCTIONS -------------------------------------
// =============================================================================

function addBookToLibrary(book) {
    document.getElementById("btnAddNewBook").removeEventListener('click', addNewBk);
    myLibrary.push(book);
    cleanDisplay();
    displayBooks(myLibrary);
    console.log(myLibrary);

    const btnNewBook = document.getElementById("btnNewBook");
    btnNewBook.style.visibility = "visible";

    addEventListenerBtnNewBook();
}

function addNewBk (title, author, pages, isRead) {
    let book = new Book();
        book.title = title
        book.author = author
        book.pages = pages
        book.isRead = isRead

    addBookToLibrary(book);
    }
    
function addEventListenerBtnNewBook() {
    const btnNewBook = document.querySelector("#btnNewBook");
    btnNewBook.addEventListener('click', fnEventListenerBtnNewBook);
    btnNewBook.removeEventListener('click', addEventListenerBtnNewBook);
}

function addEventListenerDeleteBook(index) {
    const btnDeleteBook = document.querySelector(`#btnDeleteBook${index}`);
    btnDeleteBook.addEventListener("click", addEvListDeleteBookBtn);
    btnDeleteBook.myIndex = index;
}

function addEventListenerCheckIsRead(book, index) {
    const checkIsRead = document.querySelector(`#checkIsRead${index}`);
    checkIsRead.addEventListener('click', changeReadStatus);
    checkIsRead.myIndex = index;

}

function fnEventListenerBtnNewBook() {
    cleanDisplay();
    showForm();
}

function showForm() {
    const display = document.getElementById("booksDisplay");
    display.setAttribute("id", "formDisplay");

    const ul = document.createElement("ul");
    const liTitle = document.createElement("li");
    const liAuthor = document.createElement("li");
    const liPages = document.createElement("li");
    const liIsRead = document.createElement("li");
    liIsRead.setAttribute("id", "liRead");

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute('for', 'inputTitle');
    labelTitle.textContent = "Title: ";
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id', "inputTitle");
    inputTitle.setAttribute("required", true);
    liTitle.appendChild(labelTitle);
    liTitle.appendChild(inputTitle);
    ul.appendChild(liTitle);

    // Span for title error
    const spanTitle = document.createElement("span");
    spanTitle.setAttribute("id", "spanTitle")
    spanTitle.classList.add("error");
    spanTitle.setAttribute("aria-live", "polite");
    ul.appendChild(spanTitle);

    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute('for', 'inputAuthor');
    labelAuthor.textContent = "Author: ";
    const inputAuthor = document.createElement('input');
    inputAuthor.setAttribute('id', "inputAuthor");
    inputAuthor.setAttribute("required", true)
    liAuthor.appendChild(labelAuthor);
    liAuthor.appendChild(inputAuthor);
    ul.appendChild(liAuthor);

    // Span for author error
    const spanAuthor = document.createElement("span");
    spanAuthor.setAttribute("id", "spanAuthor")
    spanAuthor.classList.add("error");
    spanAuthor.setAttribute("aria-live", "polite");
    ul.appendChild(spanAuthor);

    const labelPages = document.createElement("label");
    labelPages.setAttribute('for', 'inputPages');
    labelPages.setAttribute("class", "lblWhiteSpace")
    labelPages.textContent = "How many pages?  "
    const inputPages = document.createElement('input');
    inputPages.setAttribute('id', "inputPages");
    inputPages.setAttribute("type", "number")
    inputPages.setAttribute("required", true);
    inputPages.setAttribute("min", 1)
    liPages.appendChild(labelPages);
    liPages.appendChild(inputPages);
    ul.appendChild(liPages);

    // Span for pages error
    const spanPages = document.createElement("span");
    spanPages.classList.add("error");
    spanPages.setAttribute("id", "spanPages")
    spanPages.setAttribute("aria-live", "polite");
    ul.appendChild(spanPages);

    const labelIsRead = document.createElement("label");
    labelIsRead.setAttribute('for', 'checkIsRead');
    labelIsRead.textContent = "Mark as read  ";
    const inputIsRead = document.createElement('input');
    inputIsRead.setAttribute("type", "checkbox");
    inputIsRead.setAttribute('id', "checkIsRead");
    liIsRead.appendChild(labelIsRead);
    liIsRead.appendChild(inputIsRead);
    ul.appendChild(liIsRead);
    
    display.appendChild(ul);

    const btnAddBook = document.createElement("input");
    btnAddBook.setAttribute("value", "Add New Book");
    btnAddBook.setAttribute("type", "button");
    btnAddBook.setAttribute("id", "btnAddNewBook");
    display.appendChild(btnAddBook);

    const btnNewBook = document.getElementById("btnNewBook");
    btnNewBook.style.visibility = "hidden";

    const btnAddNewBook = document.querySelector("#btnAddNewBook");
    btnAddNewBook.addEventListener('click', formValidation);
}

function formValidation() {
    let title, author, pages;
    // Validating title
    if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity("The title can't be empty!");
        spanTitle.textContent = "Please, fill out the title!"
        title = "";
    } else {
        spanTitle.textContent = "";
        inputTitle.setCustomValidity("")
        title = inputTitle.value;
    }

    // Validating author
    if (inputAuthor.validity.valueMissing) {
        inputAuthor.setCustomValidity("The author can't be empty!");
        spanAuthor.textContent = "Please, fill out the author!"
        author = "";
    } else {
        spanAuthor.textContent = "";
        inputAuthor.setCustomValidity("")
        author = inputAuthor.value;
    }

    // Validating pages
    if (inputPages.validity.valueMissing || inputPages.validity.rangeUnderflow || inputPages.validity.badInput ) {
        inputPages.setCustomValidity("The pages field can't be empty!");
        spanPages.textContent = "The number of pages must be a number greater than 0."
        pages = ""
    } else {
        spanPages.textContent = "";
        inputPages.setCustomValidity("")
        pages = inputPages.value;
    }

    if (title !== "" && author !== "" && pages !== "") {
        addNewBk(title, author, pages, checkIsRead.checked)
    }
}

function cleanDisplay() {
    document.getElementById("btnNewBook").removeEventListener('click', fnEventListenerBtnNewBook);

    if (document.getElementById("formDisplay")) {
        document.getElementById("formDisplay").setAttribute("id", "booksDisplay");
    }

    const display = document.getElementById("booksDisplay");
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

function displayBooks(bookArray) {
    addEventListenerBtnNewBook();
    const display = document.getElementById("booksDisplay");

    bookArray.forEach((book, index) => {

        const card = document.createElement("div");
        card.setAttribute('class', 'card');

        const titleP = document.createElement('p');
        titleP.textContent = `Title: ${book.title}`;
        card.appendChild(titleP);

        const authorP = document.createElement('p');
        authorP.textContent = `Author: ${book.author}`;
        card.appendChild(authorP);

        const pagesP = document.createElement('p');
        pagesP.textContent = `Pages: ${book.pages}`;
        card.appendChild(pagesP);

        const divRead = document.createElement('div');
        divRead.setAttribute("class", "divCardRead");

        const isReadCheck = document.createElement('input');
        const lblIsRead = document.createElement("label");
        lblIsRead.setAttribute("for", `checkIsRead${index}`);
        lblIsRead.setAttribute("class", "lblWhiteSpace");
        isReadCheck.setAttribute("type", `checkbox`);
        isReadCheck.setAttribute("id", `checkIsRead${index}`);
        isReadCheck.setAttribute("data-bookIndex", index);
        
        lblIsRead.textContent = "Have you read it?  ";
        isReadCheck.checked = book.isRead;
        divRead.appendChild(lblIsRead);
        divRead.appendChild(isReadCheck);
        card.appendChild(divRead);

        const divDelete = document.createElement('div');
        divDelete.setAttribute("class", "divCardDelete");

        const btnDeleteBook = document.createElement("input");
        btnDeleteBook.setAttribute("type", "image");
        btnDeleteBook.setAttribute("id", `btnDeleteBook${index}`);
        btnDeleteBook.setAttribute("src", "icons/delete.svg");
        btnDeleteBook.setAttribute("class", "icon");
        const lblDeleteBook = document.createElement("label");
        lblDeleteBook.textContent = "Delete book  ";
        lblDeleteBook.setAttribute("for", `btnDeleteBook${index}`);
        lblDeleteBook.setAttribute("class", "lblWhiteSpace");
        divDelete.appendChild(lblDeleteBook);
        divDelete.appendChild(btnDeleteBook);
        card.appendChild(divDelete);

        display.appendChild(card);

        addEventListenerCheckIsRead(book, index);
        addEventListenerDeleteBook(index);
    });
}

function addEvListDeleteBookBtn (event) {
    const index = event.currentTarget.myIndex;
    document.querySelector(`#btnDeleteBook${event.currentTarget.myIndex}`).removeEventListener('click', addEvListDeleteBookBtn);
    document.querySelector(`#checkIsRead${event.currentTarget.myIndex}`).removeEventListener('click', changeReadStatus);
    myLibrary.splice(index, 1);
    cleanDisplay();
    addEventListenerBtnNewBook();
    displayBooks(myLibrary);
}

function changeReadStatus(event) {
    const index = event.currentTarget.myIndex;
    if (myLibrary[index].isRead === true) {
        myLibrary[index].isRead = false
    } else {
        myLibrary[index].isRead = true;
    }
}