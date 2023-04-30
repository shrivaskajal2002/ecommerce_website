import { makeStyles } from "@mui/styles";
import { Routes,BrowserRouter as Router,Route} from "react-router-dom";

import DashboardInterface from "./administrator/adminLogin/DashboardInterface";
import Home from "./userinterface/screens/home";
import AdminLoginInterface from "./administrator/adminLogin/AdminLoginInterface";
import SoftDrinkInterface from "./userinterface2/softdrinkComponent/SoftDrinkInterface"
// import SoftDrinkItems from "./userinterface2/softdrinkcomponent2/SoftDrinkItems";

function App() {
  return (
    <div>

    <Router>
      <Routes>
        <Route element={<DashboardInterface/>}  path="/DashboardInterface/*" />
        <Route element={<Home />} path="/home/" />
        <Route element={<AdminLoginInterface />} path="/adminlogininterface" />
        <Route element={<SoftDrinkInterface />} path="/softdrinkinterface/*" />
        {/* <Route element={<SoftDrinkItems />} path="/softdrinkitems/*" /> */}


        

      </Routes>
    </Router>  
    </div>
  );
}

export default App;
