import axios from "axios";
import { toast } from "react-toastify";
import api_admin from "../../apiAdmin";

export class _ConsultaStore {

  async consultaConsultas() {

    try {

      let resp = await toast.promise(api_admin.get("/consultas/?&page=1"), {
        pending: 'Buscando consultas...',
        error: 'Nehum resultado encontrado!'
      })

      if (resp.status == 200 && resp.data.length > 0) {

        return resp.data

      }

    } catch (e) { }

    return []

  }

  async excluirConsulta(id: string) {

    try {

      let resp = await toast.promise(api_admin.delete(`/consulta/${id}`), {
        pending: 'Excluindo consulta...',
        success: 'Consulta excluido com sucesso!',
        error: 'Não foi possível excluir o consulta!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async createConsulta(data: any) {

    try {

      let resp = await toast.promise(api_admin.post(`/consulta`, data), {
        pending: 'Criando consulta...',
        success: 'Consulta criada com sucesso!',
        error: 'Não foi possível criar a consulta!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async atualizarConsulta(id: string, data: any) {

    try {

      let resp = await toast.promise(api_admin.put(`/consulta/${id}`, data), {
        pending: 'Atualizando consulta...',
        success: 'Consulta atualizado com sucesso!',
        error: 'Não foi possível atualizar a consulta!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }


}

export const ConsultaStore = new _ConsultaStore();
