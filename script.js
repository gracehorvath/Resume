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
    if (windowOffSet - nav.offsetTop > 0) {
        nav.style.position = "fixed";
        nav.style.top = 0;
    } else {
        nav.style.position = "absolute";
        nav.style.top = "100%";
    }
}

function activeNavLink(nav, windowOffSet){
    for (var sec in secOffSet) {
        if (windowOffSet >= secOffSet[sec] && (secOffSet[sec] + document.getElementById(sec).offsetHeight) > windowOffSet) {
            var activeNav = document.getElementsByClassName(sec)[0].getElementsByTagName("span")[0];
            if (!activeNav.className.includes("active")) {
                document.getElementsByClassName("active")[0].className = "";
                activeNav.className = "active";
            }
        }
    }
}

var scrollTimer;
function scroll(secSpan){
    var secName = secSpan.parentElement;
    var sec = document.getElementById(secName.classList[1]);
    var increment;
    
    
    if(sec.offsetTop-window.scrollY>=0){//scrolling down
        increment = (sec.offsetTop - window.scrollY)/70; //distance to scroll / arbitrary #
    }else{//scrolling up
        increment = (window.scrollY - sec.offsetTop)/70*-1;
    }
    scrollTimer = setInterval( function() { scrolling(sec, increment); }, 1 );

}
function scrolling(sec, increment){
    var windowY = window.scrollY;
    window.scrollTo(sec.offsetLeft, windowY+increment);
    if((increment>0 && windowY>=sec.offsetTop) || (increment<0 && windowY<=sec.offsetTop)){
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

function displayTab(tab) {
    var active = tab.parentElement.getElementsByClassName("active");
    if (active.length > 0) {
        console.log(active.className);
        active[0].className = "tab-content";
    }
    var content = tab.getElementsByClassName("tab-content");
    content[0].className += " active";
}
    
    