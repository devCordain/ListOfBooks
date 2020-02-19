

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
                 setTimeout(AddBook(title, author), 2000); // try again in 2000 milliseconds
             }
         });
}

function GetBooks() {
    fetch(getBooks)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson['data'] == undefined) {
                setTimeout(GetBooks(), 2000);
            } else {
                const html = myJson['data'].map(book => { console.log(typeof book.id.toString()); return `<div class="bookListItem"><p>Name: ${book.author} <button onclick="DeleteBook(${book.id})">Delete</button><button onclick="UpdateBook(${book.id}, document.getElementById('title_input').value, document.getElementById('author_input').value)">UpdateBook</button></p></div>` }).join('');
                document.querySelector('#allBooks').insertAdjacentHTML('afterbegin', html);
            }
            console.log(myJson['data']);    
        });
}

function UpdateBook(bookId, titel, author) {
    fetch(updateBook + "&id=" + bookId + "&title=" + titel + "&author=" + author)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
}

function DeleteBook(bookId) {
    console.log(deleteBook + "&id=" + bookId);
    fetch(deleteBook + "&id=" + bookId)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
}

function GetNewAccessKey() {
    xhReq.open("GET", 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey', false);
    xhReq.send(null);
    var jsonObject = JSON.parse(xhReq.responseText);
    key = jsonObject.key.toString();
    localStorage.setItem('apiAccessKey', key);
    baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
    insertBook = baseUrl + '&op=insert';
    getBooks = baseUrl + '&op=select';
    updateBook = baseUrl + '&op=update';
    deleteBook = baseUrl + '&op=delete';
}

