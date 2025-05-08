# Project Update Plan

The update introduces the **User Profiles** and a **Saved Outfits** feature, allowing users to log in, customize their profiles, and store their favorite outfit combinations. The game will now support persistent data storage, ensuring players can access their saved outfits and profile details.

Type of data: `User Profile Page`

Purpose: Users can log in, edit their username, upload a profile picture.

structure in JSON format:

{
"user_account": {
"user_id": "text-string",
"username": "text-string",
"name": "text-string",
"password": "text-string",
"profile": "text-link-to-the-uploaded-pix"
}
}

Type of data: `Dressing Room (Saved Outfits Feature)`

Purpose: Users can save and load outfits, rename styles, and manage their wardrobe easily.

structure in JSON format:

{
"saved_outfits": [
{
"outfit_id": "text-string",
"name": "text-string",
"clothing_items": ["text-string", "text-string", "text-string"],
"accessories": ["text-string", "text-string"],
"saved_at": "timestamp"
}
]
}

## Wireframes

![User Registration](https://cdn.glitch.global/d1e2f013-a2e0-47ca-811d-9d9bbb50077b/userregwireframe.jpg?v=1742894699852)

![User Settings](https://cdn.glitch.global/d1e2f013-a2e0-47ca-811d-9d9bbb50077b/settingswireframe.jpg?v=1742894717656)

![Saved outfits](https://cdn.glitch.global/d1e2f013-a2e0-47ca-811d-9d9bbb50077b/savedoutfitswireframe.jpg?v=1742894678083)

---

# Meya's Vogue : Fashion Game! 👗

Meya's Vogue is a fun dress-up game where you can create outfits for a virtual model. You can choose clothing items like tops, bottoms, and accessories by clicking on their images, and they will show up on the model right away. The game is designed to be enjoyable and lets you embark on a stylish journey. The website also has a gallery where you can save and share your outfits, along with a Tasks page that presents fun fashion challenges !

## Webpage Outline 🖇️

← `Homepage`:

- Introduction to Meya's Vogue
- Brief instructions on how to use the game
- Links to the other pages

← `Dressing Room`:

- Interactive area for selecting clothing items (tops, bottoms, accessories)
- Preview area showing the model with selected clothing
- Image buttons for clothing items

← `Gallery`:

- A grid layout, helps visually organize outfits and provides an aesthetically pleasing look.
- Filled with images that could be used for inspiration

← `Tasks`:

- Fun random challenges related to fashion styling (e.g., "Create a summer look," "Mix and match colors")
- Daily tasks for users to complete

## Incorporation of JavaScript 📝

#### On the Dress-Up Interface Page

← `Selecting Outfits`: When users click on images of clothes like tops, bottoms, and accessories, JavaScript helps change the outfit on the virtual model. It knows what type of clothing was clicked based on the image.

← `Instant Changes`: As soon as a user picks an item, the JavaScript code updates the model's outfit right away. This means users can see how their choices look together immediately, making it easy to mix and match.

← `Reset Option`: There’s a button that lets users start over. This button uses JavaScript to clear the current selections and reset the model’s outfit, so users can create a new look without refreshing the page.

← `Working with HTML` : JavaScript connects with the buttons and images on the page.

## Wireframes / Layout 💻

![homepage](https://cdn.glitch.global/64688bf0-0b50-445e-86e0-f0a0ad314465/Homepage.jpeg?v=1730559888762)

![Dress-up](https://cdn.glitch.global/64688bf0-0b50-445e-86e0-f0a0ad314465/Dress-up.jpeg?v=1730560662230)

![Gallery](https://cdn.glitch.global/64688bf0-0b50-445e-86e0-f0a0ad314465/Gallery.jpeg?v=1730561054209)

![Tasks](https://cdn.glitch.global/64688bf0-0b50-445e-86e0-f0a0ad314465/Tasks.jpeg?v=1730564243869)
