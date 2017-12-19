# HealthChart 

## Usage

React Challenge is a simple full stack application usng the MERN tech stack, built from scratch

## Technologies
  1. [Express](https://expressjs.com/) / [Node](https://nodejs.org/en/n)
  1. [React](https://facebook.github.io/react/) / [Redux](http://redux.js.org/)
  1. [Material-UI](http://www.material-ui.com/#/)
  1. [Webpack](https://webpack.github.io/) / [Babel](https://babeljs.io/)

## how to run

open a new tab and run

```
npm run server
```

open another tab and run

```
npm run client
```

open another tab and run 

```
mongod
```

import my dummy data using mongoimport

```
mongoimport --db healthChart --collection charts --drop --file ~/healthchart/data/charts.json
```

navigate to http://localhost:8080/