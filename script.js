const Fajr = document.getElementById("Fajr");
const Dhuhr = document.getElementById("Dhuhr");
const Asr = document.getElementById("Asr");
const Maghrib = document.getElementById("Maghrib");
const Isha = document.getElementById("Isha");
const Countries = document.getElementById("Countries");

// axios.get("http://api.aladhan.com/v1/calendarByAddress/2023/4?address=Amman,jordan&method=1")
// .then(function(response){
//     console.log(response.data.data[0].timings)
// }
function setCity(callback, kingdom) {
    axios
        .get(`http://api.aladhan.com/v1/calendarByAddress/2023/4?address=${kingdom}&method=1`)
        .then(function (response) {
            const data = response.data.data[0].timings;
            // Filter the object and get 5 basic obligatory prayers from it and time of each prayer
            const prayers = Object.entries(data).reduce((acc, [key, value]) => {
                if (
                    (key === "Fajr" && data.Fajr) ||
                    (key === "Dhuhr" && data.Dhuhr) ||
                    (key === "Asr" && data.Asr) ||
                    (key === "Maghrib" && data.Maghrib) ||
                    (key === "Isha" && data.Isha)
                ) {
                    acc[key] = value;
                }
                return acc;
            }, {}); 
            console.log(Object.values(prayers) );
            callback(Object.values(prayers));
        });
}

function setPrayerTime(prayerTimes) {
    let prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    for (let i = 0; i < prayers.length; i++) {
      let prayerTime = document.getElementById(prayers[i]);
      let existingPrayerTime = prayerTime.querySelector('.time');
      if (existingPrayerTime) {
        existingPrayerTime.innerHTML = prayerTimes[i];
      } else {

        let newtime = document.createElement("p");
        newtime.className = "time";
        newtime.innerHTML = prayerTimes[i];
        prayerTime.appendChild(newtime);
      }
    }
  }
  
function ChakeTime(callback){
    Countries.addEventListener("change", function () {
        let country = String(Countries.value);
        callback(country)
        return country;

    });

}

function getPrayerTimesForCountry(country) {
    setCity(setPrayerTime, country);
}


ChakeTime(getPrayerTimesForCountry);