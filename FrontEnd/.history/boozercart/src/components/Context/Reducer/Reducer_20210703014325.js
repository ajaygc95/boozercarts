import react from "react";

const user = localStorage.getItem("currentUser")?
JSON.parse(localStorage.getItem("currentUser")).user:""