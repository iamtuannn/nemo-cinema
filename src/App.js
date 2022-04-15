import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ModalVideoPlayTrailer from "./components/ModalVideo/ModalVideo";
import Admin from "./routers/Admin";
import Home from "./routers/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
      <Footer/>
      <ModalVideoPlayTrailer/>
    </BrowserRouter>
  );
}

export default App;
