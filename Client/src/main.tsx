import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId } = import.meta.env;
const redirectUri = window.location.origin

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider 
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri
                }}>
            <App />
        </Auth0Provider>
    </BrowserRouter>
)
