import { AppBar , Grid, Toolbar,Paper,Avatar} from '@mui/material';
//  import { serverURL } from '../services/fetchNodeServices';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
 import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Routes,Route } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import Header from '../../userinterface/components/HeaderComponent/Header';
import { serverURL } from '../../administrator/services/fetchNodeServices';
import { width } from '@mui/system';
import SoftDrinkItems from '../softdrinkcomponent2/SoftDrinkItems';
import ProductComponent from '../../userinterface/components/productcomponent/ProductComponent';
import CansComponent from '../CansComponent';

export default function SoftDrinkInterface(){

   
    const navigate= useNavigate()
      return(
          <div>
             <Header />


             <div style={{margin:'1%'}}></div>
             
        <Grid container spacing={1}>
                <Grid item xs={2}>
                <Paper style={{display:'flex', flexDirection:'column',margin:5,width:250}}>
             <List>
             <Divider />
     
          <ListItem style={{width:'100%',height:'3%'}}>
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/thumbsup.jpg`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Soft Drinks</span>}/>
            </ListItemButton>
          </ListItem>
       
          <Divider />
          <ListItem>
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/softdrink.jpg`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Fruit Juices</span>}/>
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem >
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/monster.jpg`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Energy Drinks</span>}/>
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/redbull.png`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Cans</span>}/>
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/watermelon.jpg`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Coconut Water</span>}/>
            </ListItemButton>
          </ListItem>
  
          <Divider />
          <ListItem>
            <ListItemButton onClick={()=>navigate('/softdrinkinterface/productcomponent')}>
              <ListItemIcon>
              <Avatar src={`${serverURL}/images/lemonwater.jpg`} width ='700px' height='60px'/>  
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Soda & Mixers</span>}/>
            </ListItemButton>
          </ListItem>

<Divider />
          <ListItem>
            <ListItemButton>
          
              <Avatar src={`${serverURL}/images/coffee.png`} width ='700px' height='60px'/>  
           
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Coffee & Tea</span>}/>
            </ListItemButton>
          </ListItem>
          </List>
          </Paper>
 
    </Grid>

    <Grid item xs={10}>

{/* Dashboard Routes */}


<Routes>
<Route element={<SoftDrinkItems/>} path="/softdrinkItems/" />
<Route element={<ProductComponent/>} path="/productcomponent/" />
<Route element={<CansComponent/>} path="/canscomponent/" />

</Routes>

</Grid>

    </Grid>
 </div>

      )

}