import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../administrator/services/fetchNodeServices";
import { useStyles } from "./DairyProductComponentCss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createRef } from "react";
import { Paper } from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";

export default function DairyProductComponent(props){
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
        slidesToShow:lg?6: md?2:sm?1:xs?1:6,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:5000,
      };

      var images=[

        {id:1,images:'amulcheese.avif',name:'Amul.Cheese',price:'150',offer:'145',weight:'750 g'},
        {id:2,images:'wheatbread.avif',name:'Wheat Bread',price:'150',offer:'120',weight:'200 ml'},
        {id:3,images:'masti.avif', name:'Masti Chhacc' ,price:'50',offer:'45',weight:'100 ml'},
        {id:4,images:'cheese.avif',name:'Amul Cheese' ,price:'40',offer:'0',weight:'250 ml'},
        {id:5,images:'amulbutter.avif',name:'Amul Butter' ,price:'130',offer:'129',weight:'350 ml'},
        {id:6,images:'amulcheese.avif',name:'Amul Cheese' ,price:'60',offer:'55',weight:'250 ml'},
        {id:7,images:'condensedmilk.avif',name:'Condense Milk' ,price:'190',offer:'0',weight:'450 ml'},
        {id:8,images:'classiccurd.avif',name:'Classic Curd' ,price:'90',offer:'0',weight:'450 ml'},
    
    ]

    const handleClick=()=>{
        navigate('/softdrinkinterface')
    }

    const showImages=()=>{
        return images.map((item)=>{
            return(
        <div>
              <Paper elevation={1} className={classes.product} variant="outlined">
                <div className={classes.productitem}>
                <img src={`${serverURL}/images/${item.images}`} width={sm?90:130} height={sm?80:140}  />
                </div>
                <div className={classes.productName}>{item.name}</div>
                <div className={classes.productweight}>{item.weight}</div>
           <div>
                <div className={classes.r} style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <div className={classes.c}>
                <div className={classes.productprice}>&#8377;{item.price}</div>
                <div className={classes.productprice}>&#8377;{item.offer}</div>
                </div>
                
                <div className={classes.btn}>
                  <Button variant="outlined">ADD</Button>
                  </div>
                  </div>
         </div>
                </Paper>

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
