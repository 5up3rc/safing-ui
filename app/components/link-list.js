import React from 'react';
import { LinkItem } from './link-item.js';
import { ListItem } from 'material-ui/List';
import ToggleIndeterminateCheckBox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ContentClear from 'material-ui/svg-icons/content/clear';
import NotificationDoNotDisturbOn from 'material-ui/svg-icons/notification/do-not-disturb-on';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {blue100,blue200,red500,green500,greenA200,grey200} from 'material-ui/styles/colors';

const styles = {
  listItem: {
  },
  nestedList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  badge: {
    top: 15,
    right: 15,
    backgroundColor: "lightgrey",
    color: "black",
    width: 15,
    height: 15,
    fontSize: 9,
  },
  iconButton: {
    padding: 0,
    top: -25,
    right: 20,
  },
  iconButtonOpen: {
    padding: 0,
    top: -17,
    right: 15,
    fontWeight: 200,
    color: "grey",
  },
  fontIcon: {
    fontWeight: 200,
    color: "grey",
  },
  fontIconOpen: {
    fontSize: 11,
    fontWeight: 200,
    color: "grey",
  },
  innerDiv: {
    paddingLeft: '55px',
    paddingTop: '1px',
    fontSize: '13px',
    paddingBottom: '4px',
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  icon: {
    top: '1px',
    marginTop: '1px',
    marginLeft: 15,
    width: 18,
    height: 18,
  },
};

class LinkList extends React.Component {
    state = {
      open: false,
    };

    handleNestedListToggle = (item) => {
      this.setState({
        open: item.state.open,
      });
    };

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

  getRightIcon = (nbrItems) => {
    if (this.state.open) {
      return (
        <IconButton style={styles.iconButtonOpen}>
          <FontIcon style={styles.fontIconOpen}>-</FontIcon>
        </IconButton>
      )
    } //else
    return (
      <IconButton style={styles.iconButton}>
        <Badge
          badgeStyle={styles.badge}
          badgeContent={nbrItems}
          secondary={true}
          >
        </Badge>
      </IconButton>
    )
  }

  getSecondaryText = (str) => {
    if ((str!=null) && (str.length>0)) {
      return <div style={styles.secondaryText}>{this.props.item.Reason}</div>
    } // else
    return null;
  }

  render() {
    let curNbrItems = 0;
    if (this.props.itemList != null) {
      curNbrItems = this.props.itemList.length;
    }
    const tmpPath = this.props.item.key.split("/");
    let curTitle = "";
    if (tmpPath.length>1){
      curTitle = tmpPath[1];
    }
    if (curTitle==="D") {
      curTitle = "Direct connections";
    } else if (curTitle==="I") {
      curTitle = "Incoming connections";
    }
    return (
      <ListItem
        key={this.props.itemId}
        style={styles.listItem}
        innerDivStyle={styles.innerDiv}
        leftIcon={this.getVerdictIcon()}
        primaryText={curTitle}
        secondaryText={this.getSecondaryText(this.props.item.Reason)}
        primaryTogglesNestedList={true}
        autoGenerateNestedIndicator={false}
        open={this.state.open}
        onNestedListToggle={this.handleNestedListToggle}
        rightIcon={this.getRightIcon(curNbrItems)}
        nestedListStyle={styles.nestedList}
        // Link list
        nestedItems={
          this.props.itemList.map((item,index) => {
            return <LinkItem key={index} item={item}/>
          })
        }
      />
    );
  }
}

export default LinkList;
