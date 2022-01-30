import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, InputLabel, Typography, MenuItem, Select, FormControl } from '@material-ui/core';
import Place from '../PlaceDetails/Place';
export default function List({ places, childClicked, isLoading, item, setItem, rating, setRating }) {

  const [elref, setElref] = useState([])

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elref[i] || createRef())
    setElref(refs)
  }, [places, elref])

  return <div className='container'>
    <Typography variant='h6'>Restaurants,Hotel and Attractions around you</Typography>
    {isLoading ? (
      <div className='loading'>
        <CircularProgress size='5rem' />
      </div>
    ) : (
      <>
        <FormControl className='form'>
          <InputLabel style={{ marginTop: '3px' }}>Type</InputLabel>
          <Select value={item} onChange={(e) => { setItem(e.target.value) }}>
            <MenuItem value='restaurants'>Restaurants</MenuItem>
            <MenuItem value='hotels'>Hotels</MenuItem>
            <MenuItem value='attractions'>Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className='form'>
          <InputLabel style={{ marginTop: '3px' }}>Ratings</InputLabel>
          <Select value={rating} onChange={(e) => { setRating(e.target.value) }}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3} className='list' >
          {places.map((place, i) => {

            return (
              <Grid ref={elref[i]} item key={i} xs={12}>
                <Place place={place} selected={Number(childClicked) === i} i={i} refProp={elref[i]} childClicked={childClicked} />
              </Grid>
            )
          })}

        </Grid>
      </>
    )}

  </div>;
}
