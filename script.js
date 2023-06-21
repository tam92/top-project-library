let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: "295",
        isRead: false
    },
    {
        title: "La Odisea",
        author: "Homero",
        pages: 250,
        isRead: true
    },
];

addEventListenerBtnNewBook();
displayBooks(myLibrary);

function addEventListenerBtnNewBook() {
    const btnNewBook = document.querySelector("#btnNewBook");
    btnNewBook.addEventListener('click', () => {
        cleanDisplay();
        showForm();
    });
}

function showForm() {
    const display = document.getElementById("booksDisplay");
    const ul = document.createElement("ul");
    const liTitle = document.createElement("li");
    const liAuthor = document.createElement("li");
    const liPages = document.createElement("li");
    const liIsRead = document.createElement("li");

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute('for', 'inputTitle');
    labelTitle.textContent = "Title: ";
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id', "inputTitle");
    liTitle.appendChild(labelTitle);
    liTitle.appendChild(inputTitle);
    ul.appendChild(liTitle);

    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute('for', 'inputAuthor');
    labelAuthor.textContent = "Author: ";
    const inputAuthor = document.createElement('input');
    inputAuthor.setAttribute('id', "inputAuthor");
    liAuthor.appendChild(labelAuthor);
    liAuthor.appendChild(inputAuthor);
    ul.appendChild(liAuthor);

    const labelPages = document.createElement("label");
    labelPages.setAttribute('for', 'inputTitle');
    labelPages.textContent = "How many pages?"
    const inputPages = document.createElement('input');
    inputPages.setAttribute('id', "inputPages");
    liPages.appendChild(labelPages);
    liPages.appendChild(inputPages);
    ul.appendChild(liPages);

    const labelIsRead = document.createElement("label");
    labelIsRead.setAttribute('for', 'isRead');
    labelIsRead.textContent = "Have you read it?"
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
    btnAddNewBook.addEventListener('click', () => {
        const title = document.getElementById("inputTitle").value;
        const author = document.getElementById("inputAuthor").value;
        const pages = document.getElementById("inputPages").value;
        const isRead = document.getElementById("checkIsRead").checked;

        const book = {
            title: title,
            author: author,
            pages: pages,
            isRead: isRead
        }

        addBookToLibrary(book);
    });
}

function cleanDisplay() {
    const display = document.getElementById("booksDisplay");
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    cleanDisplay();
    displayBooks(myLibrary);

    const btnNewBook = document.getElementById("btnNewBook");
    btnNewBook.style.visibility = "visible";

    addEventListenerBtnNewBook();
}

function displayBooks(bookArray) {
    
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

        const isReadCheck = document.createElement('input');
        const lblIsRead = document.createElement("label");
        isReadCheck.setAttribute("type", `checkbox`);
        isReadCheck.setAttribute("id", `checkIsRead${index}`);
        isReadCheck.setAttribute("data-bookIndex", index);
        
        lblIsRead.textContent = "Have you read it?";
        isReadCheck.checked = book.isRead;
        card.appendChild(lblIsRead);
        card.appendChild(isReadCheck);

        const btnDeleteBook = document.createElement("input");
        btnDeleteBook.setAttribute("type", "image");
        btnDeleteBook.setAttribute("id", `btnDeleteBook${index}`);
        btnDeleteBook.setAttribute("src", "icons/delete.svg");
        btnDeleteBook.setAttribute("class", "icon");
        card.appendChild(btnDeleteBook);

        display.appendChild(card);

        addEventListenerCheckIsRead(book, index);
        addEventListenerDeleteBook(index);
    });
}

function addEventListenerDeleteBook(index) {
    const btnDeleteBook = document.querySelector(`#btnDeleteBook${index}`);
    btnDeleteBook.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        cleanDisplay();
        addEventListenerBtnNewBook();
        displayBooks(myLibrary);
    });
}

function addEventListenerCheckIsRead(book, index) {
    const checkIsRead = document.querySelector(`#checkIsRead${index}`);
    checkIsRead.addEventListener('click', () => {
        if (myLibrary[index].isRead === true) {
            myLibrary[index].isRead = false
        } else {
            myLibrary[index].isRead = true;
        }
    });
}

// Book Constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${isRead ? "read." : "not read yet."}`;
    }
} 