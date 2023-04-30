// import React, { useState, useEffect } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Paper } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Swal from "sweetalert2";
// import { postData,getData } from "../services/fetchNodeServices";
// import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://blinkit.com/">
//         Quickshopee
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function AdminLoginInterface() {
//   const navigate = useNavigate();

//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleClick = async () => {
   
//     var result = await postData("adminlogin/checklogin", {
//       emailid: emailId,
//       password: password,
//     })
   
//     if (result.status) {
//        localStorage.setItem("ADMIN",JSON.stringify(result.data))
//      navigate('/DashboardInterface')
      
      
      
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: result.message,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="emailid"
//               label="Email Address"
//               name="emailid"
//               onChange={(event) => setEmailId(event.target.value)}
//               autoComplete="emailid"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               onChange={(event) => setPassword(event.target.value)}
//               autoComplete="current-password"
//             />

//             <Button
//               type="submit"
//               onClick={handleClick}
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container></Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

import React,{useState} from "react";
import { useStyle } from "./loginCss";
import Button from '@mui/material/Button';
import {Grid,TextField,IconButton,OutlinedInput,InputAdornment,InputLabel,FormControl} from '@mui/material';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { createTheme,} from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { postData } from "../services/fetchNodeServices";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://blinkit.com/">
         TheQuickShopeee
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function LoginInterface(){


    var classes=useStyle()
    var navigate=useNavigate()
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [showPassword, setShowPassword] =useState(false);

    
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const handleClick=async()=>{
    var result=await postData('adminlogin/chk_admin_login',{emailid:emailId,password:password})
    if(result.status)
    {
      localStorage.setItem("ADMIN",JSON.stringify(result.data))
    navigate('/DashboardInterface')
    }
    else{
     Swal.fire({
       icon: 'error',
       title: result.message,
       showCancelButton:true
     })
    
    }
   }
  
   





    return(<div className={classes.container}>
    <div className={classes.box}>

        <div style={{display: 'flex',justifyContent:'center',alignItems:'center',fontSize:'22px', fontWeight:'bold',}}>Admin Login</div> 
      <div style={{padding :25 }}>
      
     <span style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
     <AccountCircleIcon  style={{paddingTop:15,fontSize:30,padding:'10px'}}/>
     <TextField fullWidth value={emailId} variant='outlined' style={{paddingBottom:25}} onChange={(event)=>setEmailId(event.target.value)}  color='secondary' label='Email Id/Mob. Number'>

     </TextField>
     </span> 

     <span style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}><VpnKeyIcon  style={{paddingTop:15,fontSize:30,padding:'10px'}}/>
                 <FormControl  fullWidth variant="outlined">
          <InputLabel color='secondary'  fullWidth>Password</InputLabel>
          <OutlinedInput fullWidth onChange={(event)=>setPassword(event.target.value)}
           
            id="outlined-adornment-password"
            value={password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
 
        </FormControl></span>
             
              <Button
                type="button"
                fullWidth
                onClick={handleClick}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            
        

              </div>

            
    </div>
        </div>)


}