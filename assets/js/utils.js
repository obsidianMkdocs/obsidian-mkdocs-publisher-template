function UrlExists(url, type_url) {
    let ref = "";
    let title = "";
    if (type_url === 0) {
        ref = url.href
        title = url.title
    }
    else if (type_url === 1) {
        ref = url.src
        title = url.alt
    }
    var http = new XMLHttpRequest();
    http.open('GET', ref, true);
    http.onload=function(e) {
        if (http.status == '404') {
            console.log(title, ref)
            const newItem = document.createElement('div');
            newItem.innerHTML = title;
            newItem.classList.add('not_found');
            url.parentNode.replaceChild(newItem, url);
        }
        else {
            return true;
        }
    }
    http.send()
}


var p_search = /\.{2}\//gi
not_found = []
var ht = document.querySelectorAll('a');
for (var i = 0; i < ht.length; i++) {
    var link = UrlExists(ht[i],0);
}

var p_img = /\.+\\/gi
var img = document.querySelectorAll('img');
for (var i = 0; i < img.length; i++) {
    (img[i].attributes.src.nodeValue)
    if (img[i].alt.match(/\|?\d+$/)) {
        img[i].width = img[i].alt.match(/\|?\d+$/)[0].replace('|', '')
    }
    var link = UrlExists(img[i],1);
}



var ht = document.querySelectorAll('article.md-content__inner.md-typeset > *:not(.highlight)');
var scr=/\^(.*)/gi;
for (var i = 0; i <ht.length;i++){
    const fp=ht[i].innerHTML.match(scr)
	if (fp) {
        ht[i].innerHTML=ht[i].innerHTML.replace(fp, '')
    }
}
document.innerHTML = ht;

var cite = document.querySelectorAll('.citation');
if (cite) {
    for (var i = 0; i < cite.length; i++) {
        var img = cite[i].innerHTML.match(/!?(\[{2}|\[).*(\]{2}|\))/gi)
        if (img) {
            for (var j = 0; j < img.length; j++) {
                cite[i].innerHTML = cite[i].innerHTML.replace(img[j], '')
            }
            if (cite[i].innerText.trim().length < 2) {
                cite[i].style.display='none';
            }
            }
        }
    }
