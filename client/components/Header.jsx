import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import MERN from '../assets/MERN.jpg';
import styles from '../styles.css';

const stylesInline = {
  addHeartBeat: {
    backgroundColor: '#61dafb'
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
    <div className={styles.header}>
      <img className={styles.mernLogo} src={MERN} alt="MERN" />
      <div className={styles.topTitle}> Health Charts </div>
      <div className={styles.subTitle}> your heartbeat history </div> 
      <FlatButton 
        label="Add Heartbeat" 
        style={stylesInline.addHeartBeat}
        onClick={this.props.handleOpen}
      />
    </div>
    )
  }
}

export default Header;