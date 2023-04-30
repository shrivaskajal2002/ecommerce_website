import react,{ useState ,useEffect} from "react";
import{Grid,Avatar, Button,MenuItem,IconButton,Select,FormControl,TextField,InputLabel} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useStyles } from "../products/ProductCss";
import{getData,postData} from "../services/fetchNodeServices";
import Swal from "sweetalert2";
import  ViewListIcon  from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

export default function ProductInterface(){
    const classes= useStyles()
    const navigate = useNavigate();


    const[categoryId,setCategoryId]= useState('')
    const[subcategoryId, setSubcategoryId]=useState('')
    const[productName,setproductName]=useState('')
     const[status,setStatus]=useState('')
     const[description,setdescription]= useState('')
     const[picture,setPicture]=useState('')
     const[error,setError]=useState({})  
    const[categoryList,setCategoryList]=useState([])
    const[subcategoryList,setSubcategoryList]=useState([])

    useEffect(function(){
        fetchAllCategory()
        fetchAllSubcategory()
      },[])
  
              const fetchAllCategory= async()=>{
                var result= await getData('category/category_list')
                setCategoryList(result.data)
            
              }

              const fillCategory= ()=>{
                return categoryList.map((item)=>{
                    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                })
              }

              // for fill subcategory dropdown

              const fetchAllSubcategory= async(cid)=>{
                var result = await postData('subcategories/subcategory_list_by_categoryid',{categoryid:cid}) 
                setSubcategoryList(result.data)
              }

              const handleCategoryChange=(event)=>{
                setCategoryId(event.target.value)
                fetchAllSubcategory(event.target.value)
              }


              const fillSubcategory=()=>{
                return subcategoryList.map((item)=>{
                  return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                })
              }

              

              // for display img

              const handlePicture=(event)=>{
                setPicture({file:URL.createObjectURL (event.target.files[0]),  bytes:(event.target.files[0])})
                handleError('picture',null)

              }
            //   for error handle

            const handleError=(input,value)=>{
                 setError((prev)=>({...prev,[input]:value}))
            }

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
                    isValid=(false)

                }
                if(!productName)
                {
                    handleError('productName','please input products')
                    isValid=(false)
                }

                if(!description)
                {
                    handleError('description','please input description')
                    isValid=(false)
                }

                if(!status)
                {
                    handleError('status','please input status')
                    isValid=(false)
                }

                if(!picture.bytes){
                  handleError('pictures', 'plzz input pictures')
                }
                return isValid
            }

            const handleClick = async ()=>{
                if(validation()){
                    var formData= new FormData();

                    formData.append("categoryid",categoryId)
                    formData.append("subcategoryid",subcategoryId) 
                    formData.append("productName", productName)
                    formData.append("description", description)
                    formData.append("status", status);
                    formData.append("picture", picture.bytes);
                    
                    console.log(error)
              
                    var result = await postData('products/products_submit', formData);
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
            setproductName("")
            setCategoryId("")
            setSubcategoryId("")
            setdescription("")
            setStatus("")
            setPicture("")
          }
        

    return(
        <div className={classes.container}> 
            <div className={classes.box}>
            <Grid container spacing={3}>

            <Grid item xs={12} style={{display:'flex',justifyContent:'space-between' }}>
            <div className={classes.heading}>Add New Products</div>
            <div>
            <ViewListIcon onClick={(event)=> navigate("/dashboardinterface/DisplayAllProducts")}/>
            </div>
          </Grid>
                
          <Grid item xs={6} margin="8px">

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Category"
                    onChange={handleCategoryChange}
                   onFocus={()=>handleError('categoryid',null)}
                   error={error.setCategoryId ? true:false}
                    >
                    <MenuItem>Select Category</MenuItem>
                    {fillCategory()}
                        </Select>
                </FormControl>   
                <div className={classes.errorText}>{error.categoryId}</div>
                 </Grid>

                 <Grid item xs={5}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"> Sub Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subcategoryId}
                    label="Sub Category"
                    onChange={(event)=>{setSubcategoryId(event.target.value)}}
                   onFocus={()=>handleError('subcategoryid',null)}
                   error={error.setSubcategoryId?true:false}
                    >
                    <MenuItem>Select Sub Category</MenuItem>
                    {fillSubcategory()}
                        </Select>
                </FormControl>   
                <div className={classes.errorText}>{error.subcategoryId}</div>

                 </Grid>
              
                 <Grid item xs={6}>
                 <TextField
              helperText={error.productName}
              onChange={(event) => setproductName(event.target.value)}
              onFocus={() => handleError('productName', null)}
              error={error.setProductName? true : false}


              label="product name "
              variant="outlined"
              fullWidth
            />
                 </Grid>

                 <Grid item xs={6}>
                 <TextField
              error={error.description? true : false}
              helperText={error.description}
              onChange={(event) => setdescription(event.target.value)}
              onFocus={() => handleError("description", null)}
              label="description"
              variant="outlined"
              fullWidth
            />
                 </Grid>
               
                 <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="status"
                    onChange={(event)=>setStatus(event.target.value)}
                    onFocus={()=> handleError("status", null)}
                    error={error.status?true:false}
                    >
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="trending">Trending</MenuItem>
                    <MenuItem value="continue">Continue</MenuItem>
                    <MenuItem value="discontinue">Discontinue</MenuItem>
                    </Select>
                </FormControl>   
                <div className={classes.errorText}>{error.status}</div>

                 </Grid>
              
    <Grid item xs={6} >
       <IconButton  color="primary" aria-label="upload picture" component="label"  >
       <input hidden  onChange={handlePicture}  accept="image/*"  type="file" />
       <PhotoCamera />
       </IconButton >  
       <div className={classes.errortext}>{error.picture}
</div>
</Grid>
       <Grid item xs={6}>
       <Avatar
        alt="productIcon"
        src={picture.file}
        style={{width:49,height:49}}
        variant="rounded"
       
       />

       </Grid>

      
         <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClick} fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
                                    </Grid>
                </Grid>  

            </div>
        </div>
    )
}