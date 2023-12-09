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
      console.log(data[0])

      if (Array.isArray(data) && data.length > 0) {
          const lastData = data[data.length - 1]
          const lastTemperature = `${lastData.temperature}°C`
          const lastHumidity = `${lastData.humidity}%`
          const sensorName = `Capteur ${lastData['id capteur']}`

          document.getElementById("main-sensor-name").innerText = sensorName
          document.getElementById("main-sensor-temp").innerText = lastTemperature
          const humidityLi = document.getElementById("humidity-li")
          const humiditySpan = document.getElementById("main-sensor-humid")
          humiditySpan.innerText = lastHumidity

          humidityLi.style.display = (sensorId !== '619048') ? 'list-item' : 'none'

          // Mettre à jour les graphiques
          updateTemperatureChart(data.map(entry => entry.date), data.map(entry => entry.temperature));
          updateHumidityChart(data.map(entry => entry.date), data.map(entry => entry.humidity));

      } else {
          console.error('Aucune donnée n\'a été récupérée ou le format est incorrect.')
      }
  } catch (error) {
      console.error('Erreur de récupération des données :', error.message)
  }
}
