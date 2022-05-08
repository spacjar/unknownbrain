// Preloader
let preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
   //preloader.style.display = "none";
   console.log("Done");
});

// Fuck it section - transformation
let fuckIt = document.getElementById("fuckit");
let fuckItImg = document.getElementById("fuckItImg");
let i = 0;

// window.onscroll = () => {
//     console.log("Test");
// };

// fuckIt.addEventListener("click", () => {
//     //fuckItImg.style.transform = "scale(10px)";
//     //document.getElementById("fuckItImg").style.color = "red";
//     console.log("Scroll");
// });

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


// Animations
/**
 * What to do when an item enters the screen
 * If it is in the screen, isIntersecting will be true.
 * Add a class when it is.
 */
 const intersectionCallback = (entries) => {
    for (const entry of entries) { // Loop over all elements that either enter or exit the view.
      if (entry.isIntersecting) { // This is true when the element is in view.
        entry.target.classList.add('show'); // Add a class.
      }
    }
  }
  
  /**
   * Create a observer and use the instersectionCallback as 
   * the instructions for what to do when an element enters
   * or leaves the view
   */
  const observer = new IntersectionObserver(intersectionCallback);
  
  /**
   * Get all .item elements and loop over them.
   * Observe each individual item.
   */
  const items = document.querySelectorAll('.item');
  for (const item of items) {
    observer.observe(item);
  }

  const releases = document.querySelectorAll('.release');
  for (const release of releases) {
    observer.observe(release);
  }