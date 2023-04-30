import { makeStyles } from "@mui/styles";

export  const useStyles=makeStyles({

    banner:{
        position:'relative',
        
    },

    bannersize:{
        display:'flex',
        justifyContent:'center',
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:'1%',
        flexDirection:'column',

    },

    bannericon:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',

        position:'absolute',
        top:'45%',
        left:'4.5%',
        zIndex:1,
        width:'91%' 

    },
   notbannericon:{
    display:'flex',
    justifyContent:'space-between',
    width:'100%',

   
    top:'45%',
    left:'4.5%',
    zIndex:1,
    width:'91%' 
   }

})