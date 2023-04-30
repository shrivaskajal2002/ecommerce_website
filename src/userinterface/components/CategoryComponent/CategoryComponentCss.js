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
    padding: "2%",
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
  popularCategory: {
    margin: "6%",
    padding: "4%",
    background: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popularCategoryName: {
    textAlign: "center",
    width: "80%",
    margin: 7,
    fontSize: "20px",
  },
});
