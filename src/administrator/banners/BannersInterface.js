import React, { useState } from "react";
import {  MenuItem,Grid, Button,} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postData } from "../services/fetchNodeServices";
import Swal from "sweetalert2";
import { useStyles } from "./BannersCss";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DropzoneArea } from "material-ui-dropzone";


export default function BannersInterface() {
    const classes = useStyles();
    const [status, setStatus] = useState('');
    const [banners, setBanners] = useState('');

     const handleClick=async()=>{
        var formData=new FormData()
        formData.append('status', status)
        
        banners.map((item,index)=>{
        
            formData.append('pictures' + index,item)
             
        })

        var result=await postData('banners/banners_submit', formData)

        if(result.status){       
            Swal.fire({
              icon:'success',
              title:result.message,
              showConfirmButton:true,
              timer:1500
            })
          }
    
          else{
            Swal.fire({
              icon:'error',
              title:result.message,
              showConfirmButton:false,  
              timer:1500
            });
          }
         }

         const handleReset=()=>{
          setBanners("")}
         

return(
    <div className={classes.container}>
      <div className={classes.box}>             
         <Grid container spacing={2}> 

             <Grid item xs={12}>
               <div className={classes.heading}>
                Banner Images
              </div>
            </Grid>
        
         <Grid item xs={12}>
            <DropzoneArea 
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => setBanners(files)}
                filesLimit={6}
            />
         </Grid>

         <Grid item xs={12}>
         <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Banner status</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="show" control={<Radio onChange={(event)=>setStatus(event.target.value)} />} label="show" />
                <FormControlLabel value="hide" control={<Radio  onChange={(event)=>setStatus(event.target.value)} />} label="hide" />
               
            </RadioGroup>
            </FormControl>
         </Grid>

         <Grid item xs={6}>
         <Button  onClick={handleClick} variant="contained" fullWidth>Submit</Button>

         </Grid>

         <Grid item xs={6}>
         <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
                     </Grid>
           </Grid>
        </div>
    </div>
)
}