import React from 'react';
import LinkList from '../containers/link-list';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDescription from 'material-ui/svg-icons/action/description';
import {grey400} from 'material-ui/styles/colors';

const styles = {
  listItem: {
    borderTop: '1px solid lightgrey'
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
    top: -12,
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
    paddingLeft: '45px',
    paddingTop: '1px',
    fontSize: '13px',
    fontWeight: '500',
    paddingBottom: '3px',
  },
  innerDivSelected: {
    paddingLeft: '45px',
    paddingTop: '1px',
    fontSize: '13px',
    fontWeight: '500',
    paddingBottom: '3px',
    backgroundColor: 'whitesmoke',
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  profileButton: {
    float: 'right',
    marginTop: 2,
    paddingLeft: 20,
    width: 15,
    height: 15,
  },
  icon: {
    top: '1px',
    marginTop: 5,
    marginLeft: -5,
    width: 25,
    height: 25,
  },
};

function getApplicationAvatar(iconStr){
  let useIconStr = iconStr.replace(/f\:/,"");
  if (useIconStr.length > 0) {
    return  <Avatar style={styles.icon} src={useIconStr}/>
  } // else
  return <Avatar style={styles.icon} src="icons/terminal.png"/>
}

function UppercaseFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class ConnectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSubscribed: false,
      open: false,
    };
  }

  handleProfileClick = (i,e) => {
    if (this.props.onProfileClick!=null){
      this.props.onProfileClick(this.props.item.ProfileKey)
    }
  }

  handleNestedListToggle = (item) => {
    if (this.props.selectCallback!=null){
      this.props.selectCallback()
    }
    if (!this.state.hasSubscribed) {
      this.props.onSubscribe("/Run/Processes/Process:"+this.props.item.Pid+"/");
      this.setState({
        hasSubscribed: true,
        open: item.state.open,
      })
    } else {
      this.setState({
        open: item.state.open,
      })
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
          <FontIcon className="material-icons" style={styles.fontIcon}>+</FontIcon>
        </Badge>
      </IconButton>
    )
  }

  renderPrimaryText = (title) => {
    return (
      <span><span>{UppercaseFirst(title)}</span>{
        this.props.isSelected ? <ActionDescription
                                  color={grey400}
                                  style={styles.profileButton}
                                  onTouchTap={this.handleProfileClick}/> : null
      }
      </span>
    )
  }

  render() {
    let curNbrItems = 0;
    if (this.props.itemList != null) {
      curNbrItems = this.props.itemList.length;
    }
    let tmpTitle = this.props.item.Pid;
    let checkRegexp = /\/([^\/]*)$/g;
    let match = checkRegexp.exec(this.props.item.Path);
    if (match!=null) {
      tmpTitle = match[1];
    }
    if ((this.props.item.Profile!=null)
      && (!this.props.item.Profile.Default)
      && (this.props.item.Profile.Name!=null)
      && (this.props.item.Profile.Name.length>0)){
      tmpTitle = this.props.item.Profile.Name;
    }
    const secTextLines = 1;
    return (
      <ListItem
        key={this.props.itemId}
        id={"ctx-"+this.props.itemId}
        style={styles.listItem}
        innerDivStyle={this.props.isSelected ? styles.innerDivSelected : styles.innerDiv}
        primaryText={this.renderPrimaryText(tmpTitle)}
        secondaryText={
          <div style={styles.secondaryText}>
            {this.props.item.UserName + " (" +this.props.item.UserID +") " +this.props.item.Path}
          </div>
        }
        secondaryTextLines={secTextLines}
        primaryTogglesNestedList={true}
        leftAvatar={getApplicationAvatar(this.props.item.Icon)}
        rightIcon={this.getRightIcon(curNbrItems)}
        open={this.state.open}
        onNestedListToggle={this.handleNestedListToggle}
        autoGenerateNestedIndicator={false}
        nestedListStyle={styles.nestedList}
        // Connection List
        nestedItems={
          this.props.itemList.map((item,index) => {
            return (
              <LinkList
                key={item.key}
                store={this.props.store}
                item={item}
                itemId={item.key}
              />
            )
          })
        }
      >
      </ListItem>
    );
  }
}

export default ConnectionList;
