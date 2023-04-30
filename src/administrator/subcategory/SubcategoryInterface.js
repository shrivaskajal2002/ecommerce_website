import React,{ useEffect, useState } from "react";
import {FormControl,Select,Avatar,MenuItem,Grid,IconButton,InputLabel,TextField,Button}  from "@mui/material"
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { getData,postData } from "../services/fetchNodeServices";
import Swal from "sweetalert2";
import { useStyles } from "./SubcategoryCss";
import  ViewListIcon  from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

   

export default function SubcategoryInterface(){
     const classes=useStyles()
     const navigate = useNavigate();

    const[categoryId,setCategoryId]=useState('')
    const[subcategoryName,setSubcategoryName]=useState('')
    const[status,setStatus]=useState('')
    const[picture,setPicture]=useState({file:'/images/cart.png',bytes:''});
    const[error,setError]=useState({})
    const[categoryList,setCategoryList]=useState([])

    useEffect(function(){
      fetchAllCategory()
    },[])

    const fetchAllCategory= async()=>{
      var result= await getData('category/category_list')
      setCategoryList(result.data)
      console.log(result)
    }

    const fillCategory=()=>{
       return categoryList.map((item)=>{
        return  <MenuItem value={item.categoryid}>{item.categoryname} </MenuItem>
       })
    }

    const handlePicture=(event)=>{
      
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:(event.target.files[0])})
        handleError('picture',null)
    }
 
    const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
    }
    
    const validation=()=>{

       var isValid=true
       if(!categoryId)
      {
        handleError('categoryId','please input Category ID..')
        isValid=false
        console.log(error)
      }

      if(!subcategoryName)
      {
        handleError('subcategoryName','please input Subcategory name..')
        isValid=false
        console.log(error)
      }

      if(!status)
    {
      handleError('status','please enter status')
      isValid=false
      handleError('picture',null)

    } 

    
    if(!picture.bytes)
    {
      handleError('picture','please select image')
      isValid=false
    }

      return isValid
    }

    const handleClick = async () => {
      if (validation()) {
        var formData = new FormData();
      
        formData.append("categoryid",categoryId)
      formData.append("subcategoryName", subcategoryName);
      formData.append("status", status);
      formData.append("picture", picture.bytes);
      
      console.log(error)

      var result = await postData("subcategories/subcategorysubmit", formData);
    console.log(error)
       console.log(result) 

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
        })
      }
     }
     }

        //  HANDLE RESET BUTTON 

        const handleReset=()=>{
          // navigate('/DashboardInterface')
          setPicture("")
          setCategoryId("")
          setSubcategoryName("")
          setStatus("")
        
        }
       
return(
<div className={classes.container}>
<div className={classes.box}>

<Grid container spacing={3} >

<Grid item xs={12} style={{display:'flex',justifyContent:'space-between' }}>
            <div className={classes.heading}>Add New Sub Category</div>
            <div>
            <ViewListIcon onClick={(event)=> navigate("/dashboardinterface/DisplayAllSubcategory")}/>
            </div>
          </Grid>

<Grid item xs={12} margin="8px" >
       
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Category"
          onChange={(event)=>setCategoryId(event.target.value)}
          onFocus={()=>handleError('categoryId',null)}
          error={error.categoryId?true:false}  
          helperText={error.categoryId}
        >
        <MenuItem>Select categories </MenuItem>
        {fillCategory()}
  </Select>
  </FormControl>
  <div  className={classes.errorText}>{error.categoryId}</div>
    </Grid>


   <Grid item xs={12} margin="8px">
            <TextField
              error={error.subcategoryName ? true : false}
              helperText={error.subcategoryName}
              onChange={(event) => setSubcategoryName(event.target.value)}
              onFocus={() => handleError("SubcategoryName", null)}
              label="Sub Category Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
     
    <Grid item xs={12} margin="8px" >
    <FormControl fullWidth >
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={(event)=>setStatus(event.target.value)}
    onFocus={()=>handleError('status',null)}
    error={error.status?true:false}  
  >
    <MenuItem value="-select status">--Select status</MenuItem>
    <MenuItem value="trending">Trending</MenuItem>
    <MenuItem value="popular">Popular</MenuItem>
    <MenuItem value="continue">continue</MenuItem>
    <MenuItem value="discontinue">Discontinue</MenuItem>
  </Select>
</FormControl>
<div className={classes.errorText}>{error.status}</div>
    </Grid>

    {/* <Grid> */}
    <Grid item xs={6} >
       <IconButton  color="primary" aria-label="upload picture" component="label"  >
       <input hidden  onChange={handlePicture} accept="image/*"  type="file" />
       <PhotoCamera />
       </IconButton >  

      
        <div className={classes.errorText}>{error.picture}</div>
      </Grid>

    <Grid item xs={6} >
    <Avatar
     alt="Subcategory Icon"
     src={picture.file}
     style ={{ width: 49, height: 49 }}
     variant="rounded"
/>
    
    </Grid>
    
{/* // </Grid> */}
<Grid item xs={6} margin="7px" >
<Button variant="contained" fullWidth onClick={handleClick}> Submit</Button>

</Grid>
<Grid item xs={5} margin="7px"  >
<Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
</Grid>
 </Grid>
</div>
</div>
)

}