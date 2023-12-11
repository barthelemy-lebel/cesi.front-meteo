// script.js
document.addEventListener('DOMContentLoaded', function () {
  async function fetchData(sensorId, startDate, endDate) {
    const serverUrl = `http://127.0.0.1:8000/?sensor_id=${encodeURIComponent(sensorId)}&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`;

    try {
      const response = await fetch(serverUrl);

      if (!response.ok) {
        throw new Error(`Erreur de récupération des données : ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur de récupération des données :', error.message);
      return [];
    }
  }

  async function populateTable() {
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const sensor_id = document.getElementById('form-sensor-id').value;

    const data = await fetchData(sensor_id, start_date, end_date);

    // Trier les données par date (supposant que la date est une chaîne au format ISO)
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const tableBody = document.querySelector('#data-table tbody');

    // Effacer le contenu actuel du tableau
    tableBody.innerHTML = '';

    data.forEach((entry, index) => {
      const row = document.createElement('tr');

      // Créer une cellule pour l'index
      const indexCell = document.createElement('td');
      indexCell.textContent = index + 1; // Ajouter 1 car les indices commencent à 0
      indexCell.id = "index"; // Ajouter une ID
      row.appendChild(indexCell);

      // Créer une cellule pour chaque propriété de l'objet
      Object.values(entry).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value !== null ? value : 'N/A'; // Affiche 'N/A' pour les valeurs nulles
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }

  // Attacher l'événement submit au formulaire
  document.getElementById('sensorForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
    populateTable();
  });

  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');

  burgerMenu.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });

});
