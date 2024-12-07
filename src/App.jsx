import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";  
import Contact from "./Routes/Contact";
import Detail from "./Routes/Detail";
import Favs from "./Routes/Favs";
import { ContextProvider } from "./Components/utils/global.context";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ContextProvider>
        <BrowserRouter>
          <Navbar/>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/dentist/:id" element={<Detail/>} />
              <Route path="/favs" element={<Favs/>} />
            </Routes>
          </main>
          <Footer/>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;