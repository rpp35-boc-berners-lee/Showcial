# Skeleton Template App

Repository template with custom webpack, TypeScript, Prettier, Jest, Cypress, Nodemon and Babel configuration files.

## Features & Usage

-  Create .env file to store environment variables (.env is already present in .gitignore to prevent revealing private keys)
-  Set NODE_ENV variable to development or production .env to change value of "**API**" that can be used to configure routes for development and production
-  Make other necessary changes in the tsconfig.json, babel.config.json, cypress.config.json, jest.config.js, nodemon.json, webpack.dev.js, webpack.prod.js, or the webpack.common.js files
-  Edit template.html if needed or change the title of your app in webpack.common.js under the HTMLWebpackPlugin options

## Tech Stack

This project was built with the following technologies:

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />

## Setup/ Installation

-  Clone this repository and navigate to project directory in the terminal
-  Install necessary dependencies:

```bash
npm install
```

-  Create a client/dist directory and a index.html file for webpack to output content to.
-  Make sure all express server routes begin with '/api'
-  Create .env file for all sensitive keys
-  Then, if environment is set to development, run the application like so:

```bash
npm run dev
```

This opens a development server in your local browser at port 3000.

-
-  When application is ready for production, have webpack build your bundle and minimize your files and then start the Express server (NOTE: To allow code-splitting to work when building files, must first change tsconfig.json 'module' variable to 'esnext'. Feel free to change back to 'commonjs' after building files to avoid errors with using import statements instead of require statements for modules.):

```bash
npm run build
npm start
```

Then navigate to port 8080 in your browser to view your application.

## Testing

-  Run unit tests with Jest/React Testing Library:

```bash
npm run jest
```

-Then run end to end tests with Cypress:

```bash
npm run cypress
```

-Or run both tests concurrently:

```bash
npm run test

## Resources

-  [React](https://reactjs.org/)
-  [webpack](https://webpack.js.org/)
-  [Babel](https://babeljs.io/)
-  [Prettier](https://prettier.io/)
-  [Cypress](https://www.cypress.io/)
-  [Jest](https://jestjs.io/docs/getting-started)
```
