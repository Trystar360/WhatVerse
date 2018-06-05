var bible;
var verse;

var version = 0;
//0 = KJV; 1 = ESV; 





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

function newRand(n){
    return Math.floor(Math.random() * n) + 1;
}

function length(obj) {
    return Object.keys(obj).length;
}

function verseBtnPress(){
    switch(version){
        case 0: choseVerse("bible.json"), kjv();
        case 1: choseVerse("https://raw.githubusercontent.com/honza/bibles/master/ESV/ESV.json");
    }
    
    
}

function testVerse(){
    for(var i = 0; i < 1000; i ++){
        choseVerse();
    }
}

function kjv(){
    var ref;
    var length, maxLength; 
    var book, books;
    var chapter,chapters;
    var verseStart;
    var verseEnd, verss;
    verse = '';

    document.getElementById("ref").innerHTML = ref;
    document.getElementById("verses").innerHTML = verse;

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

    if(length > 1){
        ref = bible[book].name + " " + tmp + ":" + tmpv +"-" + verseEnd;
        for(i = verseStart; i < verseEnd; i ++){
            var tmpp = i + 1;
            verse += '<sup>' + tmpp + '</sup>';
            verse += '<p class="verse">' + bible[book].chapters[chapter][i] + '</p>'
        } 
    }else{
        ref = bible[book].name + " " + tmp + ":" + tmpv;
        verse += '<sup>' + tmp + '</sup>';
            verse += '<p class="verse">' + bible[book].chapters[chapter][verseStart] + '</p>'
            
            document.getElementById("verseCard").style.display = "block";
        

}
}

//test

