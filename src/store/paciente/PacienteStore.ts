import axios from "axios";
import { toast } from "react-toastify";
import api_admin from "../../apiAdmin";

export class _PacienteStore {

  async consultaPacientes() {

    try {

      let resp = await toast.promise(api_admin.get("/pacientes/?&page=1"), {
        pending: 'Buscando pacientes...',
        error: 'Nehum resultado encontrado!'
      })

      if (resp.status == 200 && resp.data.length > 0) {

        return resp.data

      }

    } catch (e) { }

    return []

  }

  async excluirPaciente(id: string) {

    try {

      let resp = await toast.promise(api_admin.delete(`/paciente/${id}`), {
        pending: 'Excluindo paciente...',
        success: 'Paciente excluido com sucesso!',
        error: 'Não foi possível excluir o paciente!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async createPaciente(data: any) {

    try {

      let resp = await toast.promise(api_admin.post(`/paciente`, data), {
        pending: 'Criando paciente...',
        success: 'Paciente criado com sucesso!',
        error: 'Não foi possível criar o paciente!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async atualizarPaciente(id: string, data: any) {

    try {

      let resp = await toast.promise(api_admin.put(`/paciente/${id}`, data), {
        pending: 'Atualizando paciente...',
        success: 'Paciente atualizado com sucesso!',
        error: 'Não foi possível atualizar o paciente!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async createAcesso(data: any) {

    try {

      let resp = await toast.promise(api_admin.post(`/acesso`, data), {
        pending: 'Criando acesso...',
        success: 'Acesso criado com sucesso!',
        error: 'Não foi possível criar o acesso!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }

  async removeAcesso(id: string) {

    try {

      let resp = await toast.promise(api_admin.delete(`/acesso/${id}`), {
        pending: 'Excluindo acesso...',
        success: 'Acesso excluido com sucesso!',
        error: 'Não foi possível excluir o acesso!'
      })

      if (resp.status == 200) {

        return true

      }

    } catch (e) { }

    return false

  }


}

export const PacienteStore = new _PacienteStore();
