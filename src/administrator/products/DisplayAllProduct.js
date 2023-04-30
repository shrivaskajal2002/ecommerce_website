import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Swal from "sweetalert2";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getData, postData, serverURL } from "../services/fetchNodeServices";
import {Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  TextField,
  Avatar,
  Button,
  formControlClasses,
} from "@mui/material";
import { useStyles } from "./ProductCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProducts() {
  const classes = useStyles();
  const navigate=useNavigate()

  const [subcategoryList, setSubcategoryList] = useState([]);
  const [open,setOpen] = useState(false);

  const [subcategoryId, setSubcategoryId] = useState("");
  const[products,setProducts]=useState("")
  const[description,setDescription]=useState("")
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState({ file:"/images/cart.png", bytes: "" });
  const [error, setError] = useState({});
  const[categoryId, setCategoryId]= useState("")
  const[editBtnStatus, setEditBtnStatus]=useState(false)
  const[oldPicture,setOldPicture]=useState('');

  //  =------------edit dialog==-----------------

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    handleError("picture", null);
    setEditBtnStatus(true)
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  }

  const validation = () => {
    var isValid = true;
    if (!categoryId) {
      handleError("categoryId", "please input category ..");
      isValid = false;
      console.log(error);
    }

    if (!subcategoryId) {
      handleError("subcategoryId", "please input Subcategory ..");
      isValid = false;
      console.log(error);
    }

    if (!products) {
        handleError("products", "please input products ..");
        isValid = false;
        console.log(error);
      }
  
    if (!status) {
      handleError("status", "please enter status");
      isValid = false;
      handleError("picture", null);
    }

    if (!picture.bytes) {
      handleError("picture", "please select image");
      isValid = false;
    }

    return isValid;
   };

  //  for edit data
  const handleEditData = async () => {
    if (validation()) {
      var body={categoryid:categoryId,subcategoryId:subcategoryId,products:products,status:status}

      var result = await postData("products/products_edit_data", body);
      console.log(error);
      console.log(result);

      setOpen(false)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: true,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    {fetchSubcategoryList()}
  };

  
// delete data

const handleDeleteData = async () => {

  setOpen(false)
    var body={categoryid:categoryId}
  
    var result = await postData("products/products_delete_data", body);
    console.log(error);
    console.log(result);
  
    setOpen(false)
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: true,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  
  
  
  {fetchSubcategoryList()}
  }


  // For getting the data

  const fetchSubcategoryList = async () => {
    var result = await getData("products/productsItems");
    setSubcategoryList(result.data);
  };

const handleCancel=()=>{

setPicture({file:`${serverURL}/images/${oldPicture}`,bytes:''})
setEditBtnStatus(false)
}

// for edit icon
const handleEditIcon=async()=>{
  setEditBtnStatus(false)
  setOpen(false)
 var formData= new FormData()
 formData.append('categoryid',categoryId)
 formData.append('subcategoryid',subcategoryId)
 formData.append('picture',picture.bytes)
 var result =  await postData('products/products_edit_picture',formData)


 if (result.status) {
  alert("kkmk")
  Swal.fire({
    icon: "success",
    title: result.message,
    showConfirmButton: true,
    timer: 1500,
  });
} else {
  Swal.fire({
    icon: "error",
    title: result.message,
    showConfirmButton: false,
    timer: 1500,
  });
}
}

  //  For display data table


  function showCategory() {
    return (
      <MaterialTable
        title="Products"
        columns={[
          { title: "Product ID", field: "productid" },

          { title: "Category", field: "categoryid" },
          { title: "SubCategory ", field: "subcategoryid" },
          { title: "Products ", field: "productname" },
          { title: "Status", field: "status" },
          {
            title: "picture",
            field: "picture",
            render: (rowData) => (
              <Avatar
                src={`${serverURL}/images/${rowData.picture}`}
                style={{ width: 75 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={subcategoryList}
        actions={[
          {
            icon: EditIcon,
            tooltip: 'Edit Data',
            onClick:((event,rowData)=>handleOpen(rowData)),
          },
          {
          icon: Add,
          tooltip:  "Add category" ,
          isFreeAction:true,
          onClick:(event)=> navigate("/dashboardInterface/ProductInterface")
          }
        ]}
      />
    );
  }

  



  // =============edit dialog box=========

  const showEditCategoryForm = () => {
    return (
      
        <div className={classes.editBox}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.heading}>Edit Products</div>
            </Grid>

           
            <Grid item xs={5} margin="8px">
              <TextField
                error={error.categoryId ? true : false}
                helperText={error.categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                onFocus={() => handleError("categoryId", null)}
                label=" Category Id"
                value={categoryId}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5} margin="8px">
              <TextField
                error={error.subcategoryId ? true : false}
                helperText={error.subcategoryId}
                onChange={(event) => setSubcategoryId(event.target.value)}
                onFocus={() => handleError("subcategoryId", null)}
                label="Sub Category Id"
                value={subcategoryId}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={5} margin="8px">
              <TextField
                error={error.products ? true : false}
                helperText={error.products}
                onChange={(event) => setProducts(event.target.value)}
                onFocus={() => handleError("products", null)}
                label="products "
                value={products}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={5} margin="8px">
              <TextField
                error={error.description? true : false}
                helperText={error.description}
                onChange={(event) => setDescription(event.target.value)}
                onFocus={() => handleError("description", null)}
                label="Description"
                value={description}
                variant="outlined"
                fullWidth
              />
            </Grid>

           
            <Grid item xs={12} margin="8px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={(event) => setStatus(event.target.value)}
                  onFocus={() => handleError("status", null)}
                  error={error.status ? true : false}
                >
                  <MenuItem value="-select status">--Select status</MenuItem>
                  <MenuItem value="trending">Trending</MenuItem>
                  <MenuItem value="popular">Popular</MenuItem>
                  <MenuItem value="continue">continue</MenuItem>
                  <MenuItem value="discontinue">Discontinue</MenuItem>
                </Select>
              </FormControl>
              <div className={classes.errorText}>{error.status}</div>
            </Grid>

            <Grid item xs={4}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  onChange={handlePicture}
                  accept="image/*"
                  type="file"
                />
                <PhotoCamera />
              </IconButton>

              <div className={classes.errorText}>{error.icon}</div>
            </Grid>

            <Grid item xs={4}>
              <Avatar
                alt="Category Icon"
                src={picture.file}
                style={{ width: 49, height: 49 }}
                variant="rounded"
              />
            </Grid>
            <Grid item xs={4}>
            {editBtnStatus?<>
              <Button onClick={handleEditIcon}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              </>:<></>}
            </Grid>

            <Grid item xs={6} margin="7px">
              <Button variant="contained" fullWidth onClick={handleEditData}>
              Edit
              </Button>
            </Grid>
            <Grid item xs={5} margin="7px">
              <Button variant="contained" fullWidth onClick={handleDeleteData}>
             Delete
              </Button>
            </Grid>
          </Grid>
        
      </div>
    );
  };

  useEffect(function () {
    fetchSubcategoryList();
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubcategoryId(rowData.subcategoryid)
    setProducts(rowData.products)
    setDescription(rowData.description)
    setStatus(rowData.status)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    setOldPicture(rowData.picture)
    setOpen(true);
  };

  const displayCategoryDialog = () => {
    return (
      <Dialog
       open={open}
      onClose={handleClose}
      >
        
       
        <DialogContent>{showEditCategoryForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancle</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className={classes.displayContainer}>
    <div className={classes.displayBox}>
      {showCategory()}
        </div>

        {displayCategoryDialog()}
    </div>
  );
}
