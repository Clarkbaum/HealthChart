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

const makeChartConfig = (data, handlePointClick) => {
  const graphData = [];
  for (let i = 0; i < data.length; i += 1) {
    graphData.push({
      id: data[i]._id,
      x: Date.UTC(convertData(data[i].time)[0], convertData(data[i].time)[1], convertData(data[i].time)[2]), 
      y: data[i].heartBeat
    });
  }
  const config = {
    title: {
      text: 'Heartbeat History'
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
        text: 'Heartbeat'
      }
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              console.log("does this work", e)
              handlePointClick(e.point.category)
            }
          }
        },
        marker: {
          lineWidth: 1
        }
      }
    },
    series: [{
      name: 'Heartbeat',
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
      open: false,
      openPoint: false,
      newHeartBeat: 0,
      updateHeartBeat: 0
    };
  }
  componentDidMount() {
    this.getCharts();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleCancel() {
    this.setState({open: false});
  }

  handlePointClose() {
    this.setState({openPoint: false});
  }

  handleClose() {
    var currentDate = new Date().getDate()
    var lastEnteredDate = Number(this.state.data[this.state.data.length - 1].time.split(" ")[2])
    if(lastEnteredDate === currentDate) {
      alert("you have already entered in a heartbeat for this date")
    } else {
      this.setState({open: false});
      this.addCharts()
    }
  }

  handlePointClick(date) {
    console.log("got here mofo")
    this.setState({openPoint: true})
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
        heartBeat: this.state.newHeartBeat,
        time: Date()
      })
    })
    .then(console.log("heartBeat added"))
    .catch(err => console.log("error posting heartBeat", err))

    window.location.reload();
  }

  newHeartBeatChange(value) {
    this.setState({newHeartBeat: value})
  }

  updateHeartBeatChange(value) {
    this.setState({updateHeartBeat: value})
  }

  render() {
    const addActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ];
    const updateActions = [
      <FlatButton
        label="Cancel"
        primary={true}
      />,
      <FlatButton
        label="Ok"
        primary={true}
      />
    ];
    return (
      <MuiThemeProvider>
        <div>
        <div style={styles.header}>
          <img style={styles.mernLogo} className="logo" src={MERN} alt="MERN" />
          <div style={styles.topTitle}> Health Charts </div>
          <div style={styles.subTitle}> your heartbeat history </div> 
          <FlatButton 
            label="Add Heartbeat" 
            style={styles.addHeartBeat}
            onClick={this.handleOpen.bind(this)}
          />
          <Dialog
            title="Please Enter In Your Current Heartbeat"
            actions={addActions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
          >
            <TextField 
              name='newHeartBeat'
              floatingLabelText='Current Heartbeat'
              onChange={(e, value) => this.newHeartBeatChange(value)}
            >
          </TextField>
          </Dialog>
          <Dialog
            title="Would You Like To Update This Heartbeat?"
            actions={updateActions}
            modal={false}
            open={this.state.openPoint}
            onRequestClose={this.handlePointClose.bind(this)}
          >
            <TextField 
              name='updateHeartBeat'
              floatingLabelText='Update Heartbeat'
              onChange={(e, value) => this.updateHeartBeatChange(value)}
            >
          </TextField>
          </Dialog>
        </div>
          <ReactHighcharts config={makeChartConfig(this.state.data, this.handlePointClick.bind(this))}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
