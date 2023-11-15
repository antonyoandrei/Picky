import RoutesComponent from "./Router/Routes"
import FooterComponent from "./components/Footer/Footer"
import HeaderComponent from "./components/Header/Header"
import { MovieProvider } from "./context/MovieContext"

function App() {
  return (
    <>
      <MovieProvider>
        <HeaderComponent />    
          <RoutesComponent />
        <FooterComponent />
      </MovieProvider>
    </>
  )
}

export default App
