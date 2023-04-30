import { makeStyles } from "@mui/styles"

 export const useStyle=makeStyles({
    container :{
      width: '100vw', 
      height:'100%',
        background:'#fff',
        display: 'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        overflow:'hidden'  
    },
    box :{
        height: '30%',
        width: '30%', 
      display: 'flex',
        borderRadius:'15%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',

        background:'#f2f2f2',
        margin:'7%',
        padding:'10px' ,
        paddingTop:'40px',
        alignSelf:'center'
      }
    /*box:{
        height: '85vh',
        width: '45vw', 
        border:'1px solid' , 
        backgroundImage:'linear-gradient(#9c88ff,#e1b12c)',
        display:'flex',
        flexDirection:'row',
      },*/
    
   
 })