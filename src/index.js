let date = document.querySelector("#date");
let today = new Date();
let localFormat = today.toLocaleString();
let hour = today.getHours();
let localHour = today.toLocaleString(undefined, { hour: 'numeric', hour12: true });
console.log(localHour);
let minutes = today.getMinutes().toString().padStart(2, "0");
console.log(localFormat);
date.innerHTML = `${hour}:${minutes}`;
