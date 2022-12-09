import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ContextProvider } from "./context/Context"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
/** 
 * ===== ARCHIVO PRINCIPAL ====
 * AQUI SE ENCUENTRAN EL FRAGMENT PRINCIPAL QUE CARGA TODA LA APLICACION
 * TAMBIEN AQUI SE ENCUENTRA NUESTRO CONTEXTO PARA QUE SEA GLOBAL 
 * Y SE PUEDA UTILIZAR EN CUALQUIER PARTE DE NUESTRA APLICACION WEB
*/
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)
