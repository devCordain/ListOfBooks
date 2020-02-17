// JavaScript source code

//Test function
//function myFunction() {
//    document.body.style.backgroundColor = "red";
//}


////https://www.youtube.com/watch?time_continue=85&v=FN_ffvw_ksE&feature=emb_logo

////get data 
//function FetchData() {
//    fetch("https:/reqres.in/api/users")
//        .then(Response => {
//            return Response.json();
//        }).then(data => {
//            //console.log(data.data);
//            const html = data.data.map(user => {
//                return `<p>Name: ${user.first_name}</p>`
//            }).join('');
//            document.querySelector('#users')
//                .insertAdjacentHTML('afterbegin', html);
//        }).catch(error => {
//            console.log(error);
//        })
//}

////Post Data
//function PostData() {
//    fetch("https:/reqres.in/api/users", {
//        method: 'POST',
//        headers: {
//            "Content-Type": "application/json"
//        },
//        body: JSON.stringify({
//            name: 'Petter',
//            job: 'Developer'
//        })
//    })
//        .then(Response => {
//            return Response.json();
//        }).then(data => {
//            console.log(data);
//        }).catch(error => {
//            console.log(error);
//        })
//}


//const Http = new XMLHttpRequest();
//const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
//Http.open("GET", url);
//Http.send();


//Http.onreadystatechange = (e) => {
//    var response = JSON.parse(Http.responseText);
//    alert(response.key);
//}                       


var xhReq = new XMLHttpRequest();
xhReq.open("GET", 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

console.log(jsonObject.key);

let key = jsonObject.key.toString();  
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;

const insertBook = baseUrl + '&op=insert';
const getBooks = baseUrl + '&op=select';
const updateBook = baseUrl + '&op=update';
const deleteBook = baseUrl + '&op=delete';

console.log(insertBook);
console.log(getBooks);
console.log(updateBook);
console.log(deleteBook); 



//https://www.google.com/maps/embed/v1/MODE?key=YOUR_API_KEY&parameters

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
        });
}
AddBook(); 




function GetBooks() {
    fetch(getBooks)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson['data']);    


        });
}

//GetBooks(); 

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


