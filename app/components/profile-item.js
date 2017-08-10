import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionDescription from 'material-ui/svg-icons/action/description';
import {grey400} from 'material-ui/styles/colors';

const styles = {
  listItem: {
  },
  listItemDisabled: {
    color: 'grey',
    backgroundColor: 'whitesmoke',
  },
  innerDiv: {
    paddingLeft: 52,
    paddingTop: 5,
    paddingBottom: 7,
  },
  innerDivSelected: {
    paddingLeft: 52,
    paddingTop: 5,
    paddingBottom: 7,
    backgroundColor: "lightcyan"
  },
  profileIcon: {
    top: 0,
    width: 25,
    height: 25,
  },
  statusIcon: {
    top: 0,
    paddingLeft: 6,
    width: 17,
    height: 17,
  },
  icon: {
    top: 12,
    width: 25,
    height: 25,
  },
};

const levelData = [
  {
    icon: "icons/icon_dynamic.png",
  },{
    icon: "icons/icon_secure.png",
  },{
    icon: "icons/icon_fortress.png",
  }
];

function getApplicationAvatar(iconStr){
  if (iconStr!=null) {
    let useIconStr = iconStr.replace(/f\:/,"");
    if (useIconStr.length > 0) {
      return  <Avatar style={styles.icon} src={useIconStr}/>
    }
  }
  return  <Avatar style={styles.icon} src="icons/terminal.png"/>
}

export class ProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onTouchTap = (e) => {
    this.props.onSelectCallback(this.props.item.key);
  }

  getPrimaryText = () => {
    if ((this.props.item.Name!=null) && (this.props.item.Name.length>0)) {
      return (
        <div>
          <span style={styles.secondaryText}>{this.props.item.Name}</span>
          <img style={styles.statusIcon} src={levelData[this.props.item.SecurityLevel].icon}/>
        </div>
      )
    } // else
    return null;
  }

  render() {
    if (this.props.item.Default){
      return (
        <ListItem
          primaryText={this.getPrimaryText()}
          secondaryText={this.props.item.Path}
          leftIcon={<ActionDescription color={grey400} style={styles.profileIcon} />}
          style={this.props.disabled? styles.listItemDisabled : styles.listItem}
          innerDivStyle={this.props.isSelected ? styles.innerDivSelected : styles.innerDiv}
          open={this.state.open}
          disabled={this.props.disabled}
          onTouchTap={this.onTouchTap}>
        </ListItem>
      )
    } // else
    return (
      <ListItem
        primaryText={this.getPrimaryText()}
        secondaryText={this.props.item.Path}
        leftAvatar={getApplicationAvatar(this.props.item.Icon)}
        style={this.props.disabled? styles.listItemDisabled : styles.listItem}
        innerDivStyle={this.props.isSelected ? styles.innerDivSelected : styles.innerDiv}
        open={this.state.open}
        disabled={this.props.disabled}
        onTouchTap={this.onTouchTap}>
      </ListItem>
    )}
};
