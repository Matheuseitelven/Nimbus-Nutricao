import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, TablePagination, Typography } from '@mui/material';
import { FormGroup, InputGroup, NumericInput, TextArea } from '@blueprintjs/core';
import { MuiTelInput } from 'mui-tel-input'
import { PacienteStore } from '../../store/paciente/PacienteStore';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  nome: string
  idade: string
  sexo: string
  observacao: string
  telefone: string
  email: string
  senha: string
}

const Paciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [paciente, setPaciente] = useState({
    _id: "",
    nome: "",
    observacao: "",
    idade: "",
    sexo: "",
    telefone: "",
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const handleClickOpenEdit = (row: Book) => {

    setPaciente(row)

    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenCreate = () => {
    setPaciente({
      _id: "",
      nome: "",
      observacao: "",
      idade: "",
      sexo: "",
      telefone: "+55",
      email: "",
      senha: "",
    })

    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreate = async () => {

    if(!paciente.nome) return toast.error("Campo nome obrigatório.");
    if(!paciente.idade) return toast.error("Campo idade obrigatório.");
    if(!paciente.observacao) return toast.error("Campo observação obrigatório.");
    if(!paciente.sexo) return toast.error("Campo sexo obrigatório.");
    if(!paciente.telefone) return toast.error("Campo telefone obrigatório.");

    const params = {
      nome: paciente.nome,
      idade: paciente.idade,
      observacao: paciente.observacao,
      sexo: paciente.sexo,
      telefone: paciente.telefone,
      email: paciente.email,
      senha: paciente.senha
    }

    setOpenCreate(false);

    let resp = await PacienteStore.createPaciente(params);

    if (resp) {

      let res = await PacienteStore.consultaPacientes();
      setPacientes(res);

    }

  };

  const handleEdit = async () => {

    if(!paciente.nome) return toast.warn("Campo nome obrigatório.");
    if(!paciente.idade) return toast.warn("Campo idade obrigatório.");
    if(!paciente.observacao) return toast.warn("Campo observação obrigatório.");
    if(!paciente.sexo) return toast.warn("Campo sexo obrigatório.");
    if(!paciente.telefone) return toast.warn("Campo telefone obrigatório.");

    const params = {
      nome: paciente.nome,
      idade: paciente.idade,
      observacao: paciente.observacao,
      sexo: paciente.sexo,
      telefone: paciente.telefone,
      email: paciente.email,
      senha: paciente.senha
    }

    setOpenEdit(false);

    let resp = await PacienteStore.atualizarPaciente(paciente._id, params);

    if (resp) {

      let res = await PacienteStore.consultaPacientes();
      setPacientes(res);

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

    let resp = await PacienteStore.consultaPacientes();

    setPacientes(resp);

  };

  useEffect(() => {

    fetchBooks();

  }, []);


  const excluirPaciente = async (id: string) => {

    let resp = await PacienteStore.excluirPaciente(id);

    if (resp) {

      const updatedBooks = pacientes.filter((paciente: Book) => paciente._id !== id);
      setPacientes(updatedBooks);

    }

  };

  const formatExcluir = (id: string) => {

    return <img style={{ cursor: "pointer" }} src='/images/bin.png' width={20} onClick={() => excluirPaciente(id)} />

  }

  const formatEdit = (row: Book) => {

    return <img style={{ cursor: "pointer" }} src='/images/editar.png' width={20} onClick={() => handleClickOpenEdit(row)} />

  }

  const handleChange = (value: any, name: string) => {
    setPaciente((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleCreateAcesso = async (row: Book) => {

    if(!paciente.email) return toast.error("Campo e-mail obrigatório.");
    if(!paciente.senha) return toast.error("Campo senha obrigatório.");

    const params = {
      paciente_id: row._id,
      email: paciente.email,
      senha: paciente.senha
    }

    await PacienteStore.createAcesso(params);

  };

  const handleRemoveAcesso = async (id: string) => {

    await PacienteStore.removeAcesso(id);

  };

  const formatAcesso = (row: Book) => {

    return (<>
      <img style={{ cursor: "pointer", marginRight: 20 }} src='/images/acess.png' width={20} onClick={() => handleCreateAcesso(row)} />
      <img style={{ cursor: "pointer" }} src='/images/bin.png' width={20} onClick={() => handleRemoveAcesso(row._id)} />
    </>)

  }

  const handleHistorico = (id: string) => {

    navigate(`/historicos/${id}`);

  }

  const formatHistoricos = (row: Book) => {

    return (<>
      <img style={{ cursor: "pointer", marginRight: 20 }} src='/images/history.png' width={20} onClick={() => handleHistorico(row._id)} />
    </>)

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
        Pacientes
      </Typography>

      <Button sx={{background: "#290244"}} onClick={() => handleClickOpenCreate()} variant="contained">Novo Cliente</Button>

      <br />
      <br />

      <TableContainer style={{ maxHeight: 600, width: '100%' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Idade</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Observação</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Acesso</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Históricos</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Editar</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Book) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.nome}</TableCell>
                <TableCell>{row.idade}</TableCell>
                <TableCell>{row.observacao}</TableCell>
                <TableCell align="center">{formatAcesso(row)}</TableCell>
                <TableCell align="center">{formatHistoricos(row)}</TableCell>
                <TableCell align="center">{formatEdit(row)}</TableCell>
                <TableCell align="center">{formatExcluir(row._id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pacientes.length}
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
        <DialogTitle><b>Novo Paciente</b></DialogTitle>

        <DialogContent>

          <FormGroup labelInfo="*" label="Nome" style={{ marginTop: 10 }}>
            <InputGroup onChange={(e) => handleChange(e.target.value, "nome")} value={paciente.nome} style={{ width: "100%" }} />
          </FormGroup>

          <FormGroup labelInfo="*" label="Idade" style={{ marginTop: 10, width: "20%", }}>
            <NumericInput
              buttonPosition='none'
              style={{ width: "100%" }}
              onValueChange={(_v: number, value: string) => handleChange(parseInt(value), "idade")}
              value={paciente.idade}
            />
          </FormGroup>

          <FormGroup labelInfo="*" label="Sexo">
            <RadioGroup row value={paciente.sexo} onChange={(e: any) => handleChange(e.target.value, "sexo")}>
              <FormControlLabel value="female" control={<Radio />} label="F" />
              <FormControlLabel value="male" control={<Radio />} label="M" />
            </RadioGroup>
          </FormGroup>

          <div style={{display: "flex"}}>
          
            <FormGroup labelInfo="*" label="Telefone" style={{ width: "33%", marginTop: 10, marginRight: 20 }}>
              <MuiTelInput value={paciente.telefone} onChange={(e) => handleChange(e, "telefone")} />
            </FormGroup>

            <FormGroup labelInfo="" label="E-mail" style={{ width: "33%", marginTop: 10, marginRight: 20 }}>
              <InputGroup placeholder="email@email.com" onChange={(e) => handleChange(e.target.value, "email")} value={paciente.email} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="" label="Senha" style={{ width: "33%", marginTop: 10 }}>
              <InputGroup placeholder="********" type="password" onChange={(e) => handleChange(e.target.value, "senha")} value={paciente.senha} style={{ width: "100%" }} />
            </FormGroup>
          
          </div>

          <FormGroup labelInfo="*" label="Observação" style={{ marginTop: 10 }}>
            <TextArea onChange={(e) => handleChange(e.target.value, "observacao")} value={paciente.observacao} style={{ width: "100%", height: 100 }} />
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
        <DialogTitle><b>Paciente</b></DialogTitle>

        <DialogContent>

          <FormGroup labelInfo="*" label="Nome" style={{ marginTop: 10 }}>
            <InputGroup onChange={(e) => handleChange(e.target.value, "nome")} value={paciente.nome} style={{ width: "100%" }} />
          </FormGroup>

          <FormGroup labelInfo="*" label="Idade" style={{ marginTop: 10, width: "20%", }}>
            <NumericInput
              buttonPosition='none'
              style={{ width: "100%" }}
              onValueChange={(_v: number, value: string) => handleChange(parseInt(value), "idade")}
              value={paciente.idade}
            />
          </FormGroup>

          <FormGroup labelInfo="*" label="Sexo">
            <RadioGroup row value={paciente.sexo} onChange={(e: any) => handleChange(e.target.value, "sexo")}>
              <FormControlLabel value="female" control={<Radio />} label="F" />
              <FormControlLabel value="male" control={<Radio />} label="M" />
            </RadioGroup>
          </FormGroup>

          <div style={{display: "flex"}}>
          
            <FormGroup labelInfo="*" label="Telefone" style={{ width: "33%", marginTop: 10, marginRight: 20 }}>
              <MuiTelInput className='input-telefone' value={paciente.telefone} onChange={(e) => handleChange(e, "telefone")} />
            </FormGroup>

            <FormGroup labelInfo="" label="E-mail" style={{ width: "33%", marginTop: 10, marginRight: 20 }}>
              <InputGroup placeholder="email@email.com" onChange={(e) => handleChange(e.target.value, "email")} value={paciente.email} style={{ width: "100%" }} />
            </FormGroup>

            <FormGroup labelInfo="" label="Senha" style={{ width: "33%", marginTop: 10 }}>
              <InputGroup placeholder="********" type="password" onChange={(e) => handleChange(e.target.value, "senha")} value={paciente.senha} style={{ width: "100%" }} />
            </FormGroup>
          
          </div>

          <FormGroup labelInfo="*" label="Observação" style={{ marginTop: 10 }}>
            <TextArea onChange={(e) => handleChange(e.target.value, "observacao")} value={paciente.observacao} style={{ width: "100%", height: 100 }} />
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

export default Paciente;
