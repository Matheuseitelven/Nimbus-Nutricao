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

      if (resp.status == 200 && resp.data) {

          resp.data.logged = true

          let token = resp.data

          cookies.set('nutri-t-L', token, { path: '/' });

          if(resp.data.admin){

            window.location.href = "/consultas"

          } else {

            window.location.href = "/historicos"

          }

      } else {
        
        toast.error("E-mail ou senha inválida!")

      }

    } catch (e) { }


  }

}

export const LoginStore = new _LoginStore();
