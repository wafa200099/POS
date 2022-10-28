import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";
import ProductCatagories from './pages/ProductCatagories'
import ProductsPage from "./pages/ProductsPage";


function App({categories}) {
  return (
<Router>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/pos" element={<POSPage/>}/>
  <Route path="/productspage" element={<ProductsPage categories={categories}/>}/>
  <Route path="/productcatagories" element={<ProductCatagories/>}/>
</Routes>

</Router>
  );
}

export default App;
