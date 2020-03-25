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

if (key === null) {
    GetNewAccessKey();
} else {
    UpdateUrl();
    GetBooks();
}

 function AddBook(title, author) {
     if (currentBookId === -1) {
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
    var elements = document.getElementsByClassName("output-item");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    fetch(getBooks)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson['data'] === undefined && currentRequests <= maxRequests) {
                currentRequests++;
                GetBooks();
            } else {
                const html = myJson['data'].map(book => { console.log(typeof book.id.toString()); return `<div class="output-item"><h3>${book.title}</h3><label>Author</label><br><p>${book.author}</p><button onclick="DeleteBook(${book.id}, '${book.title}', '${book.author}' , true)">Delete</button> <button onclick="UpdateBook(${book.id}, '${book.title}', '${book.author}'); document.getElementById('Form_addBook').scrollIntoView();">Update</button></div>` }).join('');
                document.querySelector('#output-Books').insertAdjacentHTML('afterbegin', html);
            }
        });
}

function UpdateBook(bookId, title, author) {
    currentBookId = bookId;
    document.getElementById('title_input').value = title + "";
    document.getElementById('author_input').value = author + "";
}

function DeleteBook(bookId, title, author, firstCall) {
    if (firstCall){
        var confirmation = confirm("Are you sure you wish to delete " + title + " by " + author + "?");
	}

    if(confirmation || !firstCall){
        fetch(deleteBook + "&id=" + bookId)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if (myJson.status != "success" && currentRequests <= maxRequests) {
                currentRequests++;
                DeleteBook(bookId, title, author, false);
            } else {
                ResetForms();
            }
        });
	}
}

function GetNewAccessKey() {
    xhReq.open("GET", 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey', false);
    xhReq.send(null);
    var jsonObject = JSON.parse(xhReq.responseText);
    key = jsonObject.key.toString();
    if (key === null) {
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

