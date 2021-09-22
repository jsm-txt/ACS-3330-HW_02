import "./weatherdisplay.css"
function WeatherDisplay(props){
    const {cod, message, temp, feelslike, description, city} = props

    if(cod !== 200){
        return(
            <small>
                {message}
            </small>
        )
    }

    return(
        <div className="display">
            <h1> {temp}</h1>
            <small>feels like: {feelslike}</small>
            <small>{description}</small>
            <h3>City: {city}</h3>

        </div>
    )
}

export default WeatherDisplay