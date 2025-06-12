import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class _LoginStore {

  async handleLogin(senha: string, email: string) {

    try {

      const params = {
        senha: senha,
        email: email
      }

      let resp = await toast.promise(axios.post(`http://localhost:3001/api/login`, params), {})

      if (resp.data.ok) {

          resp.data.logged = true

          cookies.set('nutri-t-L', {user: resp.data.user, admin: resp.data.admin, paciente_id: resp.data.id, logged: true }, { path: '/' });

          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('tokenAdmin', resp.data.tokenAdmin);

          if(resp.data.admin){

            window.location.href = "/consultas"

          } else {

            window.location.href = "/historicos"

          }

      } else {
        
        toast.error(resp.data.error)

      }

    } catch (e) { }


  }

}

export const LoginStore = new _LoginStore();
