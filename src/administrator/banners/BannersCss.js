import { makeStyles } from "@mui/styles";

 export const useStyles = makeStyles({

container:{
    display:'flex',
    // width:'100vw',
    // height:'100vh',
    alignItems:'center',
    justifyContent:'center',
    background:"#fff"    
},

box:{
    display:'flex',
    width:'60%',
     height:'auto',
    alignItems:'center',
    justifyContent:'center',
    background:'#f2f2f2',
    padding:"10px",
    Margin:"5px"

},



displayContainer:{
  display:'flex',
  width:'100vw',
  height:'100vh',
  alignItems:'center',
  justifyContent:'center',
  background:"#f2f2f2"    
},

displayBox:{
  display:'flex',
  width:'70vw',
  height:'auto',
  alignItems:'center',
  justifyContent:'center',
  // background:'#f2f2f2',
  padding:"10px",
  Margin:"5px"

},



heading:{ 
  fontFamily: 'Playfair Display',
// fontFamily: 'Poppins',
fontWeight:'700',
letterSpacing:1,
fontSize:20

},

errorText:{
  fontSize:13,
  color:'red',
  paddingTop:4,
  paddingLeft:15
}

})