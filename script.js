// =========================
// MOBILE MENU
// =========================
const files = [

   {
        name: "1 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 1.pdf",
    },

    {
        name: "2 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 2.pdf",
    },

    {
        name: "3 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 3.pdf",
    },

    {
        name: "4 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 4.pdf",
    },

    {
        name: "5 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 5.pdf",
    },

    {
        name: "6 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 6 (2).pdf",
    },

    {
        name: "7 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 7.pdf",
    },

    {
        name: "8 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 8.pdf",
    },

    {
        name: "9 جلسه  ",
        description: "",
        size: "",
        file: "دست نویس 9.pdf",
    },

    {
        name: " نمونه سوال  ",
        description: "",
        size: "",
        file: "نمونه سوالات فارسی.pdf ",
    },

    {
        name: " جزوه دستور  ",
        description: "",
        size: "",
        file: "جزوهٔ جمع_بندی دستور زبان ۱۱.pdf ",
    },

    {
        name: "  جزوه آرایه ",
        description: "",
        size: "",
        file: "جمع بندی آرایه.pdf ",
    },

    {
        name: " جزوه مفهوم و درک مطلب  ",
        description: "",
        size: "",
        file: "درک مطلب و مفهوم 11، نیم سال اول.pdf ",
    },

    {
        name: " جزوه تاریخ ادبیات  ",
        description: "",
        size: "",
        file: "tarikhadabiat ghalebha p11.pdf ",
    },

    {
        name: " جزوه املا  ",
        description: "",
        size: "",
        file: "املا فارسی یازدهم.pdf ",
    },

    {
        name: " پر شده کامل جزوه دستور  ",
        description: "",
        size: "",
        file: "جمع_بندی دستور ۱۱ - کامل.pdf ",
    },

    {
        name: "  پر شده کامل جزوه آرایه ",
        description: "",
        size: "",
        file: "__جمع_بندی آرایه ۱۱ - کامل_.pdf ",
    },

]; 

const filesGrid = document.getElementById("filesGrid");

if(filesGrid){

    files.forEach(file => {

        filesGrid.innerHTML += `
            <div class="file-card">

                <h3 class="file-name">
                    ${file.name}
                </h3>

                <p class="file-description">
                    ${file.description}
                </p>

                <span class="file-size">
                    حجم: ${file.size}
                </span>

                <div class="file-buttons">

    ${
        file.file.endsWith(".zip")
        ?
        `
        <a href="${file.file}"
           download
           class="download-btn full-width">
           دانلود
        </a>
        `
        :
        `
        <a href="${file.file}"
           target="_blank"
           class="view-btn">
           نمایش
        </a>

        <a href="${file.file}"
           download
           class="download-btn">
           دانلود
        </a>
        `
    }

</div>

            </div>
        `;

    });

}

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("menuOverlay");

hamburger.addEventListener("click", () => {

    nav.classList.toggle("active");
    hamburger.classList.toggle("active");

});
overlay.addEventListener("click", () => {

    nav.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");

});

// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeToggleDesktop = document.getElementById("themeToggleDesktop");
function toggleTheme(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        if(themeToggle){
            themeToggle.innerHTML = "☀️ حالت روشن";
        }

        if(themeToggleDesktop){
            themeToggleDesktop.innerHTML = "☀️";
        }

    }else{

        localStorage.setItem("theme","light");

        if(themeToggle){
            themeToggle.innerHTML = "🌙 حالت تیره";
        }

        if(themeToggleDesktop){
            themeToggleDesktop.innerHTML = "🌙";
        }

    }
}

if(themeToggle){
    themeToggle.addEventListener("click", toggleTheme);
}

if(themeToggleDesktop){
    themeToggleDesktop.addEventListener("click", toggleTheme);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    if(themeToggle){
        themeToggle.innerHTML = "☀️ حالت روشن";
    }

} else {

    if(themeToggle){
        themeToggle.innerHTML = "🌙 حالت تیره";
    }

}


// =========================
// CLOSE MENU AFTER CLICK
// =========================

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.classList.remove("active");

    });

});

document.addEventListener("click", (e) => {

    if(
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)
    ){
        nav.classList.remove("active");
        hamburger.classList.remove("active");
    }

});

// =========================
// HEADER SHADOW ON SCROLL
// =========================

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 20) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }

});

// =========================
// BACK TO TOP
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    // =========================
    // CARD ANIMATION
    // =========================

    const cards = document.querySelectorAll(".file-card");

    if (cards.length > 0) {

        cards.forEach(card => {
            card.classList.add("hidden");
        });

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                    entry.target.classList.remove("hidden");

                }

            });

        }, {
            threshold: 0.15
        });

        cards.forEach(card => {
            observer.observe(card);
        });

    }

});
