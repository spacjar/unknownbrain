window.addEventListener("load", () => {

})

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