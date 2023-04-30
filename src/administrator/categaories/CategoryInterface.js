import React, { useState } from "react";
import {
  FormControl,
  Select,
  Avatar,
  MenuItem,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postData } from "../services/fetchNodeServices";
import Swal from "sweetalert2";
import { useStyles } from "./categoryCss";
import  ViewListIcon  from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

export default function CategoryInterface() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "/images/cart.png", bytes: "" });
  const [error, setError] = useState({});

  const handlePicture = (event) => {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("icon", null);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!categoryName) {
      handleError("categoryName", "please input category name..");
      isValid = false;
      console.log(error);
    }

    if (!status) {
      handleError("status", "please enter status");
      isValid = false;
      handleError("icon", null);
    }

    if (!icon.bytes) {
      handleError("icon", "please select image");
      isValid = false;
    }

    return isValid;
  };

  const handleClick = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("status", status);
      formData.append("icon", icon.bytes);

      var result = await postData("category/categorysubmit", formData);
      console.log(error);
      console.log(result);

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
  };

    //  HANDLE RESET BUTTON 

    const handleReset=()=>{
      // navigate('/DashboardInterface')
      setStatus("")
      setCategoryName("")
      setIcon("")
     
    }
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{display:'flex',justifyContent:'space-between' }}>
            <div className={classes.heading}>Add New Category</div>
            <div>
            <ViewListIcon onClick={(event)=> navigate("/dashboardinterface/DisplayAllcategory")}/>
            </div>
          </Grid>
          <Grid item xs={12} margin="8px">
            <TextField
              error={error.categoryName ? true : false}
              helperText={error.categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              onFocus={() => handleError("categoryName", null)}
              label="Category Name"
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

          {/* <Grid> */}
          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <Avatar
              alt="Category Icon"
              src={icon.file}
              style={{ width: 49, height: 49 }}
              variant="rounded"
            />
          </Grid>

          {/* // </Grid> */}
          <Grid item xs={6} margin="7px">
            <Button variant="contained" fullWidth onClick={handleClick}>
            
              Submit
            </Button>
          </Grid>
          <Grid item xs={5} margin="7px">
          <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
