function getData() {
  fetch("aqi.json").then(response => {
    response.json().then(data => {
      //console.log(data);
      updateHtml(data[data.length-1]);
    })
  }).catch(err => {
    console.log(err);
  })
}

function updateHtml(data) {

  //get numeric AQI from concentration
  let aqiPm25 = calcAQIpm25(data.pm25);
  let aqiPm10 = calcAQIpm10(data.pm10);

  //generate verbal legend from numeric AQI
  let legend25 = legend(aqiPm25);
  let legend10 = legend(aqiPm10);

  //update HTML
  document.getElementById("time").innerHTML = data.time;
  document.getElementById("aqiPm25").innerHTML = aqiPm25;
  document.getElementById("aqiPm10").innerHTML = aqiPm10;
  document.getElementById("pm25").innerHTML = "(" + data.pm25 + " µg/m³)";
  document.getElementById("pm10").innerHTML = "(" + data.pm10 + " µg/m³)";
  document.getElementById("legend10").innerHTML = legend10;
  document.getElementById("legend25").innerHTML = legend25;

  //can't get that to work right now
  //document.getElementById("meter10").value=aqiPm10;
  //document.getElementById("meter25").value=aqiPm25;

 

  //set colors
  colorsPm25 = getColor(aqiPm25);
  colorsPm10 = getColor(aqiPm10);
  document.getElementById("containerPm25").style.background = colorsPm25.bg;
  document.getElementById("containerPm25").style.color = colorsPm25.text
  document.getElementById("containerPm10").style.background = colorsPm10.bg;
  document.getElementById("containerPm10").style.color = colorsPm10.text
}

function getColor(aqi) {
  switch (true) {
    case (aqi >= 50 && aqi < 100):
      color = "yellow";
      break;
    case (aqi >= 100 && aqi < 150):
      color = "orange";
      break;
    case (aqi >= 150 && aqi < 200):
      color = "red";
      break;
    case (aqi >= 200 && aqi < 300):
      color = "purple";
      break;
    case (aqi >= 300):
      color = "brown";
      break;
    default:
      color = "Lime";
  }
  return {bg: color, text: (aqi > 200) ? "white" : "black"};
}

function calcAQIpm25(pm25) {
  let pm1 = 0;
	let pm2 = 12;
	let pm3 = 35.4;
	let pm4 = 55.4;
	let pm5 = 150.4;
	let pm6 = 250.4;
	let pm7 = 350.4;
	let pm8 = 500.4;

	let aqi1 = 0;
	let aqi2 = 50;
	let aqi3 = 100;
	let aqi4 = 150;
	let aqi5 = 200;
	let aqi6 = 300;
	let aqi7 = 400;
	let aqi8 = 500;

	let aqipm25 = 0;

	if (pm25 >= pm1 && pm25 <= pm2) {
		aqipm25 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm25 - pm1) + aqi1;
	} else if (pm25 >= pm2 && pm25 <= pm3) {
		aqipm25 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm25 - pm2) + aqi2;
	} else if (pm25 >= pm3 && pm25 <= pm4) {
		aqipm25 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm25 - pm3) + aqi3;
	} else if (pm25 >= pm4 && pm25 <= pm5) {
		aqipm25 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm25 - pm4) + aqi4;
	} else if (pm25 >= pm5 && pm25 <= pm6) {
		aqipm25 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm25 - pm5) + aqi5;
	} else if (pm25 >= pm6 && pm25 <= pm7) {
		aqipm25 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm25 - pm6) + aqi6;
	} else if (pm25 >= pm7 && pm25 <= pm8) {
		aqipm25 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm25 - pm7) + aqi7;
	}
	return aqipm25.toFixed(0);
}

function calcAQIpm10(pm10) {
	let pm1 = 0;
	let pm2 = 54;
	let pm3 = 154;
	let pm4 = 254;
	let pm5 = 354;
	let pm6 = 424;
	let pm7 = 504;
	let pm8 = 604;

	let aqi1 = 0;
	let aqi2 = 50;
	let aqi3 = 100;
	let aqi4 = 150;
	let aqi5 = 200;
	let aqi6 = 300;
	let aqi7 = 400;
	let aqi8 = 500;

	let aqipm10 = 0;

	if (pm10 >= pm1 && pm10 <= pm2) {
		aqipm10 = ((aqi2 - aqi1) / (pm2 - pm1)) * (pm10 - pm1) + aqi1;
	} else if (pm10 >= pm2 && pm10 <= pm3) {
		aqipm10 = ((aqi3 - aqi2) / (pm3 - pm2)) * (pm10 - pm2) + aqi2;
	} else if (pm10 >= pm3 && pm10 <= pm4) {
		aqipm10 = ((aqi4 - aqi3) / (pm4 - pm3)) * (pm10 - pm3) + aqi3;
	} else if (pm10 >= pm4 && pm10 <= pm5) {
		aqipm10 = ((aqi5 - aqi4) / (pm5 - pm4)) * (pm10 - pm4) + aqi4;
	} else if (pm10 >= pm5 && pm10 <= pm6) {
		aqipm10 = ((aqi6 - aqi5) / (pm6 - pm5)) * (pm10 - pm5) + aqi5;
	} else if (pm10 >= pm6 && pm10 <= pm7) {
		aqipm10 = ((aqi7 - aqi6) / (pm7 - pm6)) * (pm10 - pm6) + aqi6;
	} else if (pm10 >= pm7 && pm10 <= pm8) {
		aqipm10 = ((aqi8 - aqi7) / (pm8 - pm7)) * (pm10 - pm7) + aqi7;
	}
	return aqipm10.toFixed(0);
}

//generate a verbal legend based on the numeric AQI
function legend(numeric_aqi) {

	if (0 <= numeric_aqi && numeric_aqi <=50) var verbal_legend = "Good";
	else if (51 <= numeric_aqi && numeric_aqi <=100) var verbal_legend = "Moderate";
	else if (101 <= numeric_aqi && numeric_aqi <=150) var verbal_legend = "Unhealthy for Sensative Groups";
	else if (151 <= numeric_aqi && numeric_aqi <=200) var verbal_legend = "Unhealthy";
	else if (201 <= numeric_aqi && numeric_aqi <=300) var verbal_legend = "Very Unhealthy";
	else if (301 <= numeric_aqi && numeric_aqi <=500) var verbal_legend = "Hazardous";
	else var verbal_legend = "Error"

	return verbal_legend
}
