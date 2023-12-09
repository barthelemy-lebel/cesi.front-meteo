export function updateDate(){
  var dateActuelle = new Date()
  // Obtenir les composants de la date
  var jour = dateActuelle.getDate()
  var mois = dateActuelle.getMonth() + 1 // Les mois sont indexés de 0 à 11
  var annee = dateActuelle.getFullYear()
  // Obtenir les composants de l'heure
  var heures = dateActuelle.getHours()
  var minutes = dateActuelle.getMinutes()
  var dateFormatee = jour + "/" + mois + "/" + annee + "\n" + heures + ":" + minutes 
  // Insérer la date dans l'élément p
  document.getElementById("date-actuelle").textContent = dateFormatee
}
