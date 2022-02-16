/* Övning 1 */

let myUrl = new URL("https://localhost");

myUrl.hostname = "api.openweathermap.org";
myUrl.pathname = "/data/2.5/weather";

myUrl.searchParams.set("q", "Mölndal");
myUrl.searchParams.set("appid", "a7523f5c72bc1d78c2867b5d6502410a");
myUrl.searchParams.set("units", "metric");

document.getElementById("ex-1-out").innerText = myUrl;

/* Övning 2 */

document.getElementById("ex-2-btn").onclick = function () {
  const out = document.getElementById("ex-2-out");
  fetch(myUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Något gick fel: " + response.status;
      }
    })
    .then((text) => {
      console.log(text);
      const prettyJSON = JSON.stringify(text, null, " ");
      out.innerText = prettyJSON;
    })
    .catch((error) => console.log(error));
};

/* Övning 3 */

document.getElementById("ex-3-btn").onclick = function (event) {
  const out = document.getElementById("ex-3-out");

  let xhr = new XMLHttpRequest();

  xhr.open("GET", myUrl);

  xhr.responseType = "json";

  xhr.onload = function () {
    console.log(xhr.status + " " + xhr.statusText);
    console.log(xhr.response);
    let text = xhr.response;
    let prettyJSON = JSON.stringify(text, null, " ");
    out.innerText = prettyJSON;
  };

  xhr.send();
};

/* Övning 4 */

document.getElementById("ex-4-btn").onclick = function () {
  const out = document.getElementById("ex-4-out");
  fetch(myUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Något gick fel: " + response.status;
      }
    })
    .then((text) => {
      console.log(text);
      const weatherTitle = text.weather[0].main;
      const weatherIcon = text.weather[0].icon;
      const weatherDescription = text.weather[0].description;
      const actualTemp = text.main.temp;
      const feelTemp = text.main.feels_like;

      const imgUrl = new URL("http://openweathermap.org");
      imgUrl.pathname = `/img/wn/${weatherIcon}@4x.png`;

      let htmlPrint = /* HTML */ `
        <h3>${weatherTitle}</h3>
        <img src=${imgUrl} />
        <p>${weatherDescription}</p>
        <p>It is: ${actualTemp}&#8451, feels like: ${feelTemp}&#8451.</p>
      `;

      out.innerHTML = htmlPrint;
    })
    .catch((error) => console.log(error));
};

/* Övning 5 */
