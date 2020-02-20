var xhReq = new XMLHttpRequest();
var baseUrl;
var insertBook;
var getBooks; 
var updateBook;
var deleteBook;
var currentBookId = -1;
var maxRequests = 10;
var currentRequests = 0;
var key = localStorage.getItem('apiAccessKey');

if (key == null) {
    GetNewAccessKey();
} else {
    UpdateUrl();
    GetBooks();
}

console.log(insertBook);
console.log(getBooks);
console.log(updateBook);
console.log(deleteBook); 

 function AddBook(title, author) {
     if (currentBookId == -1) {
         fetch(insertBook + '&title=' + title + '&author=' + author)
             .then((response) => {
                 return response.json();
             })
             .then((myJson) => {
                 if (myJson.status != "success" && currentRequests < maxRequests) {
                     currentRequests++;
                     AddBook(title, author);
                 } else {
                     ResetForms();      
                 }
             });
     } else {
         fetch(updateBook + "&id=" + currentBookId + "&title=" + title + "&author=" + author)
             .then((response) => {
                 return response.json();
             })
             .then((myJson) => {
                 if (myJson.status != "success" && currentRequests <= maxRequests) {
                     currentRequests++;
                     AddBook(title, author);
                 } else {
                     ResetForms();
                 }
             });
     } 
}

function ResetForms() {
    if (currentRequests > maxRequests) {
        alert("Hit max amount of errors from server, please try again)");
    }

    document.getElementById('title_input').value = "";
    document.getElementById('author_input').value = "";
    currentBookId = -1;
    currentRequests = 0;
    GetBooks();
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
            if (myJson['data'] == undefined && currentRequests <= maxRequests) {
                currentRequests++;
                GetBooks();
            } else {

                const html = myJson['data'].map(book => { console.log(typeof book.id.toString()); return `<div class="bookListItem"><p>Author: ${book.author} , Title: ${book.title} </p><button onclick="DeleteBook(${book.id})">Delete</button><button onclick="UpdateBook(${book.id}, '${book.title}', '${book.author}')">UpdateBook</button></div>` }).join('');
                document.querySelector('#allBooks').insertAdjacentHTML('afterbegin', html);
            }
            console.log(myJson['data']);    
        });
}


function UpdateBook(bookId, title, author) {
    currentBookId = bookId;
    document.getElementById('title_input').value = title + "";
    document.getElementById('author_input').value = author + "";
}



function DeleteBook(bookId) {
    console.log(deleteBook + "&id=" + bookId);
    fetch(deleteBook + "&id=" + bookId)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson.status != "success" && currentRequests <= maxRequests) {
                currentRequests++;
                DeleteBook(bookId);
            } else {
                ResetForms();
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
        UpdateUrl();
        GetBooks();
    }

}
function UpdateUrl() {
    localStorage.setItem('apiAccessKey', key);
    baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
    insertBook = baseUrl + '&op=insert';
    getBooks = baseUrl + '&op=select';
    updateBook = baseUrl + '&op=update';
    deleteBook = baseUrl + '&op=delete';
}

