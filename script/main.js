import { fetchData } from './fetch_data.js';
import { averageData, updateTemperatureChart, updateHumidityChart } from './chart_utils.js';
import { updateDate } from './update_date.js';



var temperatureChart = null;
var humidityChart = null;

document.getElementById('sensorForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let selectedSensor = document.getElementById('form-sensor-id').value;
  let startDate = document.getElementById('start_date').value;
  let endDate = document.getElementById('end_date').value;
  
  fetchData(selectedSensor, startDate, endDate);
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
