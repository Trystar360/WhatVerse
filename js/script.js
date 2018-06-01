var bible;
var output = '';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       bible = JSON.parse(xhttp.responseText)
       console.log(length(bible));
       console.log(bible);
       choseVerse();
       
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/honza/bibles/master/NIV/NIV.json", true);
xhttp.send();


function choseVerse(){
    var length, maxLength; 
    var book, books;
    var chapter,chapters;
    var verseStart;
    var verseEnd, verss;

    maxLength = 10;
    length = newRand(maxLength);
    books = length(bible);
    book = newRand(books);
    chapters = length(book);
    chapter = newRand(book);
    verss = newRand(book.length);
    verseStart = newRand(verss - length);
    verseEnd = verseStart + length;

    console.log("length: " + length + ", book: " + book + ", chapter: " + chapter + ", passage: " + verseStart + "-" + verseEnd);
}

function newRand(n){
    return Math.floor(Math.random() * n + 1);
}

function length(obj) {
    return Object.keys(obj).length;
}
