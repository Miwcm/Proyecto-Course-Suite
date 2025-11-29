import { BrowserRouter } from "react-router"
import Navbar from "./components/Navbar"
import Rutas from "./routes/Rutas"
import Footer from "./components/Footer"


const App = () => {
  return (
  <>
    <Navbar />
    <Rutas />
    <Footer />
  </>
  )
}



export default App