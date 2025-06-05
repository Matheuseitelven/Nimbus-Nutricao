import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination, Typography } from '@mui/material';
import { FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from '@mui/x-date-pickers/locales';
import moment from 'moment';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { HistoricoStore } from '../../store/historicos/HistoricoStore';
import { PacienteStore } from '../../store/paciente/PacienteStore';

const dayjs = require('dayjs')

interface Book {
  _id: string;
  nome: string
  data_consulta: Date
  dieta: string
  finalizada: boolean
  peso: string
  altura: string
  imc: string
  paciente_id: string
}

const HistoricosAdmin = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [consulta, setConsulta] = useState({
    _id: "",
    nome: "",
    dieta: "",
    data_consulta: dayjs(new Date()),
    finalizada: false,
    peso: "",
    altura: "",
    imc: "",
    paciente_id: ""
  });

  const handleClickOpenEdit = (row: Book) => {

    row.data_consulta = dayjs(row.data_consulta)

    setConsulta(row)

    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchHistoricos = async () => {

    const id = window.location.pathname.split("/")[2]

    if(!id){
      return 
    }

    let resp = await HistoricoStore.consultaHistoricos(id);

    setConsultas(resp);

  };

  useEffect(() => {

    fetchHistoricos();
    fetchBooks();

  }, []);

  const fetchBooks = async () => {

    let resp = await PacienteStore.consultaPacientes();

    setPacientes(resp);

  };

  const formatEdit = (row: Book) => {

    return <img style={{ cursor: "pointer" }} src='/images/view.png' width={20} onClick={() => handleClickOpenEdit(row)} />

  }

  const formatterPaciente = (id: string) => {
  
    let paciente: any = pacientes.find((value: any) => value._id == id)
  
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
          textDecoration: 'none',
          marginTop: 15,
          marginBottom: 5,
          color: "#653289"
        }}
      >
        Histórico de Consultas
      </Typography>

      <br />
      <br />

      <TableContainer style={{ maxHeight: 600, width: '100%' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Paciente</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Data</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Book) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{formatterPaciente(row.paciente_id)}</TableCell>
                <TableCell>{moment(row.data_consulta).format("DD/MM/YYYY HH:mm")}</TableCell>
                <TableCell>{row.finalizada ? "Finalizada" : "Pendente"}</TableCell>
                <TableCell align="center">{formatEdit(row)}</TableCell>
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
        open={openEdit}
        onClose={handleCloseEdit}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle><b>Consulta</b></DialogTitle>

        <DialogContent>

          {/* Select com a consulta dos pacientes */}
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
                disabled
              />
            </LocalizationProvider>
          </FormGroup>

          <div style={{display: "flex", width: "100%"}}>

            <FormGroup labelInfo="*" label="Peso" style={{ width: "33%", marginTop: 10, marginRight: 20}}>
              <InputGroup disabled step="0.1" placeholder="Ex: 70.5" value={consulta.peso} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="*" label="Altura" style={{ width: "33%", marginTop: 10, marginRight: 20}}>
              <InputGroup disabled step="0.1" placeholder="Ex: 1.75" value={consulta.altura} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="" label="IMC" style={{ width: "33%", marginTop: 10 }}>
              <InputGroup disabled value={consulta.imc} style={{ width: "100%" }} />
            </FormGroup>

          </div>

          <FormGroup labelInfo="" label="Dieta" style={{ marginTop: 10 }}>
            <TextArea disabled value={consulta.dieta} style={{ width: "100%", height: 100 }} />
          </FormGroup>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEdit}>Fechar</Button>
        </DialogActions>

      </Dialog>

    </div>
  );
};

export default HistoricosAdmin;
