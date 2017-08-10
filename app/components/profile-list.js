import React from 'react';
import { ProfileItem } from './profile-item.js';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ProfileConfigDialog from './profile-config-dialog.js';

const styles = {
  divSplit:{
    paddingTop: 10,
    display: 'flex',
    height: 'auto',
    flexDirection: 'row wrap',
    width: '100%',
    paddingBottom: 100,
  },
  paperLeft:{
    flex: 1,
    minWidth: 380,
    height: '100%',
    paddingTop: 5,
    margin: 10,
    overflow: 'auto',
    textAlign: 'left',
  },
  paperRight:{
    width: 'auto',
    flex: 4,
    margin: 10,
    textAlign: 'left',
  },
};

class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItemsDisabled: false,
    };
  }

  handleSelect = (item) => {
    if (this.props.onSelectCallback!=null){
      this.props.onSelectCallback(item);
    }
  };

  apiHandleDelete = (key) => {
    if (this.props.onApiDelete!=null){
      this.props.onApiDelete(key);
    }
  }

  apiHandleUpdate = (oldKey,newKey,jsonObj) => {
    if (this.props.onApiUpdate!=null){
      this.props.onApiUpdate(oldKey,newKey,jsonObj);
    }
  }

  handleEditMode = (isSet) => {
    this.setState({
      listItemsDisabled: isSet,
    });
  };

  renderDialog = (item) => {
    return (
      <ProfileConfigDialog
        open={true}
        item={item}
        onApiDelete={this.apiHandleDelete}
        onApiUpdate={this.apiHandleUpdate}
        onEditModeChange={this.handleEditMode}
      />
    )
  }

  render() {
    const { profileList = {}} = this.props;
    const { itemList = []} = this.props;
    let curNbrItems = 0;
    if (itemList != null) {
      curNbrItems = itemList.length;
    }
    if (curNbrItems===0) {
      return <List/>
    } else {
      let curKey = this.props.selectedKey;
      if (curKey.length==0){ // use first profile as default
        curKey = itemList[0].key;
      }
      const curItem=profileList[curKey];
      return (
        <div style={styles.divSplit}>
          <Paper zDepth={0} style={styles.paperLeft}>
            <List style={styles.list}>
            {itemList.map((item,index) => {
              let useItem = item;
              if (item.Framework!=null){ // Special handling -> flatten this
                useItem["hasFramework"]=true;
                for(let [subkey, subvalue] of Object.entries(item.Framework)) {
                  useItem[subkey]=subvalue
                }
              }
              return (
                <ProfileItem
                  key={item.key}
                  item={useItem}
                  isSelected={item.key==curKey}
                  disabled={this.state.listItemsDisabled}
                  onSelectCallback={this.handleSelect}/>
                );
              })}
            </List>
          </Paper>
          <Paper zDepth={2} style={styles.paperRight}>
            {this.renderDialog(curItem)}
          </Paper>
        </div>
      );
    }
  }
}

export default ProfileList;
