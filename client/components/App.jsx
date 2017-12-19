import React from 'react';

import Header from './Header.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import ReactHighcharts from 'react-highcharts';
import MERN from '../assets/MERN.jpg';
import styles from '../styles.css';
import { makeChartConfig } from '../makeChartConfig.js';

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
      updateHeartBeat: 0,
      id: 0
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

  handlePointCancel() {
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

  handlePointClose() {
    this.updateCharts()
  }

  handlePointClick(id) {
    console.log("got here mofo", id)
    this.setState({
      openPoint: true,
      id: id
    });
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

  updateCharts() {
    fetch('http://localhost:8000/charts/' + this.state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartBeat: this.state.updateHeartBeat
      })
    })
    .then(console.log("heartBeat updated"))
    .catch(err => console.log("error Putting heartBeat", err))

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
        onClick={this.handlePointCancel.bind(this)}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handlePointClose.bind(this)}
      />
    ];
    return (
      <MuiThemeProvider>
        <div>
          <Header handleOpen={this.handleOpen.bind(this)} />
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
            />
          </Dialog>
          <Dialog
            title="Would You Like To Update This Heartbeat?"
            actions={updateActions}
            modal={false}
            open={this.state.openPoint}
            onRequestClose={this.handlePointCancel.bind(this)}
          >
            <TextField 
              name='updateHeartBeat'
              floatingLabelText='Update Heartbeat'
              onChange={(e, value) => this.updateHeartBeatChange(value)}
            />
          </Dialog>

          <Paper className={styles.paper}>
            <ReactHighcharts config={makeChartConfig(this.state.data, this.handlePointClick.bind(this))}/>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
