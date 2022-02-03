import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import { Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import mapStyles from './mapStyles';
export default function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) {
     const isDesktop = useMediaQuery('(min-width:600px)')
     return <div className='map'>
          <GoogleMapReact
               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS }}
               defaultCenter={coordinates}
               center={coordinates}
               defaultZoom={14}
               margin={[50, 50, 50, 50]}
               onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
               }}
               onChildClick={(child) => setChildClicked(child)}
               options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
          >
               {places?.map((place, i) =>
               (
                    <div
                         className='markerContainer'
                         lat={Number(place.latitude)}
                         lng={Number(place.longitude)}
                         key={i}
                    >
                         {
                              !isDesktop ? (
                                   <LocationOnOutlined color='primary' fontSize='large'></LocationOnOutlined>)
                                   : (
                                        <Paper elevation={3} className='paper'>
                                             <Typography className='typo' gutterBottom variant='subtitle2'>
                                                  {place.name}
                                             </Typography>
                                             <img src={place.photo ? place.photo.images.large.url : 'hotel.jpg'} alt='loss' className='pointer' />
                                             <Rating value={Number(place.rating)} size='small' readOnly />
                                        </Paper>
                                   )
                         }

                    </div>
               )
               )}
               

          </GoogleMapReact>
     </div>;
}
