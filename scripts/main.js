window.addEventListener("load", () => {
    console.log("Document is loaded");
})

const BTN = document.getElementById("btn");
const HEADNAV = document.getElementById("hidden-header");
let isOpened = true;

BTN.addEventListener("click", () => {
    if(isOpened) {
        HEADNAV.style.visibility = "visible";
        isOpened = false;
    } else {
        HEADNAV.style.visibility = "hidden"
        isOpened = true;
    }
});

console.log("??? - Unknown");