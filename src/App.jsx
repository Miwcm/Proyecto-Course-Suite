import { BrowserRouter } from "react-router"
import Navbar from "./components/Navbar"
import Rutas from "./routes/Rutas"


const App = () => {
  return (
  < BrowserRouter>
    <Navbar />
    <Rutas></Rutas>
  </BrowserRouter>
  )
}



export default App