import React from 'react';
import {ListItem} from 'material-ui/List';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ToggleIndeterminateCheckBox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ContentClear from 'material-ui/svg-icons/content/clear';
import NotificationDoNotDisturbOn from 'material-ui/svg-icons/notification/do-not-disturb-on';
import {blue200,red500,green500,greenA200,grey200} from 'material-ui/styles/colors';

const styles = {
  listItem: {
  },
  innerDiv: {
    paddingLeft: '95px',
    paddingTop: '1px',
    fontSize: '13px',
    paddingBottom: '4px',
  },
  icon: {
    top: '1px',
    marginTop: '1px',
    marginLeft: 58,
    width: 15,
    height: 15,
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 12,
  },
};

function isInToday(dt)
{
  var today = new Date();
  return (today.setHours(0,0,0,0) == dt.setHours(0,0,0,0));
}

function UnixTimeToDateStr(timeInSec){
  let t = new Date( timeInSec * 1000);
  let hh = t.getUTCHours();
  let mm = t.getUTCMinutes();
  let ss = t.getSeconds();
  if (hh < 10) {hh = "0"+hh;}
  if (mm < 10) {mm = "0"+mm;}
  if (ss < 10) {ss = "0"+ss;}
  if (isInToday(t)) {
    return hh+":"+mm+":"+ss;
  } // else
  return t.toISOString().substr(0,10)+" "+hh+":"+mm+":"+ss;
}

export class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  getVerdictIcon = () => {
    const curVerdict = this.props.item.Verdict;
    switch (curVerdict) {
      case 0: // UNDECIDED
      return <ActionAssessment style={styles.icon} color={blue100} />
      case 1: // CANTSAY
        return null;
      case 2: // ACCEPT
        return <NavigationCheck style={styles.icon} color={green500} />
      case 3: // BLOCK
        return <ContentClear style={styles.icon} color={red500} />
      case 4: // DROP
        return <NotificationDoNotDisturbOn style={styles.icon} color={red500} />
      default:
        return <ActionCompareArrows style={styles.icon} color={greenA200} />
    }
  }

  getSecondaryText = (str) => {
    if ((str!=null) && (str.length>0)) {
      return <div style={styles.secondaryText}>{str}</div>
    } // else
    return null;
  }

  getPrimaryText = () => {
    const dtEnded = this.props.item.Ended;
    let timeStr = "";
    if ((dtEnded!=null)&&(dtEnded!==0)){
      timeStr = UnixTimeToDateStr(this.props.item.Started)
                +"-"
                +UnixTimeToDateStr(dtEnded)
    } else {
      timeStr = UnixTimeToDateStr(this.props.item.Started)
    }
    return this.props.item.RemoteAddress.toLowerCase() +"  ("+timeStr+")"
  }

  render() {
    return (
      <ListItem
        primaryText={this.getPrimaryText()}
        style={styles.listItem}
        innerDivStyle={styles.innerDiv}
        leftIcon={this.getVerdictIcon()}
        secondaryText={this.getSecondaryText(this.props.item.Reason)}
       />
    )}
};
