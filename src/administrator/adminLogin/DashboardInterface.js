// import {useState, useffect} from 'react';
import { AppBar , Grid, Toolbar,Paper,Avatar} from '@mui/material';
 import { serverURL } from '../services/fetchNodeServices';
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

import CategoryInterface from "../categaories/CategoryInterface";
import DisplayAllCategories from "../categaories/DisplayAllCategories";
import SubcategoryInterface from "../subcategory/SubcategoryInterface";
import DisplayAllSubcategory from "../subcategory/DisplayAllSubcategory";
import ProductInterface from "../products/ProductInterface";
import DisplayAllProducts from "../products/DisplayAllProduct";
import ProductsListInterface from "../productslist/ProductsListInterface";
import DisplayAllProductsList from "../productslist/DisplayAllProductsList";

import BannersInterface from "../banners/BannersInterface";
import ProductPicturesInterface from "../productPictures/ProductPicturesInterface";
import { useNavigate } from 'react-router-dom';

export default function DashboardInterface(){

  var admin  =JSON.parse(localStorage.getItem("ADMIN"))
  const navigate= useNavigate()
    return(
        <div>
        <AppBar style={{background:'#f2f2f2'}}>
            <Toolbar>
                <div style={{color:'#000',fontSize:26,letterSpacing:1,fontFamily:'Roboto Slab',fontWeight:'bold'}}>
                    Quickshopee
                </div>

            </Toolbar>

            
        </AppBar>
        <div style={{margin:'5%'}}></div>
        <Grid container spacing={3}>
                <Grid item xs={2}>
                <Paper style={{display:'flex', flexDirection:'column',margin:5,width:250}}>
                   

                   <Paper elevation={3} style={{padding:'10px', background:'#f2f2f2' ,width:230}}>
                   <div style={{display:'flex', alignItems:'center' , alignself:'center',justifyContent:'center',padding:'3px'}}>
                   <Avatar src={`${serverURL}/images/kajal.jpeg`} width ='700px' height='60px'/>
                   </div>
                   <div style={{fontFamily:'sans-serif', fontBold:'bold',fontSize:18,display:'flex', alignItems:'center', justifyContent:'center' ,padding:'3px'}}> 
                    {admin.adminname}
                     </div> 
                      
                   <div style={{fontFamily:'sans-serif', fontBold:'bold',fontSize:18,display:'flex', alignItems:'center',justifyContent:'center',padding:'3px'}}> 
                    {admin.emailid}
                   </div> 
                      
                   </Paper>
                  

                    <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/displayAllCategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Category</span>}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/DisplayAllSubcategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Sub Category</span>}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/DisplayAllProducts')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Products</span>}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/DisplayAllProductsList')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Product List</span>}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/ProductPicturesInterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Product Picture </span>}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/DashboardInterface/BannersInterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Banner</span>}/>
            </ListItemButton>
          </ListItem>

<Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}> Logout</span>}/>
            </ListItemButton>
          </ListItem>
          </List>
                </Paper>

                </Grid>

                 <Grid item xs={10}>

                    {/* Dashboard Routes */}
  

           <Routes>
            <Route element={<CategoryInterface/>} path="/categoryInterface/" />
            <Route element={<DisplayAllCategories/>} path="/DisplayAllCategory/" />
            <Route element={<SubcategoryInterface/>} path="/SubcategoryInterface/" /> 
            <Route element={<DisplayAllSubcategory/>} path="/DisplayAllSubcategory/" /> 
            <Route element={<ProductInterface/>} path="/ProductInterface/" />
            <Route element={<DisplayAllProducts/>} path="/displayallproducts/" />
            <Route element={<ProductsListInterface/>} path="/productslistinterface/" />
 
            <Route element={<DisplayAllProductsList/>} path="/displayallproductslist/" />

            <Route element={<BannersInterface/>} path="/Bannersinterface/" />
            <Route element={<ProductPicturesInterface/>} path="/productpicturesinterface/" />


           </Routes>

                 </Grid>
            </Grid>


      

        </div>
    )

}