function generateTask() {
    const tasks = [
        "Create an outfit inspired by the 80s.",
        "Style an outfit for a rainy day.",
        "Design a look for a red carpet event.",
        "Put together a casual weekend outfit.",
        "Create a monochrome outfit using only shades of one color.",
        "Design a beachwear look for summer vibes.",
        "Style a winter outfit for a snowy day.",
        "Create a sporty look for a workout session.",
        "Put together an outfit for a formal dinner party.",
        "Style an outfit based on your favorite season."
    ];
    document.getElementById('task').innerText = tasks[Math.floor(Math.random() * tasks.length)];
}


let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector(".carousel").style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);


// Get elements
const taskButton = document.getElementById('taskButton');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupText = document.getElementById('popupText');

// Array of possible compliments
const compliments = [
    "Great job! Task complete!",
    "Very nice outfit!",
    "Amazing choice!",
    "You're a fashionista!",
    "Great work! Keep it up!",
    "Love this look!",
    "Well done, stylish!"
];

// Function to get a random compliment
function getRandomCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    return compliments[randomIndex];
}

// Show pop-up with random compliment when task is completed
taskButton.addEventListener('click', function() {
    popupText.textContent = getRandomCompliment(); // Set random compliment
    popup.style.display = 'flex'; // Show the pop-up
});

// Close the pop-up when the close button is clicked
closePopup.addEventListener('click', function() {
    popup.style.display = 'none'; // Hide the pop-up
});



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
