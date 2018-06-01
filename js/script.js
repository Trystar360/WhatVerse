var bible;
var verse;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       bible = JSON.parse(xhttp.responseText)
       console.log(bible);
       //console.log(bible.length);
       //console.log(bible[0].chapters[0][0]);
       
    }
};
xhttp.open("GET", "../bible.json", true);
xhttp.send();


function choseVerse(){
    verse = '';

    var ref;
    var length, maxLength; 
    var book, books;
    var chapter,chapters;
    var verseStart;
    var verseEnd, verss;

    maxLength = 5;
    length = newRand(maxLength);
    books = bible.length;
    book = newRand(books) - 1;
    chapters = bible[book].chapters.length;
    chapter = newRand(chapters) - 1;
    verss = bible[book].chapters[chapter].length;
    verseStart = newRand(verss - length);
    verseEnd = verseStart + length;
     
    var tmp = chapter + 1;
    var tmpv = verseStart + 1;

    ref = bible[book].name + " " + tmp + ":" + tmpv +"-" + verseEnd;

    for(i = verseStart; i < verseEnd; i ++){
        var tmpp = i + 1;
        verse += '<sup>' + tmpp + '</sup>';
        verse += '<p class="verse">' + bible[book].chapters[chapter][i] + '</p>'
    }
    //console.log(verse);
    document.getElementById("ref").innerHTML = ref;
    document.getElementById("verses").innerHTML = verse;
    // console.log("length: ")
    // console.log(length);
    // console.log("book: ");
    // console.log(book);
    // console.log("chapter: ");
    // console.log(chapter);
    // console.log("passage: ");
    // console.log(verseStart);
    // console.log("-" );
    // console.log(verseEnd);
    
    // console.log(length);
}

function newRand(n){
    return Math.floor(Math.random() * n) + 1;
}

function length(obj) {
    return Object.keys(obj).length;
}

function verseBtnPress(){
    choseVerse();
    document.getElementById("verseCard").style.display = "block";
}

function copy(s){
    document.getElementById(s).execCommand("copy");
}

function copyClick(){
    copy("verses");
}
function testVerse(){
    for(var i = 0; i < 1000; i ++){
        choseVerse();
    }
}

