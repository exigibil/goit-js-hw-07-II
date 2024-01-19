import { galleryItems } from "./gallery-items.js";
// Change code below this line
import basicLightbox from "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/+esm";
const modal = basicLightbox.create("<img>");
const modalImg = modal.element().querySelector("img");

const modalDescription = document.createElement("p");
modal.element().appendChild(modalDescription);

const gallery = document.querySelector("ul.gallery");
const fragment = new DocumentFragment();
const liTemplate = document.createElement("template");

liTemplate.innerHTML = `<li 
class="gallery__item">
<a class="gallery__link" 
href="large-image.jpg"><img 
class="gallery__image" 
src="small-image.jpg" 
data-source="large-image.jpg"
alt="Image description"/>
</a></li>`;

function addGalleryItem(item) {
  const clone = liTemplate.content.cloneNode(true);
  const img = clone.querySelector("img");
  img.src = item.preview;
  img.alt = item.description;
  img.dataset.source = item.original;
  fragment.appendChild(clone);
}

galleryItems.forEach(addGalleryItem);
gallery.appendChild(fragment);

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  modalImg.src = e.target.dataset.source;
  modalDescription.textContent = e.target.alt;
  modal.show();
});

gallery.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.visible()) {
    e.preventDefault();
    modal.close();
  }
});
