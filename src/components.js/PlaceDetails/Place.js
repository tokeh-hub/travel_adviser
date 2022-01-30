import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import { Rating } from '@material-ui/lab'
export default function Place({ place, selected, refProp }) {
  if (selected) { refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" }) }
  return (
    <Card elevation={6} style={{ marginTop: 50 }}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'hotel.jpg'}
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} size='small' readOnly />
          <Typography variant='body1' gutterBottom>{place.num_reviews} reviews</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1' >Price</Typography>
          <Typography variant='body1' gutterBottom>{place.price}</Typography>
        </Box>
        <Box className='subtitle'>
          <Typography variant='subtitle1' gutterBottom >Ranking</Typography>
          <Typography variant='body2' gutterBottom >{place.ranking}</Typography>
        </Box>
        {place?.awards?.map(award => (
          <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name}></img>
            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        )

        )}
        <Typography className='space'>
          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} label={name} className='chip' ></Chip>
          ))}
        </Typography>

        {place?.address && (
          <Typography variant='subtitle2' gutterBottom color='textSecondary' className='subtitle'>
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography variant='subtitle2' gutterBottom color='textSecondary' className='subtitle'>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )

}
