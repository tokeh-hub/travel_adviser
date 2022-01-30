import React, { useEffect, useState } from 'react'
import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components.js/Header/Header';
import List from './components.js/List/List';
import Map from './components.js/Map/Map';
import { getPlaces, getWeather } from './api'


function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [item, setItem] = useState('restaurants')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])
  useEffect(() => {
    const filteredPlaces = places.filter(place => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating, places])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getWeather(coordinates.lat, coordinates.lng)
        .then(data => setWeatherData(data))

      getPlaces(item, bounds.ne, bounds.sw)
        .then((data) => {
          setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
          setIsLoading(false)
          setFilteredPlaces([])
        })
    }

  }, [item, bounds])
  console.log(weatherData)
  return (
    <div className="App">
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }} >
        <Grid item xs={12} md={5}>
          <List places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            item={item}
            setItem={setItem}
            rating={rating}
            setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
