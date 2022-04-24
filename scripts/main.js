// Preloader
let preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
   preloader.style.display = "none";
});

// Fuck it section - transformation
let fuckIt = document.getElementById("fuckit");
let fuckItImg = document.getElementById("fuckItImg");
let i = 0;

window.onscroll = () => {
    console.log("Test");
};

fuckIt.addEventListener("click", () => {
    //fuckItImg.style.transform = "scale(10px)";
    //document.getElementById("fuckItImg").style.color = "red";
    console.log("Scroll");
});

// Menu
const BTN = document.getElementById("menu-btn");
const HEADNAV = document.getElementById("hidden-header");
const hamburger = document.getElementById("hamburger");
const ham_text = document.getElementById("menu-text");
let isOpened = true;

BTN.addEventListener("click", () => {
    if(isOpened) {
        HEADNAV.style.visibility = "visible";
        isOpened = false;
        hamburger.classList.add("open")
        ham_text.innerHTML = "CLOSE";
    } else {
        HEADNAV.style.visibility = "hidden"
        isOpened = true;
        hamburger.classList.remove("open")
        ham_text.innerHTML = "MENU";
    }
});

console.log("??? - Unknown");