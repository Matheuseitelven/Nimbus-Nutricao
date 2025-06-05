import { FormGroup, InputGroup } from '@blueprintjs/core';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { LoginStore } from '../../store/login/LoginStore';
import { toast } from 'react-toastify';

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    senha: "",
  });

  const handleAcessar = async () => {

    if(!login.senha) return toast.warn("Campo senha obrigatório.");
    if(!login.email) return toast.warn("Campo e-mail obrigatório.");

    await LoginStore.handleLogin(login.senha, login.email)

  };

  const handleChange = (value: any, name: string) => {
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        textAlign: 'left'
      }}
    >
      <div>

        <IconButton style={{marginTop: 60}}>
          <img src="/images/logo.png" width={180} height={180}/>
        </IconButton>

        <FormGroup labelInfo="*" label="E-mail" style={{ marginTop: 10}}>
          <InputGroup placeholder="email@email.com" onChange={(e) => handleChange(e.target.value, "email")} value={login.email} style={{ width: "100%" }} />
        </FormGroup>

        <FormGroup labelInfo="*" label="Senha" style={{ marginTop: 20 }}>
          <InputGroup placeholder="********" type="password" onChange={(e) => handleChange(e.target.value, "senha")} value={login.senha} style={{ width: "100%" }} />
        </FormGroup>

        <br/>

        <div style={{textAlign: "center"}}>
          <Button sx={{background: "#290244"}} onClick={handleAcessar} variant="contained">Acessar</Button>
        </div>

      </div>
    </div>
  );
};

export default Login;

