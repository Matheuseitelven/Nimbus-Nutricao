import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ResponsiveAppBar from "./components/navbar/Navbar";
import Login from "./components/login/LoginComponent";
import 'react-toastify/dist/ReactToastify.css';
import Paciente from "./components/pacientes/PacienteComponent";
import Consultas from "./components/consultas/ConsultasComponent";
import Historicos from "./components/historicos/HistoricosComponent";
import { isAdmin, isLogged } from "./utils";
import HistoricosAdmin from "./components/historicos/HistoricosComponentAdmin";

require("./assets/css/index.css")

function App() {
  
  const rotas = ["pacientes", "consultas", "historicos"];
  
  const path = window.location.pathname;

  return (
    <div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        style={{ fontSize: 12 }}
      />

      <BrowserRouter>

        {rotas.some(r => path.includes(r)) && <ResponsiveAppBar />}
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {isLogged() &&
          <>

            {isAdmin() ? 
            <>
              <Route path="/pacientes" element={<Paciente />} />
              <Route path="/consultas" element={<Consultas />} />
              <Route path="/historicos/:id" element={<HistoricosAdmin />} />
            </>
            :
            <Route path="/historicos" element={<Historicos />} />
          }

          </>}

        </Routes>
      </BrowserRouter>

    </div>

  );

}

export default App;
