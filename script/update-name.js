document.getElementById('renameForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Collectez les données du formulaire
  const sensorId = document.getElementById('sensor-id').value;
  const newSensorName = document.getElementById('new-sensor-name').value;

  // Effectuez la requête PUT avec Fetch
  fetch(`http://127.0.0.1:8000/sensor/${sensorId}/update-name`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          new_name: newSensorName, // Utilisez le nouveau nom du paramètre
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('La requête a échoué.');
      }
      return response.json();
  })
  .then(data => {
      // La requête a réussi, traitez la réponse si nécessaire
      console.log('Réponse du serveur :', data);
  })
  .catch(error => {
      console.error('Erreur lors de la requête :', error);
  });
});