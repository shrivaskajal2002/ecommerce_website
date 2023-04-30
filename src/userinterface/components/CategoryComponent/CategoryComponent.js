import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../administrator/services/fetchNodeServices";
import {useStyles} from "./CategoryComponentCss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createRef } from "react";
import { Paper } from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function CategoryComponent(props){
    var sliderref=createRef()
    const navigate=useNavigate()

    const theme= useTheme()
    const lg= useMediaQuery(theme.breakpoints.up('lg'))
    const md= useMediaQuery(theme.breakpoints.down('md'))
    const sm= useMediaQuery(theme.breakpoints.down('sm'))
    const xs= useMediaQuery(theme.breakpoints.up('xs'))
    const classes=useStyles()

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: sm?2:md?3:lg?5:1,
        // slidesToShow:lg?5: md?2:sm?1:xs?1:5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:5000,
      };

      var images=[

        {id:1,images:'oil.png',name:'oil'},
        {id:2,images:'drinks.png',name:'drinks'},
        {id:3,images:'chocolate.jpg', name:'chocolate'},
        {id:4,images:'bakery.png',name:'bakery'},
        {id:5,images:'masala.png',name:'masala'},
        {id:6,images:'electronics.png',name:'electronics'},
        {id:7,images:'fashion.png',name:'fashion'},
        {id:8,images:'babycare.png',name:'babycare'},
    
    ]

    const handleClick=()=>{
        navigate('/softdrinkinterface')
    }

    const showImages=()=>{
        return images.map((item)=>{
            return(
                <div>
                <div >
                <Paper elevation={2} className={classes.popularCategory}  style={{background:'#F7E9F7'}}>
                <img src={`${serverURL}/images/${item.images}`} width={sm?90:200} height={sm?80:180} onClick={handleClick} />
                </Paper>
                </div>
                <div className={classes.popularCategoryName}>{item.name}</div>
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
    <div style={{width:'93%',margin:'1%'}}>
        <div className={classes.category}>
            <div className={classes.categoryhaading} style={{fontSize:!md?`25px`:`18px`}}> {props.title}</div>
              {lg?<>  <div className={classes.bannericon}>
                    <ArrowBackIosIcon onClick={handleBackClick} />
                    <ArrowForwardIosIcon onClick={handleForwordClick} />
                  </div></>:<></>}
            
          </div>
        <div>
            <Slider {...settings} ref={sliderref}>
                     {showImages() }
        
            </Slider>
         </div>
    </div>

      
      
    )

}
