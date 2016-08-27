document.addEventListener("DOMContentLoaded", function (event) {

});

window.onscroll = function () {
   var nav = document.getElementById("nav");
    console.log(nav.offsetTop);
    console.log(window.scrollY);
    if(window.scrollY-nav.offsetTop>0){
        nav.style.position="fixed";
        nav.style.top = 0;
    }else{
        nav.style.position = "absolute";
        nav.style.top = "100%";
    }
};

function displayTab(tab) {
    //window.alert("worked");
    var active = tab.parentElement.getElementsByClassName("active");
    if (active.length > 0) {
        console.log(active.className);
        active[0].className = "tab-content";
    } else {
        console.log("no active elements");
    }
    var content = tab.getElementsByClassName("tab-content");
    content[0].className += " active";
}

function toggleNav(img) {
    var accrd = document.getElementById("nav-accrd");
    if (accrd.className.includes("off")) {
        accrd.className = accrd.className.replace("off", "on");
    } else {
        accrd.className = accrd.className.replace("on", "off");
    }

}