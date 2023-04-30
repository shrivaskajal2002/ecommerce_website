
 import { useState,useEffect } from "react";
import Header from "../components/HeaderComponent/Header";
import BannerComponent from "../components/BannerComponent/BannerComponent";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";
import ProductComponent from "../components/productcomponent/ProductComponent";
import { useStyles } from "./homeCss";
import { Routes,Route } from 'react-router-dom';
import DairyProductComponent from "../components/dairyproductComponent/DairyProductComponent";
import SoftDrinkItems from "../../userinterface2/softdrinkcomponent2/SoftDrinkItems"
export default function Home(props){
    const classes=useStyles()
    return(
        <div>
           <Header />          
           <BannerComponent />         
           <CategoryComponent title="Popular Category"/>
           <ProductComponent title="Popular Drinks" />
           <DairyProductComponent title="Dairy Products" />
           
           <Routes>
            <Route element={<SoftDrinkItems/>} path="/softdrinkitems/" />

           </Routes>
        
        </div>
    )
}
