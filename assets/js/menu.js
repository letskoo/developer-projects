const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const nav =
    document.querySelector(".nav");

if (mobileMenuBtn && nav) {

    mobileMenuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

    });

}