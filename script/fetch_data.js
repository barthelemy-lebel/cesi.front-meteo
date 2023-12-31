import { updateDate } from "./update_date.js"
import { updateTemperatureChart, updateHumidityChart } from "./chart_utils.js"

export async function fetchData(sensorId, startDate, endDate) {
  updateDate()
  try {
      const serverUrl = `http://127.0.0.1:8000/?sensor_id=${encodeURIComponent(sensorId)}&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`

      const response = await fetch(serverUrl)

      if (!response.ok) {
          throw new Error(`Erreur de récupération des données : ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
          const lastData = data[data.length - 1]

          let icon = document.getElementById('meteo-icon');

          if (lastData.temperature > 25 && lastData.humidity < 50) {
            icon.classList.add("bi", "bi-brightness-high");
          } else if (lastData.humidity > 50) {
            icon.classList.add("bi", "bi-cloud-drizzle-fill");
          } else {
            icon.classList.add("bi", "bi-cloud-fill");
          }

          const lastTemperature = `${lastData.temperature}°C`
          const lastHumidity = `${lastData.humidity}%`
          let sensorName = lastData.sensor_name
          if (sensorName == undefined) {
            sensorName = `Capteur ${lastData.sensor_id}`
          }

          document.getElementById("main-sensor-name").innerText = sensorName
          document.getElementById("main-sensor-temp").innerText = lastTemperature
          const humidityLi = document.getElementById("humidity-li")
          const humiditySpan = document.getElementById("main-sensor-humid")
          humiditySpan.innerText = lastHumidity

          if (lastData.humidity == null) {
            document.getElementById('humidity-li').style.display = 'none';
            document.getElementById('humidityChart').style.display = 'none';
            
          }
          else {
            document.getElementById('humidity-li').style.display = 'block';
            document.getElementById('humidityChart').style.display = 'block';
            updateHumidityChart(data.map(entry => entry.date), data.map(entry => entry.humidity));
          }

          // Mettre à jour les graphiques
          updateTemperatureChart(data.map(entry => entry.date), data.map(entry => entry.temperature));
          

      } else {
          console.error('Aucune donnée n\'a été récupérée ou le format est incorrect.')
      }
  } catch (error) {
      console.error('Erreur de récupération des données :', error.message)
  }
}
