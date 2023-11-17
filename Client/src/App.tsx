import RoutesComponent from "./Router/Routes"
import FooterComponent from "./components/Footer/Footer"
import HeaderComponent from "./components/Header/Header"
import { AuthenticatedMovieProvider } from "./context/MovieContext"

function App() {
  return (
    <>
      <AuthenticatedMovieProvider>
        <HeaderComponent />    
          <RoutesComponent />
        <FooterComponent />
      </AuthenticatedMovieProvider>
    </>
  )
}

export default App
