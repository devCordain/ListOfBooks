

var xhReq = new XMLHttpRequest();

var key = localStorage.getItem('apiAccessKey');
if (key == null) {
    GetNewAccessKey();
}

const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
const insertBook = baseUrl + '&op=insert';
const getBooks = baseUrl + '&op=select';
const updateBook = baseUrl + '&op=update';
const deleteBook = baseUrl + '&op=delete';

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
            console.log(myJson);
            if (myJson.status != "success") {
                setTimeout(AddBook(title, author), 2000);
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
            }
            console.log(myJson['data']);    
        });
}

function UpdateBook() {
    fetch(updateBook + id)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
}

function DeleteBook() {
    fetch(deleteBook + id)
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
}

