import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Search } from '@material-ui/icons';

export default function Header({ setCoordinates }) {
  const [autocomplete, setAutocomplete] = useState(null)

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({ lat: lat, lng: lng })
  }
  return (
    <div className='header'>
      <h4>Travel Advisor</h4>
      <div className='header-col'>
        <p>Explore new places</p>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className='search'>
            <div className='search-icon'>
              <Search />
            </div>
            <input placeholder='Search...' type='text'></input>
          </div>
        </Autocomplete>
      </div>
    </div>
  )
}
