import { useState } from 'react'
import RadioButton from './radiobutton';
import WeatherDisplay from './weatherdisplay';
import "./weather.css";



function Weather() {
    const [zip, setZip] = useState('')
    const [unit, setUnit] = useState('')
    const [data, setData] = useState(null)


    async function fetchWeather() {
        const apikey =  process.env.REACT_APP_APIKEY
        const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apikey}&units=${unit}`
        const res = await fetch(path)
        const json = await res.json()
        
        const cod = json.cod
        const message =json.message
        if (cod!== 200){
            
            setData({cod, message})
                return
            
        }
        const temp = json.main.temp
        const description = json.weather[0].description 
        const feelsLike = json.main.feels_like
        const city = json.name
        

        setData ({
            cod,
            message,
            temp,
            feelsLike,
            description,
            city
        })
        
        
        
        console.log(json)

    }

    //dataEx = {temp: 72,desc: "partly cloudy"}
    return(
        <div className="weather-form">

           
            {data && <WeatherDisplay { ...data} /> }
            <form onSubmit ={e => {e.preventDefault(); fetchWeather();}}>
                <div>
                    <input placeholder="Enter you card info"
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                    />
                    <button>
                        submit
                    </button>
                </div>
                

                

                <select value = {unit} onChange={e => setUnit(e.target.value)}>
                    <option value="metric">
                        metric
                    </option>
                    <option value="imperial">
                        imperial
                    </option>
                    <option value="standard">
                        standard
                    </option>
                </select>

                <RadioButton
                label="metric"
                name="unit"
                checked={unit === 'metric'}
                onChange={()=>setUnit('metric')}
                />
                <RadioButton
                label="imperial"
                name="unit"
                checked={unit === 'imperial'}
                onChange={()=>setUnit('imperial')}
                />
                <RadioButton
                label="standard"
                name="unit"
                checked={unit === 'standard'}
                onChange={()=>setUnit('standard')}
                />
            </form>
            


        </div>
    );
}

export default Weather