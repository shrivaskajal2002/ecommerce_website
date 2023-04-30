import { makeStyles } from "@mui/styles";

export  const useStyles=makeStyles({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        // width:'100vw',
        height:'80vh',
        background:'#f2f2f2'
    },
    box:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#fff',
        width:'40vw',
        height:'auto',
        padding:"15px",
        margin:"5px"
    },
    heading:{ 
        fontFamily: 'Playfair Display',
      // fontFamily: 'Poppins',
      fontWeight:'700',
      letterSpacing:1,
      fontSize:20,
      padding:"8px"
      
      },
      errorText:{
        fontSize:13,
        color:'red',
        paddingTop:4,
        paddingLeft:15
      },
    
      
      displayContainer:{
        display:'flex',
        // width:'100vw',
        // height:'88vh',
        alignItems:'center',
        justifyContent:'center',
        background:"#f2f2f2"    
      },
      
      displayBox:{
        display:'flex',
        // width:'70vw',
        height:'87vh',
        alignItems:'center',
        justifyContent:'center',
        // background:'#f2f2f2',
        padding:"10px",
        Margin:"5px"
      
      },
      
})
