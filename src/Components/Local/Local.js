import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Local.css";

const Local = () => {
  const apiKey = "749d030bb028567c6df26b3941472ec9";

  const [location, setLocation] = useState(false);

  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: lat,
          lon: long,
          appid: apiKey,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return (
      <div className="lugar text-center">
        <h1 className="cidade">
          Você precisará habilitar a localização para utilizar o app!
        </h1>
      </div>
    );
  } else {
    return (
      <div className="lugar text-center">
        <h2 className="cidade">{weather["name"]}</h2>

        <h1 className="temperatura">{weather["main"]["temp"]}ºC</h1>
      </div>
    );
  }
};

export default Local;
