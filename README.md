Olá,

Primeiro passo, instalar o mysql, o link para a instalação está abaixo:
https://dev.mysql.com/downloads/installer/
![image](https://github.com/user-attachments/assets/1efcc864-e47e-45ec-aae4-e1fac2745da5).

No vs code instalar extensão do Mysql conforme abaixo:
![image](https://github.com/user-attachments/assets/ec398aaa-6785-45da-8ec4-2f14c5e4cfcf)

Na extensão configurar a conexão realizada na instalação do Mysql. Na situação foi colocado a senha 123456789.

![image](https://github.com/user-attachments/assets/512e35a2-7644-458e-ae83-7f6ea6020748)

Criar database: db_nimbus

Na pasta Nimbus-nutricao -> npm install
Na pasta Nimbus-Nutricao\sequelize-api -> npm install
Ainda na pasta Nimbus-Nutricao\sequelize-api -> excutar no terminal rodar as migrations -> npx sequelize-cli db:migrate
E ainda na pasta Nimbus-Nutricao\sequelize-api -> executar no terminal rodar as seeders -> npx sequelize-cli db:seed:all


