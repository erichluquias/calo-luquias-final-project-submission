// ===== Global State =====
let selectedOutfitIndex = null;

// ===== Toggle Clothing Category Buttons =====
const topBtn = document.getElementById('top-btn');
const bottomBtn = document.getElementById('bottom-btn');
const accessoryBtn = document.getElementById('accessory-btn');
const topOptions = document.getElementById('top-options');
const bottomOptions = document.getElementById('bottom-options');
const accessoryOptions = document.getElementById('accessory-options');

topBtn.addEventListener('click', () => {
    topOptions.style.display = 'block';
    bottomOptions.style.display = 'none';
    accessoryOptions.style.display = 'none';
});

bottomBtn.addEventListener('click', () => {
    topOptions.style.display = 'none';
    bottomOptions.style.display = 'block';
    accessoryOptions.style.display = 'none';
});

accessoryBtn.addEventListener('click', () => {
    topOptions.style.display = 'none';
    bottomOptions.style.display = 'none';
    accessoryOptions.style.display = 'block';
});

// ===== Update Model Clothing =====
document.querySelectorAll('.clothing-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const itemType = e.target.classList.contains('top') ? 'top' : 
                         e.target.classList.contains('bottom') ? 'bottom' : 
                         'accessory';
        updateModel(e.target.src, itemType);
    });
});

function updateModel(src, type) {
    const model = document.getElementById('model-container');
    let existingLayer = model.querySelector(`#${type}-layer img`);
    if (existingLayer) {
        existingLayer.src = src;
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.className = type;
        img.style.position = "absolute";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        model.querySelector(`#${type}-layer`).appendChild(img);
    }
}

// ===== Reset Button =====
document.getElementById('resetButton').addEventListener('click', () => {
    const layers = document.querySelectorAll('#model-container img:not(#model-base)');
    layers.forEach(layer => layer.remove());
});

// ===== Hamburger Navigation =====
function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
}

// ===== Profile Picture Loader =====
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

// ===== Save Outfit =====
document.getElementById('save-outfit-btn').addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return alert("You need to be logged in!");

  const top = document.querySelector('#top-layer img')?.src || '';
  const bottom = document.querySelector('#bottom-layer img')?.src || '';
  const accessory = document.querySelector('#accessory-layer img')?.src || '';

  fetch('/save-outfit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.username,
      outfit: { top, bottom, accessory }
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      selectedOutfitIndex = null;
      displaySavedOutfits(data.savedOutfits);
    } else {
      alert("Error saving outfit");
    }
  });
});

// ===== Update Outfit =====
document.getElementById('update-outfit-btn').addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return alert("You need to be logged in!");
  if (selectedOutfitIndex === null) return alert("Select an outfit to update!");

  const top = document.querySelector('#top-layer img')?.src || '';
  const bottom = document.querySelector('#bottom-layer img')?.src || '';
  const accessory = document.querySelector('#accessory-layer img')?.src || '';

  fetch('/update-outfit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.username,
      index: selectedOutfitIndex,
      outfit: { top, bottom, accessory }
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      selectedOutfitIndex = null;
      document.getElementById('update-outfit-btn').style.display = "none";
      displaySavedOutfits(data.savedOutfits);
    } else {
      alert("Failed to update outfit");
    }
  });
});

// ===== Load Saved Outfits =====
function loadSavedOutfits(username) {
  fetch(`/get-outfits?username=${username}`)
    .then(res => res.json())
    .then(data => {
      displaySavedOutfits(data);
    })
    .catch(err => console.error("Error loading outfits:", err));
}

function displaySavedOutfits(outfits) {
  const container = document.getElementById("saved-outfits-container");
  container.innerHTML = "";
  document.getElementById("update-outfit-btn").style.display = "none";

  outfits.forEach((outfit, index) => {
    const box = document.createElement("div");
    box.className = "outfit-box";
    if (index === selectedOutfitIndex) {
      box.classList.add("selected");
    }

    ['top', 'bottom', 'accessory'].forEach(part => {
      if (outfit[part]) {
        const img = document.createElement("img");
        img.src = outfit[part];
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "contain";
        box.appendChild(img);
      }
    });

    box.addEventListener("click", () => {
      updateModel(outfit.top, 'top');
      updateModel(outfit.bottom, 'bottom');
      updateModel(outfit.accessory, 'accessory');
      selectedOutfitIndex = index;
      document.getElementById("update-outfit-btn").style.display = "inline";
      displaySavedOutfits(outfits);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteOutfit(index);
    };
    box.appendChild(delBtn);

    container.appendChild(box);
  });
}

function deleteOutfit(index) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  fetch('/delete-outfit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user.username, index })
  }).then(() => loadSavedOutfits(user.username));
}

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    loadSavedOutfits(user.username);
  }
});



document.getElementById('save-outfit-btn').addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return alert("You need to be logged in!");

  const top = document.querySelector('#top-layer img')?.src || '';
  const bottom = document.querySelector('#bottom-layer img')?.src || '';
  const accessory = document.querySelector('#accessory-layer img')?.src || '';

  if (selectedOutfitIndex !== null) {
    // update instead of saving new
    fetch('/update-outfit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        index: selectedOutfitIndex,
        outfit: { top, bottom, accessory }
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        selectedOutfitIndex = null;
        document.getElementById("update-outfit-btn").style.display = "none";
        displaySavedOutfits(data.savedOutfits);
      } else {
        alert("Error updating outfit.");
      }
    });
  } else {
    // create new outfit
    fetch('/save-outfit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        outfit: { top, bottom, accessory }
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        displaySavedOutfits(data.savedOutfits);
      } else {
        alert("Error saving outfit.");
      }
    });
  }
});
