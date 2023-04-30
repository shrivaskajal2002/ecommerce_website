import { useState, useffect } from "react";
import { AppBar, Grid, Toolbar, Paper, Avatar } from "@mui/material";
import { serverURL } from "../../administrator/services/fetchNodeServices";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SoftDrinkItems() {
  const navigate = useNavigate();
  return (
    <div>
      <Grid container spacing={0.5}>
        <Grid item xs={2}>
          <Card sx={{ width:'4%',height:'4%' }}/>

          <CardMedia>
            <img src={`${serverURL}/images/softdrink.jpg`} />
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thumsup softdrink (750 ml)
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">ADD</Button>
          </CardActions>
        </Grid>

        <Grid item xs={2}>

        <Card />

        <CardMedia>
          <img src={`${serverURL}/images/softdrink.jpg`} />
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Thumsup softdrink (750 ml)
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">ADD</Button>
        </CardActions>
        </Grid>

        <Grid item xs={2}>
          <Card />

          <CardMedia>
            <img src={`${serverURL}/images/softdrink.jpg`} />
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thumsup softdrink (750 ml)
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">ADD</Button>
          </CardActions>
        </Grid>

        <Grid item xs={2}>
          <Card />

          <CardMedia>
            <img src={`${serverURL}/images/softdrink.jpg`} width='4%'/>
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thumsup softdrink (750 ml)
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">ADD</Button>
          </CardActions>
        </Grid>

        <Grid item xs={2}>
          <Card />

          <CardMedia>
            <img src={`${serverURL}/images/softdrink.jpg`} />
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thumsup softdrink (750 ml)
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">ADD</Button>
          </CardActions>
        </Grid>
      </Grid>
    </div>
  );
}
