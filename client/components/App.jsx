import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHighcharts from 'react-highcharts';
import MERN from '../assets/MERN.jpg';

const convertData = (date) => {
  //Mon Dec 18 2017 15:22:15 GMT-0600 (CST)
  var year = date.split(" ")[3];
  var month = date.split(" ")[1];
  month = new Date(Date.parse(month + " 1, 2017")).getMonth();
  var day = date.split(" ")[2];
  return [Number(year), month, Number(day)];
}

const makeChartConfig = (data) => {
  const graphData = [];
  console.log("convertData" , convertData(data[0].time))
  for (let i = 0; i < data.length; i += 1) {
    graphData.push([Date.UTC(convertData(data[i].time)[0], convertData(data[i].time)[1], convertData(data[i].time)[2]), data[i].heartBeat]);
  }
  console.log("graphData", graphData)
  const config = {
    title: {
      text: 'HeartBeat History'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
  },
    yAxis: {
      title: {
        text: 'HeartBeat'
      }
    },
    series: [{
      name: 'HeartBeat',
      type: 'line',
      data: graphData,
      pointPadding: 0,
      groupPadding: 0,
      pointPlacement: 'between',
      color: '#f1a781'
    }]
  };

  return config;
};

const styles = {
  addButton: {
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#2d2d2d',
    height: 230,
    paddingTop: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  topTitle: {
    fontSize: 34,
    fontWeight: 600,
    fontFamily: 'proxima-nova,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    color: '#61dafb',
    margin: 0,
  },
  subTitle: {
    fontFamily: 'proxima-nova,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  mernLogo: {
    height: 50,
    marginRight: 10
  },
  addHeartBeat: {
    backgroundColor: '#61dafb'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          heartBeat: 0,
          time: 'Mon Dec 18 2017 15:21:00 GMT-0600'
        } 
      ],
    };
  }
  componentDidMount() {
    this.getCharts();
  }

  getCharts() {
    fetch('http://localhost:8000/charts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => this.setState({
      data: response
    }))
    .catch(err => console.log("error fetching charts", err))
  }

  addCharts() {
    fetch('http://localhost:8000/charts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartBeat: 'test post'
      })
    })
    .then(console.log("heartBeat added"))
    .catch(err => console.log("error posting heartBeat", err))

    window.location.reload();
  }

  

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <div style={styles.header}>
          <img style={styles.mernLogo} className="logo" src={MERN} alt="MERN" />
          <div style={styles.topTitle}>Health Charts </div>
          <div style={styles.subTitle}>your heartbeat history</div> 
          <FlatButton 
            label="Add HeartBeat" 
            style={styles.addHeartBeat}
          />
        </div>
          <ReactHighcharts config={makeChartConfig(this.state.data)}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
