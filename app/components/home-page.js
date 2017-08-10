import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {grey400} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
  divSplit:{
    backgroundColor: 'rgb(35,35,35)',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row wrap',
    width: '100%',
    paddingBottom: 100,
  },
  paperLeftAlert:{
    flex: 1,
    height: '60%',
    paddingTop: 5,
    margin: 10,
    textAlign: 'left',
    backgroundColor: 'rgb(35,35,35)',
  },
  paperLeft:{
    flex: 1,
    height: '100%',
    paddingTop: 5,
    margin: 10,
    textAlign: 'left',
    backgroundColor: 'rgb(35,35,35)',
  },
  paperRight:{
    height: 'auto',
    width: 'auto',
    flex: 4,
    margin: 10,
    textAlign: 'left',
    backgroundColor: 'rgb(35,35,35)',
  },
  homeCard: {
    textAlign: 'left',
    backgroundColor: 'rgb(35,35,35)',
    height: '100%',
  },
  homeCardSmallActive: {
    textAlign: 'left',
    backgroundColor: 'rgb(65,65,65)',
    height: '100%',
  },
  homeCardSmall: {
    textAlign: 'left',
    backgroundColor: 'rgb(35,35,35)',
    height: '100%',
  },
  mediaImg: {
    maxHeight: 330
  },
  mediaImgAlert: {
    maxHeight: 230
  },
  closeAlertButton: {
    float: 'right',
    paddingTop: 5,
    paddingRight: 5,
    color: '#8e8e8e',
  },
  cardTitle: {
    paddingTop: 1,
  },
  cardText: {
    color: "lightgrey",
    fontSize: 21,
  },
  alertIcon: {
    marginLeft: -25,
    paddingRight: 5,
    position: 'relative',
    top: 3,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },
  alertBox: {
    backgroundColor: 'rgb(156, 208, 184)',
    paddingBottom: 15,
  },
  alertMessage: {
    minWidth: '50%',
    width: 'auto',
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 45,
  },
  alertRecommendMessage: {
    minWidth: '50%',
    paddingTop: 3,
    width: 'auto',
    fontStyle: 'italic',
    fontSize: 14,
    paddingLeft: 45,
  },
  alertSmallCardMessage: {
    fontStyle: 'italic',
    fontSize: 14,
    color: "lightgrey",
    textAlign: 'center',
  },
  primaryTitle: {
    fontSize: 19,
    marginLeft: -140,
    textAlign: "center",
  },
  secondaryTitle: {
    fontSize: 44,
    textAlign: "center",
    fontWeight: 400,
  },
  mediaImgSmall: {
    paddingTop: 30,
    maxHeight: 85,
  },
  mediaImgSmallWithAlert: {
    maxHeight: 85,
  },
  cardTitleSmall: {
    paddingTop: 1,
    paddingBottom: 15,
  },
  cardTitleSmallWithAlert: {
    paddingTop: 1,
    paddingBottom: 12,
  },
  primaryTitleSmall: {
    fontSize: 20,
    textAlign: "center",
  },
};

const levelData = [
  {
    title: "Dynamic",
    icon: "icons/icon_dynamic.svg",
    descr: "Regular mode - provides additional security measures to protect your privacy, but will also try to not be in your way to help you stay focused. Use this mode in trusted networks."
  },{
    title: "Secure",
    icon: "icons/icon_secure.svg",
    descr: "Heightend security measures - to keep you safe in untrusted environments. It is automatically activated if you enter an unknown network, like a café's Wi-Fi, or if an attack is detected. Use this mode when you do not trust a network, or are temporarily in need of more security."
  },{
    title: "Fortress",
    icon: "icons/icon_fortress.svg",
    descr: "All protective mechanisms available are activated. This will most likely cut off at least some applications from the Internet, but provides best protection technically possible. Use this mode if you think you are currently being attacked, like having clicked on a possible virus."
  }
];

export class HomePage extends React.Component {
/*  This can be used for simulation testing
  state = {
    open: false,
    textBoxText: "",
    simulationText: ""
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleNewText = (e,txt) => {
    this.setState({textBoxText: txt});
  };

  handleCancel = () => {
    this.setState({open: false});
  };

  handleSave = () => {
    const tmpText = this.state.textBoxText;
    this.setState({
      open: false,
      simulationText: tmpText
    });
    let curLevel = this.getStatus("CurrentSecurityLevel");
    let selLevel = this.getStatus("SelectedSecurityLevel");
    let threatLevel = this.getStatus("ThreatLevel");
    if (tmpText.length>0){
      curLevel = curLevel+1;
      if (curLevel>3){
        curLevel=3;
      }
      threatLevel = curLevel-1;
    } else {
      curLevel = selLevel;
      threatLevel = 0;
    }
    const tempObj = {
      CurrentSecurityLevel: curLevel,
      SelectedSecurityLevel: selLevel,
      ThreatLevel: threatLevel,
      ThreatReason: tmpText,
    }
    if (this.props.onApiUpdate!=null){
      this.props.onApiUpdate("/Me/SystemStatus:status","/Me/SystemStatus:status",tempObj);
    }
  };
*/

  getStatus(field){
    if (this.props.status!=null){
      return this.props.status[field]
    } // else
    return null
  }

