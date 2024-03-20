/*==================== SHOW MENU ====================*/

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    // Check if variable exists
    if(toggle && nav) {
        toggle.addEventListener("click", () => {
            // Adding show-menu class to div tag with nav_menu class
            nav.classList.toggle("show-menu")
        })
    }
}
showMenu("nav-toggle", "nav-menu")

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll(".nav_link")

function linkAction(){
    const navMenu = document.getElementById("nav-menu")
    // Remove show-menu class when clicking on each nav_link
    navMenu.classList.remove("show-menu")
}
navLink.forEach(n => n.addEventListener("click", linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]")

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id")

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav_menu a[href*=" + sectionId + "]").classList.add("active-link")
        } else {
            document.querySelector(".nav_menu a[href*=" + sectionId + "]").classList.remove("active-link")
        }
    })
}
window.addEventListener("scroll", scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 

function scrollTop(){
    const scrollTop = document.getElementById("scroll-top");
    // Add show-scroll class if scroll is greater than 200 viewport height
    if(this.scrollY >= 200) scrollTop.classList.add("show-scroll"); else scrollTop.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollTop)

/*==================== COPY TO CLIPBOARD ====================*/ 
function copyMail() {
    var range = document.createRange();
    range.selectNode(document.getElementById("email"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    /* Make little animation when copied */

    //Reduce text opacity for timeout
    var mail = document.getElementById("email-text")
    mail.style.opacity = .4;

    //Change tooltip text & colors for timeout...
    var tooltip = document.getElementById("tooltip");
    var tooltipPrevious = tooltip.innerHTML;
    var tooltipPreviousColor = tooltip.style.color;
    var tooltipPreviousBackground = tooltip.style.backgroundColor;

    //...to this.
    tooltip.innerHTML = "Copied!";
    tooltip.style.color = "#ae7d78";
    tooltip.style.backgroundColor = "#ffdbd7";
    
    // Reset again, hide tooltip for another 5 seconds and make it visible again.
    setTimeout(function() {
        tooltip.innerHTML = tooltipPrevious;
        tooltip.style.color = tooltipPreviousColor;
        tooltip.style.backgroundColor = tooltipPreviousBackground;
        mail.style.opacity = 1;
        mail.style.transition = ".4s";
        tooltip.style.visibility = "hidden";
    }, 1000)

    setTimeout(function() {
        tooltip.style.visibility = "visible";
    }, 5000)
}

/*==================== TOGGLE EXPERIENCE ====================*/ 

// Select all expandable titles.
const coll = document.getElementsByClassName("experience_title");
var i;

for (i=0; i < coll.length; i++) {
    coll[i].addEventListener("click", function(){
        var content = this.nextElementSibling;
        // if open
        if (content.style.maxHeight){
            content.style.maxHeight = null;
            // if closed
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
}


/*==================== COLORIZE / RETURN TO BW ====================*/ 

const colorizeButton = document.getElementById("colorize-button")
const colorizedTheme = "colorized"
const iconTheme = "bx-undo"

// Previous theme
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

// Get current theme from interface
const getCurrentTheme = () => document.body.classList.contains(colorizedTheme) ? "colorized" : "bw"
const getCurrentIcon = () => colorizeButton.classList.contains(iconTheme) ? "bx-palette" : "bx-undo"

// Validate to check if colorized was active or not
if(selectedTheme) {
    document.body.classList[selectedTheme === "colorized" ? "add" : "remove"](colorizedTheme)
    colorizeButton.classList[selectedIcon === "bx-palette" ? "add" : "remove"](iconTheme)
}

// Activate & deactivate manually with the button
colorizeButton.addEventListener("click", () => {
    document.body.classList.toggle(colorizedTheme)
    colorizeButton.classList.toggle(iconTheme)
    localStorage.setItem("selected-theme", getCurrentTheme())
    localStorage.setItem("selected-icon", getCurrentIcon())
})

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/ 
function scaleCv(){
    document.body.classList.add("scale-cv")
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/ 
function removeScale(){
    document.body.classList.remove("scale-cv")
}

/*==================== GENERATE PDF ====================*/ 
// PDF generated area
let areaCv = document.getElementById("area-cv")
let resumeButton = document.getElementById("resume-button")

// Html2pdf options
let opt = {
    margin: 1,
    filename: "ben_buchenau_cv",
    image: {type: "jpeg", quality: 0.98},
    html2canvas: {scale: 4},
    jsPDF: {format: "a4", orientation: "portrait"}
}

// Function to call areaCv and Html2Pdf options 
function generateResume(){
    html2pdf(areaCv, opt)
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener("click", () => {
    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()

    // 2. The PDF is generated
    generateResume()

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale, 2000)
})