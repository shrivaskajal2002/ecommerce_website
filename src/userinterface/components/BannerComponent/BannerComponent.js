import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../administrator/services/fetchNodeServices";
import {useStyles} from "./BannerComponentCss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BannerComponent(props){
    var sliderref=createRef()
    const theme=useTheme()
    const matches= useMediaQuery(theme.breakpoints.up('md'));
    const classes=useStyles()

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };

      var images=[

        {id:1,images:'b1.jpg'},
        {id:2,images:'b2.jpg'},
        {id:3,images:'b3.jpg'},
        {id:4,images:'b4.jpg'},
        {id:5,images:'b5.jpg'},
    
    ]

    const showImages=()=>{
        return images.map((item)=>{
            return(
                <div>
                <img src={`${serverURL}/images/${item.images}`} width='100%' height='45%'/>
                </div>
            )
        })
    }

    const handleBackClick=()=>{
    sliderref.current.slickPrev()

    }

    const handleForwordClick=()=>{
    sliderref.current.slickNext()

    }
    return(
        <div className={classes.banner}>
        <div className={classes.bannersize}>
       {matches?<><div className={classes.bannericon}>
      <ArrowBackIosIcon onClick={handleBackClick} />
      <ArrowForwardIosIcon onClick={handleForwordClick} />
      </div>
      </>:<></>} 
         <Slider {...settings} ref={sliderref}>
      {showImages() }
      
    </Slider>
    </div>
    </div>

      
      
    )

}
