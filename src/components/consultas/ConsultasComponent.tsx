import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Switch, TablePagination, Typography } from '@mui/material';
import { FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment from 'moment';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { ConsultaStore } from '../../store/consultas/ConsultaStore';
import { PacienteStore } from '../../store/paciente/PacienteStore';
import { toast } from 'react-toastify';

const dayjs = require('dayjs')

interface Book {
  id: string;
  paciente_id: string
  data_consulta: Date
  dieta: string
  finalizada: boolean
  peso: string
  altura: string
  imc: string

}

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [consulta, setConsulta] = useState({
    id: "",
    paciente_id: "",
    dieta: "",
    data_consulta: dayjs(new Date()),
    finalizada: false,
    peso: "",
    altura: "",
    imc: ""
  });

  const handleClickOpenEdit = (row: Book) => {

    row.data_consulta = dayjs(row.data_consulta)

    setConsulta(row)

    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenCreate = () => {

    setConsulta({
      id: "",
      paciente_id: "",
      dieta: "",
      finalizada: false,
      data_consulta: dayjs(new Date()),
      peso: "",
      altura: "",
      imc: ""
    })

    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreate = async () => {

    if(!consulta.data_consulta) return toast.warn("Campo data consulta obrigatório.");
    if(!consulta.paciente_id) return toast.warn("Campo paciente obrigatório.");

    const params = {
      paciente_id: consulta.paciente_id,
      data_consulta: consulta.data_consulta,
      dieta: consulta.dieta,
      finalizada: false,
      peso: "",
      altura: "",
      imc: ""
    }

    setOpenCreate(false);

    let resp = await ConsultaStore.createConsulta(params);

    if (resp) {

      let res = await ConsultaStore.consultaConsultas();
      setConsultas(res);

    }

  };

  const handleEdit = async () => {

    if(!consulta.data_consulta) return toast.warn("Campo data consulta obrigatório.");
    if(!consulta.paciente_id) return toast.warn("Campo paciente obrigatório.");
    if(!consulta.peso) return toast.warn("Campo peso obrigatório.");
    if(!consulta.altura) return toast.warn("Campo altura obrigatório.");

    const params = {
      paciente_id: consulta.paciente_id,
      dieta: consulta.dieta,
      finalizada: consulta.finalizada,
      data_consulta: consulta.data_consulta,
      peso: consulta.peso,
      altura: consulta.altura,
      imc: consulta.imc
    }

    setOpenEdit(false);

    let resp = await ConsultaStore.atualizarConsulta(consulta.id, params);

    if (resp) {

      let res = await ConsultaStore.consultaConsultas();
      setConsultas(res);

    }

  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchBooks = async () => {

    let resp = await ConsultaStore.consultaConsultas();

    setConsultas(resp);

  };

  const fetchPacientes = async () => {

    let resp = await PacienteStore.consultaPacientes();

    setPacientes(resp);

  };

  useEffect(() => {

    fetchBooks();
    fetchPacientes();

  }, []);


  const excluirLivro = async (id: string) => {

    let resp = await ConsultaStore.excluirConsulta(id);

    if (resp) {

      const updatedBooks = consultas.filter((consulta: Book) => consulta.id !== id);
      setConsultas(updatedBooks);

    }

  };

  const formatExcluir = (id: string) => {

    return <img style={{ cursor: "pointer" }} src='/images/bin.png' width={20} onClick={() => excluirLivro(id)} />

  }

  const formatEdit = (row: Book) => {

    return <img style={{ cursor: "pointer" }} src='/images/editar.png' width={20} onClick={() => handleClickOpenEdit(row)} />

  }

  const handleChange = (value: any, name: string) => {
    setConsulta((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const calcularIMC = () => {
    const alturaNum = parseFloat(consulta.altura);
    const pesoNum = parseFloat(consulta.peso);

    if (!isNaN(alturaNum) && !isNaN(pesoNum) && alturaNum > 0) {
      const imcCalculado = pesoNum / (alturaNum * alturaNum);
      handleChange(imcCalculado.toFixed(2), "imc");
    } else {
      handleChange(null, "imc");
    }

  };

  const getOptions = () => {
    
    let produtoOptions: any = [];

    produtoOptions = pacientes?.map((value: any) => {
      return <MenuItem key={value.id} value={value.id}>{value.nome}</MenuItem>
    });

    return produtoOptions

  }

  const formatterPaciente = (id: string) => {
  
    let paciente: any = pacientes.find((value: any) => value.id == id)
  
    if(!paciente){
      return ""
    }

    return paciente.nome

  }

  return (
    <div>

      <Typography
        variant="h5"
        component="a"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: "#653289",
          textDecoration: 'none',
          marginTop: 15,
          marginBottom: 5
        }}
      >
        Consultas
      </Typography>

      <Button sx={{background: "#290244"}} onClick={() => handleClickOpenCreate()} variant="contained">Nova Consulta</Button>

      <br />
      <br />

      <TableContainer style={{ maxHeight: 600, width: '100%' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Paciente</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Descrição</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Data</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Editar</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Book) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{formatterPaciente(row.paciente_id)}</TableCell>
                <TableCell>{row.dieta}</TableCell>
                <TableCell>{moment(row.data_consulta).format("DD/MM/YYYY HH:mm")}</TableCell>
                <TableCell>{row.finalizada ? "Finalizada" : "Pendente"}</TableCell>
                <TableCell align="center">{formatEdit(row)}</TableCell>
                <TableCell align="center">{formatExcluir(row.id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={consultas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={openCreate}
        onClose={handleCloseCreate}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle><b>Nova Consulta</b></DialogTitle>

        <DialogContent>

          <FormGroup labelInfo="*" label="Nome" style={{ marginTop: 10 }}>
            <Select
              onChange={(e) => handleChange(e.target.value, "paciente_id")}
              value={consulta.paciente_id}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Selecione um paciente...</MenuItem>
              {getOptions()}
            </Select>

          </FormGroup>

          <FormGroup labelInfo="*" label="Data Consulta" style={{ marginTop: 10 }}>
            <LocalizationProvider
              localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
              dateAdapter={AdapterDayjs}>
              <DateTimePicker
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={consulta.data_consulta}
                format='DD/MM/YYYY HH:mm'
                onChange={(value) => handleChange(value, "data_consulta")}
              />
            </LocalizationProvider>
          </FormGroup>

        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleCloseCreate}>Cancelar</Button>
          <Button onClick={handleCreate}>Criar</Button>
        </DialogActions>

      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle><b>Consulta</b></DialogTitle>

        <DialogContent>

          <FormGroup labelInfo="*" label="Nome" style={{ marginTop: 10 }}>
            <InputGroup disabled value={formatterPaciente(consulta.paciente_id)} style={{ width: "100%" }} />
          </FormGroup>

          <FormGroup labelInfo="*" label="Data Consulta" style={{ marginTop: 10 }}>
            <LocalizationProvider
              localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
              dateAdapter={AdapterDayjs}>
              <DateTimePicker
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={consulta.data_consulta}
                format='DD/MM/YYYY HH:mm'
                onChange={(value) => handleChange(value, "data_consulta")}
              />
            </LocalizationProvider>
          </FormGroup>

          <div style={{display: "flex", width: "100%"}}>

            <FormGroup labelInfo="*" label="Peso" style={{ width: "33%", marginTop: 10, marginRight: 20}}>
              <InputGroup step="0.1" placeholder="Ex: 70.5" onChange={(e) => {handleChange(e.target.value, "peso"); calcularIMC();}} value={consulta.peso} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="*" label="Altura" style={{ width: "33%", marginTop: 10, marginRight: 20}}>
              <InputGroup step="0.1" placeholder="Ex: 1.75" onChange={(e) => {handleChange(e.target.value, "altura"); calcularIMC();}} value={consulta.altura} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="" label="IMC" style={{ width: "33%", marginTop: 10 }}>
              <InputGroup disabled value={consulta.imc} style={{ width: "100%" }} />
            </FormGroup>

          </div>

          <FormGroup labelInfo="" label="Dieta" style={{ marginTop: 10 }}>
            <TextArea onChange={(e) => handleChange(e.target.value, "dieta")} value={consulta.dieta} style={{ width: "100%", height: 100 }} />
          </FormGroup>

          <FormGroup labelInfo="" label="Finalizar Consulta" style={{ marginTop: 10 }}>
            <Switch checked={consulta.finalizada} onChange={(e) => handleChange(e.target.checked, "finalizada")} />
          </FormGroup>

        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleEdit}>Salvar</Button>
        </DialogActions>

      </Dialog>

    </div>
  );
};

export default Consultas;
