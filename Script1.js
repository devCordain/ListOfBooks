

var xhReq = new XMLHttpRequest();
var baseUrl;
var insertBook;
var getBooks; 
var updateBook;
var deleteBook;


var key = localStorage.getItem('apiAccessKey');
if (key == null) {
    GetNewAccessKey();
} else {
    baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
    insertBook = baseUrl + '&op=insert';
    getBooks = baseUrl + '&op=select';
    updateBook = baseUrl + '&op=update';
    deleteBook = baseUrl + '&op=delete';
}


console.log(insertBook);
console.log(getBooks);
console.log(updateBook);
console.log(deleteBook); 

const mytitle = "another title";
const myauthor = "another author";
var id = "84003"; 

 function AddBook(title, author) {
     fetch(insertBook + '&title=' + title + '&author=' + author)
        .then((response) => {
            return response.json();
        })
         .then((myJson) => {
             if (myJson.status != "success") {
                 AddBook(title, author);
             } else {
                 document.getElementById('title_input').value = "";
                 document.getElementById('author_input').value = "";
                 GetBooks();
             }
         });
 }

function GetBooks() {
    var elements = document.getElementsByClassName("bookListItem");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    fetch(getBooks)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson['data'] == undefined) {
                GetBooks();
            } else {
                const html = myJson['data'].map(book => { console.log(typeof book.id.toString()); return `<div class="bookListItem"><p>Author: ${book.author} , Title: ${book.title} <button onclick="DeleteBook(${book.id})">Delete</button><button onclick="UpdateBook(${book.id}, document.getElementById('title_input').value, document.getElementById('author_input').value)">UpdateBook</button></p></div>` }).join('');
                document.querySelector('#allBooks').insertAdjacentHTML('afterbegin', html);
            }
            console.log(myJson['data']);    
        });
}

function UpdateBook(bookId, title, author) {
    fetch(updateBook + "&id=" + bookId + "&title=" + title + "&author=" + author)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson.status != "success") {
                UpdateBook(bookId, title, author);
            } else {
                GetBooks(); 
            }
        });
}

function DeleteBook(bookId) {
    console.log(deleteBook + "&id=" + bookId);
    fetch(deleteBook + "&id=" + bookId)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson.status != "success") {
                DeleteBook(bookId); // try again in 2000 milliseconds
            } else {
                GetBooks();
            }
        });
}

function GetNewAccessKey() {
    xhReq.open("GET", 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey', false);
    xhReq.send(null);
    var jsonObject = JSON.parse(xhReq.responseText);
    key = jsonObject.key.toString();
    if (key == null) {
        GetNewAccessKey();
    } else {
        localStorage.setItem('apiAccessKey', key);
        baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
        insertBook = baseUrl + '&op=insert';
        getBooks = baseUrl + '&op=select';
        updateBook = baseUrl + '&op=update';
        deleteBook = baseUrl + '&op=delete';
    }
}

