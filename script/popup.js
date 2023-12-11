function openPopup() {
  document.getElementById("popup-container").style.display = "block";
}

// Fonction pour masquer la popup
function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}

// Ajoutez cet événement à votre icône "bi-gear-fill"
document.querySelector(".bi-gear-fill").addEventListener("click", openPopup);