  handleDismiss = (level) => {
    const selLevel = this.getStatus("CurrentSecurityLevel");
    const threatLevel = this.getStatus("ThreatLevel");
    const threatReason = this.getStatus("ThreatReason");
    const tempObj = {
      CurrentSecurityLevel: selLevel,
      SelectedSecurityLevel: selLevel,
      ThreatLevel: threatLevel,
      ThreatReason: threatReason,
    }
    if (this.props.onApiUpdate!=null){
      this.props.onApiUpdate("/Me/SystemStatus:status","/Me/SystemStatus:status",tempObj);
    }
  }

  handleTouchTap = (level) => {
    const threatLevel = this.getStatus("ThreatLevel");
    const threatReason = this.getStatus("ThreatReason");
    let useCurLevel = this.getStatus("CurrentSecurityLevel");
    let tempObj = {
      CurrentSecurityLevel: level+1,
      SelectedSecurityLevel: level+1,
      ThreatLevel: threatLevel,
      ThreatReason: threatReason,
    }
    if (this.props.onApiUpdate!=null){
      this.props.onApiUpdate("/Me/SystemStatus:status","/Me/SystemStatus:status",tempObj);
    }
  }

  renderTopSection  = () => {
    const displayLevel = this.getStatus("SelectedSecurityLevel");
    const alertLevel = this.getStatus("CurrentSecurityLevel");
    const alertReason = this.getStatus("ThreatReason");
    const alertActive = ((alertReason!=null) && (alertReason.length>0));
    const msgStr1 = "Warning: Security Level was automatically increased to "+levelData[alertLevel-1].title+", because Safing  "+alertReason +".";
    const msgStr2 = "You can manually return to "+levelData[displayLevel-1].title +" mode, or wait until Safing deems it safe to go back again.";
    if (alertActive){
      return (
        <div style={styles.alertBox}>
          <ContentClear style={styles.closeAlertButton} onTouchTap={this.handleDismiss}/>
          <div style={styles.alertMessage}>{msgStr1}</div>
          <div style={styles.alertRecommendMessage}>{msgStr2}</div>
        </div>
      )
    } // else
    return null
  }

  renderAlert(message) {
    return (
      <span>
        <AlertWarning color={"rgb(106, 156, 106)"} style={styles.alertIcon}/>
        {message}
      </span>
    )
  }

  renderSmallLevelCard(level) {
    const isAlertLevel = (this.getStatus("ThreatLevel")>=level+1);
    const isCurLevel = (this.getStatus("CurrentSecurityLevel")==level+1);
    const alertReason = this.getStatus("ThreatReason")
    const isAlert = (isAlertLevel && (alertReason!=null) && (alertReason.length>0));
    const titleStr = levelData[level].title;
    let subtitleStr = null;
    if (isAlert){
      subtitleStr = "Safing "+alertReason
    }
    return (
      <Card
        style={isCurLevel ? styles.homeCardSmallActive : styles.homeCardSmall}
        onTouchTap={this.handleTouchTap.bind(this,level)}
      >
        <CardMedia>
          <img
            style={isAlert ? styles.mediaImgSmallWithAlert : styles.mediaImgSmall}
            src={levelData[level].icon} alt="" />
        </CardMedia>
        <CardTitle
          style={isAlert ? styles.cardTitleSmallWithAlert : styles.cardTitleSmall}
          titleColor="lightgrey"
          titleStyle={styles.primaryTitleSmall}
          title={isAlert ? this.renderAlert(titleStr) : titleStr}
          subtitle={subtitleStr}
          subtitleStyle={styles.alertSmallCardMessage}
        />
      </Card>
    )
  }

  render() {
    const curLevel = this.getStatus("CurrentSecurityLevel");
    const selectedLevel = this.getStatus("SelectedSecurityLevel");
    const alertReason = this.getStatus("ThreatReason")
    const isAlert = ((alertReason!=null) && (selectedLevel!=curLevel));
    return (
      <div>
        {isAlert ? this.renderTopSection() : null}
        <div style={styles.divSplit}>
          <Paper zDepth={0} style={styles.paperLeftAlert}>
            {this.renderSmallLevelCard(0)}
            {this.renderSmallLevelCard(1)}
            {this.renderSmallLevelCard(2)}
          </Paper>
          <Paper zDepth={0} style={styles.paperRight}>
            <Card style={styles.homeCard}>
              <CardMedia>
                <img
                  style={isAlert ? styles.mediaImgAlert : styles.mediaImg}
                  src={levelData[curLevel-1].icon} alt="" />
              </CardMedia>
              <CardTitle
                style={styles.cardTitle}
                titleColor="lightgrey"
                title="Level"
                titleStyle={styles.primaryTitle}
                subtitleColor="lightgrey"
                subtitleStyle={styles.secondaryTitle}
                subtitle={levelData[curLevel-1].title}/>
              <CardText style={styles.cardText}>{levelData[curLevel-1].descr}</CardText>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

/* This can be used for simulation testing
const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
    onTouchTap={this.handleCancel}
  />,
  <FlatButton
    label="Submit"
    primary={true}
    keyboardFocused={true}
    onTouchTap={this.handleSave}
  />,
];

<Dialog
  title="Simulate a threat situation"
  actions={actions}
  modal={true}
  open={this.state.open}
  onRequestClose={this.handleCancel}
>
  <TextField
      hintText="Simulate a threat situation by telling a reason why safing increased the threat level"
      floatingLabelText="Reason text"
      floatingLabelFixed={true}
      defaultValue={this.state.textBoxText}
      fullWidth={true}
      onChange={this.handleNewText}
    />
</Dialog>

<FloatingActionButton style={styles.fab}>
  <ContentCreate onTouchTap={this.handleOpen}/>
</FloatingActionButton>
*/
