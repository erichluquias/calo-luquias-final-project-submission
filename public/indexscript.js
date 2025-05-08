// Fake chat messages list
const messages = [
    "<strong>Luna:</strong> Just made the cutest Y2K outfit! 💖",
    "<strong>Fashionista23:</strong> Loving pastel themes today! 🌸",
    "<strong>StyleQueen:</strong> Anyone else obsessed with layering? 👗✨",
    "<strong>ChicVibes:</strong> Pink and black combo is my new obsession! 🖤💖",
    "<strong>TrendyBabe:</strong> Who else is loving oversized sweaters? 😍",
    "<strong>GlowUpGirl:</strong> I need styling tips for a vintage look! 🕰️✨",
    "<strong>SoftAesthetic:</strong> The gallery is full of cute outfits today! 🥰",
];

function updateChat() {
    const chatBox = document.getElementById("chat-messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = messages[Math.floor(Math.random() * messages.length)];

    // Add new message at the bottom
    chatBox.appendChild(newMessage);

    // Scroll to the bottom smoothly
    chatBox.scrollTop = chatBox.scrollHeight;

    // Remove old messages if there are more than 5
    if (chatBox.children.length > 5) {
        chatBox.removeChild(chatBox.firstChild);
    }
}

// Auto-update chat every 2 seconds
setInterval(updateChat, 2000);

// Toggle the menu for hamburger navigation
function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}

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
