export function averageData(data, interval) {
  const averagedData = [];
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data.length; i++) {
      sum += data[i];
      count++;

      if (count === interval || i === data.length - 1) {
          averagedData.push(sum / count);
          sum = 0;
          count = 0;
      }
  }
  return averagedData;
}

export function updateTemperatureChart(labels, data) {
  const ctx = document.getElementById('temperatureChart').getContext('2d');
  
  let averagedData;

  if (data.length >= 50) {
      averagedData = averageData(data, 10);
  } else if (data.length >= 150) {
      averagedData = averageData(data, 15);
  } else if (data.length >= 300) {
      averagedData = averageData(data, 30);
  } else {
      averagedData = averageData(data, 5);
  }

  averagedData.push(data[data.length - 1])

  window.temperatureChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels.slice(0, averagedData.length), // Utiliser les étiquettes originales, mais réduites
          datasets: [{
              label: 'Température (°C)',
              data: averagedData,
              borderColor: 'red',
              fill: false
          }]
      },
      options: {
          scales: {
              y: {
                  ticks: {
                      beginAtZero: true
                  }
              }
          }
      }
  });
  console.log(window.temperatureChart);
}

export function updateHumidityChart(labels, data) {
  const ctx = document.getElementById('humidityChart').getContext('2d');

  // Détruire le graphique existant si présent
  

  let averagedData;

  if (data.length >= 50) {
      averagedData = averageData(data, 10);
  } else if (data.length >= 150) {
      averagedData = averageData(data, 15);
  } else if (data.length >= 300) {
      averagedData = averageData(data, 30);
  } else {
      averagedData = averageData(data, 5);
  }

  window.humidityChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels.slice(0, averagedData.length), // Utiliser les étiquettes originales, mais réduites
          datasets: [{
              label: 'Humidité (%)',
              data: averagedData,
              borderColor: 'blue',
              fill: false
          }]
      },
      options: {
          scales: {
              y: {
                  ticks: {
                      beginAtZero: true
                  }
              }
          }
      }
  });
}
