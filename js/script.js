
//Global variables
var bible = '';
var verse;
var xhttp;
var global = this;
var version = 1;
var test;
var first = true;

var moreBook, moreChapter, book;
var globalRef;

//0 = KJV; 1 = ESV; 

initBib();
function initBib(){
    switch(version){
        case 0: 
        choseVerse("../bible.json");
        break;
        
        case 1: 
        choseVerse("https://raw.githubusercontent.com/honza/bibles/master/ESV/ESV.json");
    }
}
notif();
function notif(){
    M.toast({html: 'Read More now works but you must stay in the same book'},null);
}

/*
Retrieves and parses json data
@parameter n: path to json file
*/
function choseVerse(n){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       bible = JSON.parse(xhttp.responseText)
       console.log(bible);
       
    }
};
    xhttp.open("GET",n, true);
    xhttp.send();  
}

/*
@return: bible object
*/
function getBib(){
    return bible;
}

/*
Used to easily get random number.
@parameter n: max number.
@return: random number from 1 to n.
*/
function newRand(n){
    return Math.floor(Math.random() * n) + 1;
}

/*
Used to easily get the length of JSON arrays
@parameter obj: the array object to get the length of.
@return: lengh of keys of obj.
*/
function length(obj) {
    return Object.keys(obj).length;
}

/*
To be run on verse button press.
*/
function verseBtnPress(){
    var acts = '<a href="#!" class="white-text btn-flat" onclick="copyClick()">Copy</a><a href="#!" class="white-text btn-flat" onClick="readMoreBtn()">Read More</a>'
    document.getElementById("cas"). innerHTML = acts;

    
    switch(version){

        case 0:
            choseVerse("../bible.json");
            kjv();
            break;

        case 1: 
        choseVerse("https://raw.githubusercontent.com/honza/bibles/master/ESV/ESV.json");
        esv();
        break;
    }
    
    
}

/*
Used to test verse alg. runs verse x1000
*/
function testVerse(){
    for(var i = 0; i < 1000; i ++){
        choseVerse();
    }
}

/*
Randomly choses verse from KJV json
*/
function kjv(){
    var ref;
    var length, maxLength; 
    var book, books;
    var chapter,chapters_;
    var verseStart;
    var verseEnd, verss;
    verse = '';
    var bible = this.bible;

    
    maxLength = 5;
    length = newRand(maxLength);
    books = bible.length;
    book = newRand(books) - 1;
    console.log(bible);
    console.log(book);
    console.log(bible[book]);
    console.log(bible[book].chapters)
    chapters_ = bible[book].chapters.length;//yeet
    chapter = newRand(chapters_) - 1;
    verss = bible[book].chapters[chapter].length;
    verseStart = newRand(verss - length);
    verseEnd = verseStart + length;

    moreBook = bookName;
    moreChapter = chapter;
     
    var tmp = chapter + 1;
    var tmpv = verseStart + 1;

    console.log(bible[book].chapters[chapter][verseStart]);

    if(length > 1){
        ref = bible[book].name + " " + tmp + ":" + tmpv +"-" + verseEnd;

        globalRef = ref;

        for(i = verseStart; i < verseEnd; i ++){
            var tmpp = i + 1;
            verse += '<sup>' + tmpp + '</sup>';
            verse += '<p class="verse">' + bible[book].chapters[chapter][i] + '</p>'
        } 
    }else{
        ref = bible[book].name + " " + tmp + ":" + tmpv;
        verse += '<sup>' + tmpp + '</sup>';
        verse += '<p class="verse">' + bible[book].chapters[chapter][verseStart] + '</p>'
    }
            document.getElementById("ref").innerHTML = ref;
            document.getElementById("verses").innerHTML = verse;
            document.getElementById("verseCard").style.display = "block";
        

}

function cl(logged){
    console.log(logged);
}

function esv(){
    var ref;
    var length, maxLength; 
    var book, books, bookName;
    var chapter,chapters_;
    var verseStart;
    var verseEnd, verss;
    verse = '';
    var bible = this.bible;

    
    maxLength = 5;
    length = newRand(maxLength);
    books = Object.keys(bible).length;
    book = newRand(books) - 1;
    bookName = Object.keys(bible)[book];
    chapters_ = Object.keys(bible[bookName]).length;
    chapter = newRand(chapters_);
    console.log(bookName);
    console.log(bible[bookName]);
    console.log(chapter);
    verss = Object.keys(bible[bookName][chapter]).length;;
    verseStart = newRand(verss - length);
    verseEnd = verseStart + length;

    moreBook = bookName;
    moreBookNum = book;
    moreChapter = chapter;
     
    var tmp = chapter ;
    var tmpv = verseStart ;

    console.log(bible[bookName][chapter][verseStart]);

    if(length > 1){
        ref = bookName + " " + tmp + ":" + tmpv +"-" + verseEnd;

        globalRef = ref;
        for(i = verseStart; i < verseEnd; i ++){
            var tmpp = i;
            verse += '<sup> ' + tmpp + '</sup>';
            verse += '<p class="verse"> ' + bible[bookName][chapter][i] + '</p>'
        } 
    }else{
        ref = bookName + " " + tmp + ":" + tmpv;
        verse += '<sup>' + tmp + '</sup>';
        verse += '<p class="verse">' + bible[bookName][chapter][verseStart] + '</p>'
    }
            document.getElementById("ref").innerHTML = ref;
            writeTo(verse);
            document.getElementById("verseCard").style.display = "block";
        

}

function writeTo(t){
    document.getElementById("verses").innerHTML = t;
}

//test

function readMoreBtn(){
    var a = Object.keys(bible[moreBook][moreChapter]).length;
    var b = '';
    ref = moreBook + " " + moreChapter;
    for(var i = 1; i < a; i++){
        b += '<sup>' + i + '</sup>';
        b += '<p class="verse">' + bible[moreBook][moreChapter][i] + '</p>'
    }
    document.getElementById("ref").innerHTML = ref;
    writeTo(b);
    var acts = '<a href="#!" class="white-text btn-flat" id="lc" onClick="lcClick()">Last Chapter</a><a href="#!" class="white-text btn-flat" id="nc" onclick="ncClick()">Next Chapter</a> '
    document.getElementById("cas"). innerHTML = acts;
}


function lcClick(){
    if(moreChapter - 1 > 0){
        moreChapter--;
        console.log(moreChapter)
        readMoreBtn();
    }

    if(moreChapter == 1){
        $('#lc').addClass('disabled');
    }else{
        if($('#lc').hasClass('disabled')){
            $('#lc').removeClass('disabled');
        }
    }
        
    
    
}

function ncClick(){
    if( moreChapter + 1 <= Object.keys(bible[moreBook]).length){
        moreChapter++;
        readMoreBtn();
    }

    if(moreChapter + 1 > Object.keys(bible[moreBook]).length){
        $('#nc').addClass('disabled');
    }else{
        if($('#nc').hasClass('disabled')){
            $('#nc').removeClass('disabled');
        }
    }
    
}

function copyClick(){
    copyToClipboard('#verses');
}

function copyToClipboard(element) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($(element).text() + "\r\t - " + globalRef).select();
    document.execCommand("copy");
    $temp.remove();
}