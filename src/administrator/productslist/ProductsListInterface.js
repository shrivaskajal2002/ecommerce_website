import React,{ useState ,useEffect} from "react";
import{Grid,Avatar, Button,MenuItem,IconButton,Select,FormControl,TextField,InputLabel} from "@mui/material";
import{getData,postData} from "../services/fetchNodeServices";
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";
import { useStyles } from "./ProductsListCss";
import  ViewListIcon  from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";


    export default function ProductsListInterface() {

    const classes= useStyles();
    const navigate = useNavigate();


    const[categoryId,setCategoryId]= useState("");
    const[subcategoryId, setSubcategoryId]=useState("");
    const[productId,setProductId]=useState("");
    const[productsListId,setProductsListId]=useState("");
    const[banners, setBanners]= useState("");
    const [error, setError] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [productsItem, setProductsItem] = useState([]);
  
    useEffect(function(){
        fetchAllCategory()
        fetchAllSubcategory()
        fetchAllProducts()

        
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

    //   for subcategory list

    const fetchAllSubcategory=async(cid)=>{
        var result= await postData('subcategories/subcategory_list_by_categoryid', {categoryid:cid})
        setSubcategoryList(result.data)
    }

    const fillSubcategory=()=>{
        return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
      }

      const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
      }

    // fill productdss


    const fetchAllProducts=async(sid)=>{
      var result= await postData('products/products_item_by_subcategoryid', {subcategoryid:sid})
      setProductsItem(result.data)
      console.log(result)
  }

  const fillProducts=()=>{
      return productsItem.map((item)=>{
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
          // console.log("dejf",{item.productname})

      })
    }

    const handleSubcategoryChange=(event)=>{
      setSubcategoryId(event.target.value)
      fetchAllProducts(event.target.value)
    }



    const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
    };

    const validation=()=>{
        var isValid=true
        if(!categoryId)
        {
            handleError('categoryId','please select category')
            isValid=(false)
        }

        if(!subcategoryId)
        {
            handleError('subcategoryId', 'please select subcatgery')
            isValid=false

        }
        if(!productId)
        {
            handleError('productId','please select products')
            isValid=(false)
        }

        if(!productsListId)
        {
            handleError('productsListId','please select productsListId')
            isValid=(false)
        }

        if(!banners)
        {
            handleError('banners','please input banners')
            isValid=(false)
        }
        return isValid
    };


    const handleClick = async ()=>{
        if(validation()){
            var formData= new FormData();

            formData.append("categoryid",categoryId)
            formData.append("subcategoryid",subcategoryId);
            formData.append("productid", productId)
            formData.append("productslistid", productsListId)
            formData.append("banners", banners.bytes);
            
            console.log(error)
      
            var result = await postData("productpicture/productPicture_submit", formData);
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
              });
            }
           }
           };
            
           return(
            <div className={classes.container}> 
                <div className={classes.box}>
                <Grid container spacing={3}>
                
                <Grid item xs={12} style={{display:'flex',justifyContent:'space-between' }}>
            <div className={classes.heading}>Add New Products List</div>
            <div>
            <ViewListIcon onClick={(event)=> navigate("/dashboardinterface/DisplayAllProductsList")}/>
            </div>
          </Grid>
                    <Grid item xs={6}>
                       <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryId}
                        label="Category Id"
                        onChange={handleCategoryChange}
                       onFocus={()=>handleError("categoryId",null)}
                       error={error.categoryId? true:false}
                        >
                        <MenuItem>Select Category</MenuItem>
                        {fillCategory()}
                            </Select>
                    </FormControl>   
                    <div className={classes.errorText}>{error.categoryId}</div>
                     </Grid>
    
                     <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Sub Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subcategoryId}
                        label="Sub Category"
                        onChange={handleSubcategoryChange}
                       onFocus={()=>handleError('subcategoryId',null)}
                       error={error.subcategoryId?true:false}
                        >
                        <MenuItem>Select Sub Category</MenuItem>
                        {fillSubcategory()}
                            </Select>
                    </FormControl>   
                    <div className={classes.errorText}>{error.subcategoryId}</div>
    
                     </Grid>
                  
                     <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Produuct</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productId}
                        label="Product"
                        onChange={(event)=>setProductId(event.target.value)}
                       onFocus={()=>handleError('productId',null)}
                       error={error.productId?true:false}
                        >
                        <MenuItem>Select Product</MenuItem>
                        {fillProducts()}
                            </Select>
                    </FormControl>   
                    <div className={classes.errorText}>{error.productId}</div>
    
                     </Grid>
    
                     <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> productsListId</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productsListId}
                        label="Productlist Id"
                        onChange={(event)=>setProductsListId(event.target.value)}
                       onFocus={()=>handleError('productsListId',null)}
                       error={error.productsListId?true:false}
                        >
                        <MenuItem>Select Productlist Id</MenuItem>
                            </Select>
                    </FormControl>   
                    <div className={classes.errorText}>{error.productsListId }</div>
    
                     </Grid>
                   
                     
         <Grid item xs={12}>
            <DropzoneArea 
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => setBanners(files)}
                filesLimit={6}
                error={error.banners? true:false}
            />
                                <div className={classes.errorText}>{error.banners }</div>

         </Grid>

       
          
             <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} fullWidth>Submit</Button>
            </Grid>

           <Grid item xs={6}>
                 <Button variant="contained" fullWidth>Reset</Button>
          </Grid>
               
                    </Grid>  
    
                </div>
            </div>
        );
     
}