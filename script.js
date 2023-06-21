/* All of your book objects are going to be stored in a simple array, so add a 
function to the script (not the constructor) that can take user’s input and 
store the new book objects into an array */
let myLibrary = [
    ["The Hobbit", "J.R.R. Tolkien", "295", false],
    ["La Odisea", "Homero", 250, true],
];

const btnNewBook = document.querySelector("#btnNewBook");
btnNewBook.addEventListener('click', () => {
    cleanDisplay();
    showForm();
});

displayBooks(myLibrary);

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);

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
    inputIsRead.setAttribute('id', "isRead");
    liIsRead.appendChild(labelIsRead);
    liIsRead.appendChild(inputIsRead);
    ul.appendChild(liIsRead);
    
    display.appendChild(ul);

    const btnAddBook = document.createElement("input");
    btnAddBook.setAttribute("value", "Add New Book");
    btnAddBook.setAttribute("type", "button");
    display.appendChild(btnAddBook);
}

function cleanDisplay() {
    const display = document.getElementById("booksDisplay");
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
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

function addBookToLibrary() {

}

/* Write a function that loops through the array and displays each book on the 
page. You can display them in some sort of table, or each on their own “card”. 
It might help for now to manually add a few books to your array so you can see 
the display. */
function displayBooks(bookArray) {
    bookArray.forEach(book => {
        const display = document.getElementById("booksDisplay");

        const card = document.createElement("div");
        card.setAttribute('class', 'card');

        const titleP = document.createElement('p');
        titleP.textContent = `Title: ${book[0]}`;
        card.appendChild(titleP);

        const authorP = document.createElement('p');
        authorP.textContent = `Author: ${book[1]}`;
        card.appendChild(authorP);

        const pagesP = document.createElement('p');
        pagesP.textContent = `Pages: ${book[2]}`;
        card.appendChild(pagesP);

        const wasReadP = document.createElement('p');
        wasReadP.textContent = book[3] ? "Read." : "Not read yet."
        card.appendChild(wasReadP);

        display.appendChild(card);
    });
}
