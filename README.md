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



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
