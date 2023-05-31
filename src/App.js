import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6d4a2aad761dbafa3e3a939bf081c171`;
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  return (
    <main className="app">

      <div className="search">
        <input type="text" onKeyDown={searchLocation} value={location} placeholder="Enter location" onChange={event => setLocation(event.target.value)} />
      </div>

      <section className="container">

        <section className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </section>
        {data.name !== undefined &&
          <section className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </section>
        }
      </section>
    </main>
  );
}

export default App;
