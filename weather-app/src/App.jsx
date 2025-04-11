import { useState } from "react"
import axios from "axios"

function App() {

  const [data, setData] = useState({})
  const [location,setLocation] = useState('')

  const searchLocation = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=86ca99c257a3ae125c32870e10fee586`;
      
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      setLocation('');
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location"><p>{data.name}</p></div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default App
