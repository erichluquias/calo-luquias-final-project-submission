let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slides img").length;

function moveSlide(step) {
    currentSlide += step;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

// Toggle the menu for hamburger navigation
function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const pfp = document.getElementById("profileDynamicPic");
  const link = document.getElementById("profileDynamicLink");

  if (user) {
    link.href = "/settings/" + user.username;
    if (user.profilePic) pfp.src = user.profilePic;
  } else {
    link.href = "/form";
    pfp.src = "https://your-default-image-url.png";
  }
});
