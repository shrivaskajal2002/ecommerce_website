import { makeStyles } from "@mui/styles";
import { padding } from "@mui/system";

export const useStyles = makeStyles({
  category: {
    width: "94%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
  },
  categoryheading: {
    width: "86",
    fontFamily: "sans-serif",
    // fontWeight:'bold',
    fontSize: "22px",
    // padding: "2%",
  },
  bannericon: {
    display: "flex",
  },
  items: {
    textAlign: "center",
    width: "80%",
    margin: "7px",
    fontSize: "18px",
  },
  product: {
    margin: "6%",
    padding: "9%",
    background: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column'
  },
  productName: {
    // textAlign: "center",
    width: "80%",
    margin: 7,
    fontSize: "18px",
    paddingTop:'17%'
  },


  productweight: {
    width: "80%",
    margin: 7,
    fontSize: "13px",
    paddingTop:'4%'
  },

  productprice: {
    width: "100%",
    fontSize: "15px",
    paddingTop:'2%'

  },

  r:{    width: "100%",

    display:'flex',
    flexDirection:'row',
    paddingLeft:'3%',
    justifyContent:'space-between'

  },

  c:{ width: "100%",
    display:'flex',
    flexDirection:'column',


  },
  btn:{
    marginLeft:'45%'
  }
});
