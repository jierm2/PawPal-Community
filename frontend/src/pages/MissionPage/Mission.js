import React from 'react';
import { Grid, Typography, Box, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import hello from '../../images/dogMission.png'; 

function Mission(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'grey.900', boxShadow: 5 }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" sx={{ color: 'common.white' }}>
              Welcome to PawPal Community
              <PetsIcon sx={{ fontSize: 40, verticalAlign: 'bottom', marginLeft: 1, color: 'warning.main' }} />
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p" sx={{ color: 'grey.500' }}>
              Where Pet Care Meets Compassion!
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginTop: 2, color: 'grey.300' }}>
              At PawPal Community, we believe that every dog deserves love and every dog lover should have the chance to share their affection. As a trusted companion for your pet care needs, we are committed to delivering exceptional services that go beyond expectations. We offer a unique platform, building connections and enriching lives, both human and canine. Join us on this exciting journey and discover a new level of pet care excellence.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
            borderRadius: isMobile ? 0 : theme.shape.borderRadius,
          }}
          alt="multicolor dog mission"
          src={hello}
        />
      </Grid>
    </Grid>
  );
}

export default Mission;
