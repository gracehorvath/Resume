var secOffSet = {};
document.addEventListener("DOMContentLoaded", function (event) {
    setNavOffSets();
});
window.onresize = function(event) {
    setNavOffSets();
};

window.onscroll = function () {
    var nav = document.getElementById("nav");
    var windowOffSet = window.scrollY;
   
    stickyNav(nav, windowOffSet);
    activeNavLink(nav,windowOffSet);
};

function setNavOffSets(){
    secOffSet.home = document.getElementById("home").offsetTop;
    secOffSet.about = document.getElementById("about").offsetTop;
    secOffSet.experience = document.getElementById("experience").offsetTop;
    secOffSet.education = document.getElementById("education").offsetTop;
    secOffSet.volunteer = document.getElementById("volunteer").offsetTop;
    secOffSet.contact = document.getElementById("contact").offsetTop;
}

function stickyNav(nav, windowOffSet){
    var stickHeight = document.getElementById('home').offsetHeight-nav.offsetHeight;
    if (windowOffSet>stickHeight) {
        nav.style.position = "fixed";
        nav.style.top=0;
        nav.style.bottom="auto";
    } else {
        nav.style.position = "absolute";
        nav.style.top="auto";
        nav.style.bottom = 0;
    }
}

function activeNavLink(nav, windowOffSet){
    var navHeight = document.getElementById("nav").offsetHeight;
    for (var sec in secOffSet) {
        if (windowOffSet >= secOffSet[sec]-navHeight && (secOffSet[sec] + document.getElementById(sec).offsetHeight) > windowOffSet) {
            var activeNav = document.getElementsByClassName(sec)[0].getElementsByTagName("span")[0];
            if (!activeNav.className.includes("active-nav")) {
                document.getElementsByClassName("active-nav")[0].className = "";
                activeNav.className = "active-nav";
            }
        }
    }
}

var scrollTimer;
function scroll(secSpan){
    var secName = secSpan.parentElement;
    var sec = document.getElementById(secName.classList[1]);
    var increment;
    var headerMarg=sec.getElementsByClassName("heading")[0].style.marginTop;
    
    if(sec.offsetTop-window.scrollY>=0){//scrolling down
        increment = (sec.offsetTop  - window.scrollY)/70; //distance to scroll / arbitrary #
    }else{//scrolling up
        increment = (window.scrollY - sec.offsetTop)/70*-1;
    }
    scrollTimer = setInterval( function() { scrolling(sec, increment, headerMarg); }, 1 );

}
function scrolling(sec, increment, headerMarg){
    var windowY = window.scrollY;
    window.scrollTo(sec.offsetLeft, windowY+increment);
    if((increment>0 && windowY>=(sec.offsetTop-headerMarg)) || (increment<0 && windowY<=sec.offsetTop+headerMarg)){
        window.clearInterval(scrollTimer)
    }
}

function toggleNav() {
    var accrd = document.getElementById("nav-accrd")
    if (accrd.className.includes("off")) {
        accrd.className = accrd.className.replace("off", "on");
    } else {
        accrd.className = accrd.className.replace("on", "off");
    }
}

function displayTab(tabButton) {
    var tab = tabButton.parentElement;
    var active = tab.parentElement.getElementsByClassName("active-tab");
    if (active.length > 0) {
        active[0].className = "tab";
    }
    tab.className += " active-tab";
}
    
    