
import { useState,useEffect } from "react";
import {useMediaQuery, AppBar,Toolbar, Divider } from "@mui/material";
import { useStyles } from "./HeaderComponentCss";
import { ShoppingCart } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from "@mui/material/styles";
import { CameraAlt } from '@mui/icons-material';


export default function Header(props){
  const theme =useTheme()
    const matches= useMediaQuery(theme.breakpoints.up('sm'))
    const classes=useStyles()
    return(
        <div>
            <AppBar  position="static"> 
            <div className={classes.bar}>
                  <toolbar>
                  <div className={classes.tool}>
                    <div className={classes.logo}>
                        {matches?`Quickshopee`:`QS`}
                    </div>
                    <div style={{  borderRadius:'30px', width:'60%'}}>
                    <FormControl style={{width:matches?`100%`:`100%`  }}>
                      <OutlinedInput style={{ borderRadius:'30px',  width:'60%',display:'flex',alignSelf:'center'}}
                      id="outlined-adorment-weight"
                      endAdornment={<InputAdornment  variant="outlined" >
                                          
                      {matches?<><SearchOutlinedIcon className={classes.searchicon}/></>:<CameraAlt />}
                      </InputAdornment>}
                      inputprops={{
                       'aria-lable':'weight'
                      }}
                       />
                    </FormControl>
                    
                    </div>

                    <div className={classes.icons}>
                 
                    <ShoppingCart />
                   <AccountCircleIcon  style={{paddingLeft:'15'}} />
                    </div>
                    </div>
                  </toolbar>
                  </div>

            </AppBar>
        </div>
    )
}