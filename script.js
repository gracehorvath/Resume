var secOffSet = {};
var iOS = navigator.userAgent.match(/(iPhone|iPad)/);
var animation = true;
document.addEventListener("DOMContentLoaded", function (event) {
    setNavOffSets();
    if(iOS){
        document.getElementById('home').style.height=window.innerHeight+'px';
    }
});
window.onresize = function (event) {
    setNavOffSets();
};

window.onscroll = function () {
    var nav = document.getElementById("nav");
    var windowOffSet = window.scrollY;

    stickyNav(nav, windowOffSet);
    activeNavLink(nav, windowOffSet);
    if(animation){
        animations(nav, windowOffSet);
    }
};

function setNavOffSets() {
    secOffSet.home = document.getElementById("home").offsetTop;
    secOffSet.about = document.getElementById("about").offsetTop;
    secOffSet.experience = document.getElementById("experience").offsetTop;
    secOffSet.education = document.getElementById("education").offsetTop;
    secOffSet.volunteer = document.getElementById("volunteer").offsetTop;
}

function stickyNav(nav, windowOffSet) {
    var stickHeight = document.getElementById('home').offsetHeight - nav.offsetHeight;
    if (windowOffSet > stickHeight) {
        nav.style.position = "fixed";
        nav.style.top = 0;
        nav.style.bottom = "auto";
    } else {
        nav.style.position = "absolute";
        nav.style.top = "auto";
        nav.style.bottom = 0;
    }
}

function activeNavLink(nav, windowOffSet) {
    if (window.scrollY + window.innerHeight == document.body.offsetHeight) {
        document.getElementsByClassName("active-nav")[0].className = "";
        document.getElementsByClassName('contact')[0].getElementsByTagName("span")[0].className = "active-nav";
    } else {
        var navHeight = document.getElementById("nav").offsetHeight;
        for (var sec in secOffSet) {
            if (windowOffSet >= secOffSet[sec] - navHeight && (secOffSet[sec] + document.getElementById(sec).offsetHeight) > windowOffSet) {
                var activeNav = document.getElementsByClassName(sec)[0].getElementsByTagName("span")[0];
                if (!activeNav.className.includes("active-nav")) {
                    document.getElementsByClassName("active-nav")[0].className = "";
                    activeNav.className = "active-nav";
                }
            }
        }
    }
}

var scrollTimer;

function scroll(secSpan) {
    
    var secNameEle = secSpan.parentElement;
    
    var secName = (secNameEle.classList.length>1) ? secNameEle.classList[1] : secNameEle.classList[0];
    var sec = document.getElementById(secName);
    var increment;
    var navHeight = document.getElementById("nav").offsetHeight - document.getElementById("nav-accrd").offsetHeight;
    console.log(document.getElementById("nav-accrd").offsetHeight);

    if (sec.offsetTop - window.scrollY >= 0) { //scrolling down
        increment = (sec.offsetTop - window.scrollY) / 70; //distance to scroll / arbitrary #
    } else { //scrolling up
        increment = (window.scrollY - sec.offsetTop) / 70 * -1;
    }
    scrollTimer = setInterval(function () {
        scrolling(sec, increment, navHeight);
    }, 1);
    secNameEle.parentElement.className = secNameEle.parentElement.className.replace("on", "off");

}

function scrolling(sec, increment, navHeight) {
    var windowY = window.scrollY +increment;
    if ((window.scrollY + window.innerHeight == document.body.offsetHeight) || (windowY == 0) || (increment > 0 && windowY >= (sec.offsetTop-navHeight)) || (increment < 0 && windowY <= (sec.offsetTop))) {
        window.scrollTo(sec.offsetLeft, sec.offsetTop-navHeight)
        window.clearInterval(scrollTimer)
    }else{
        window.scrollTo(sec.offsetLeft, windowY + increment);
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
        active[0].className = "tab disabled-tab";
    }
    tab.className = "tab active-tab";
}

function animations(nav,windowOffSet){
    var volunteer = document.getElementById('volunteer');
    if(windowOffSet >= volunteer.offsetTop - volunteer.offsetHeight){
        var boxes = document.getElementsByClassName('box');
        for(var x=0; x<boxes.length; x++){
            var boxClass= boxes[x].className;
            if(boxClass.indexOf('slideUp')<0){
                boxes[x].className+=" slideUp";
                animation=false;
            }
        }
    }
}