const weatherApiKey = "0549faa566d74655ae574254260401";
const unsplashKey = "WzxrrEUEd-TumXX0PsX3Wl3rnqS7kKDx-an59DCKzwQ";

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  if (!location) return alert("Please enter a city");

  const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`;

  try {
    const res = await fetch(weatherURL);
    const data = await res.json();

    document.getElementById("city").innerText = data.location.name;
    document.getElementById("temp").innerText =
      data.current.temp_c + "°C";
    document.getElementById("condition").innerText =
      data.current.condition.text;

    document.getElementById("weatherCard").style.display = "block";

    setBackground(data.current.condition.text, location);
  } catch (error) {
    alert("City not found");
  }
}

async function setBackground(condition, city) {
  const query = `${city} ${condition}`;
  const imgURL = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashKey}`;

  const res = await fetch(imgURL);
  const data = await res.json();

  document.body.style.backgroundImage =
    `url(${data.urls.full})`;
}
