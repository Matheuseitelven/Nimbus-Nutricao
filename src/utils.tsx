import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const isAdmin = () => {

    try {
        var decoded = cookies.get('nutri-t-L');

        return decoded.admin

    } catch (err) {

        return false
    }

}

export const isLogged = () => {

    try {
        var decoded = cookies.get('nutri-t-L');

        return decoded.logged

    } catch (err) {

        return false
    }

}

export const isPacienteId = () => {

    try {
        var decoded = cookies.get('nutri-t-L');

        return decoded.paciente_id

    } catch (err) {

        return null
    }

}