import { fetchData } from './fetch_data.js';
import { averageData, updateTemperatureChart, updateHumidityChart } from './chart_utils.js';
import { updateDate } from './update_date.js';



var temperatureChart = null;
var humidityChart = null;

document.getElementById('sensorForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedElement = document.getElementById('sensor-id').value;
  const startDate = document.getElementById('start_date').value;
  const endDate = document.getElementById('end_date').value;
  
  fetchData(selectedElement, startDate, endDate);
});

document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');

  burgerMenu.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });
  updateDate();
  updateTemperatureChart(/* arguments ici */);
  updateHumidityChart(/* arguments ici */);
});
