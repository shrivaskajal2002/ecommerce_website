import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Swal from "sweetalert2";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getData, postData, serverURL } from "../services/fetchNodeServices";
import {
  Grid,
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
import { useStyles } from "./categoryCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategories() {
  const classes = useStyles();
  const navigate= useNavigate()

  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "/images/cart.png", bytes: "" });
  const [error, setError] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [editBtnStatus, setEditBtnStatus] = useState(false);
  const [oldIcon, setOldIcon] = useState("");

  //  =------------edit dialog==-----------------

  const handlePicture = (event) => {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("icon", null);
    setEditBtnStatus(true);
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

    //   if (!icon.bytes) {
    //     handleError("icon", "please select image");
    //     isValid = false;
    //   }

    return isValid;
  };

  //  for edit data
  const handleEditData = async () => {
    if (validation()) {
      var body = {
        categoryid: categoryId,
        categoryName: categoryName,
        status: status,
      };

      var result = await postData("category/category_edit_data", body);
      console.log(error);
      console.log(result);

      setOpen(false);
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

    {
      fetchCategoryList();
    }
  };

  // delete data

  const handleDeleteData = async () => {
    setOpen(false);
    var body = { categoryid: categoryId };

    var result = await postData("category/category_delete_data", body);
    console.log(error);
    console.log(result);

    setOpen(false);
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

    {
      fetchCategoryList();
    }
  };

  // For getting the data

  const fetchCategoryList = async () => {
    var result = await getData("category/category_list");
    setCategoryList(result.data);
  };

  const handleCancel = () => {
    setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: "" });
    setEditBtnStatus(false);
  };

  // for edit icon
  const handleEditIcon = async () => {
    setEditBtnStatus(false);
    setOpen(false);
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("icon", icon.bytes);
    var result = await postData("category/category_edit_icon", formData);

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
  };

  //  For display data table

  function showCategory() {
    return (
      <MaterialTable
        title="Category table"
        columns={[
          { title: "Category ID", field: "categoryid" },
          { title: "Category Name", field: "categoryname" },
          { title: "Status", field: "status" },
          {
            title: "icon",
            field: "icon",
            render: (rowData) => (
              <Avatar
                src={`${serverURL}/images/${rowData.icon}`}
                style={{ width: 75 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={categoryList}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit Data",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
          icon: Add,
          tooltip:  "Add category" ,
          isFreeAction:true,
          onClick:(event)=> navigate("/dashboardInterface/CategoryInterface")
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
            <div className={classes.heading}>Edit Category</div>
          </Grid>
          <Grid item xs={12} margin="8px">
            <TextField
              error={error.categoryName ? true : false}
              helperText={error.categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              onFocus={() => handleError("categoryName", null)}
              label="Category Name"
              value={categoryName}
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
              src={icon.file}
              style={{ width: 49, height: 49 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={4}>
            {editBtnStatus ? (
              <>
                <Button onClick={handleEditIcon}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </>
            ) : (
              <></>
            )}
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
    fetchCategoryList();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid);
    setCategoryName(rowData.categoryname);
    setStatus(rowData.status);
    setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: "" });
    setOldIcon(rowData.icon);
    setOpen(true);
  };

  const displayCategoryDialog = () => {
    return (
      <Dialog open={open} onclose={handleClose}>
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
