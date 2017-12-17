import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHighcharts from 'react-highcharts';

const makeChartConfig = (data) => {
    const graphData = [];
    console.log('data', data);
    for (let i = 0; i < data.length; i += 1) {
      graphData.push(data[i].heartBeat);
    }
    console.log("graphData", graphData)
    const config = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'chart test'
      },
      xAxis: {
        gridLineWidth: 1
      },
      yAxis: [{
        title: {
          text: 'Histogram Count'
        }
      }, {
        opposite: true,
        title: {
          text: 'Y value'
        }
      }],
      series: [{
        name: 'Histogram',
        type: 'column',
        data: graphData,
        pointPadding: 0,
        groupPadding: 0,
        pointPlacement: 'between',
        color: '#3498db'
      }]
    };

    return config;
  };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
          here?
          <ReactHighcharts config={makeChartConfig(this.state.data)}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
