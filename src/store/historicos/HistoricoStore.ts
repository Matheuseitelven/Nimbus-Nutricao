import axios from "axios";
import { toast } from "react-toastify";

export class _HistoricoStore {

  async consultaHistoricos(id: string) {

    try {

      let resp = await toast.promise(axios.get(`http://localhost:3001/api/historicos/${id}`), {
        pending: 'Buscando históricos...',
        error: 'Nehum resultado encontrado!'
      })

      if (resp.status == 200 && resp.data.length > 0) {

        return resp.data

      }

    } catch (e) { }

    return []

  }

}

export const HistoricoStore = new _HistoricoStore();
