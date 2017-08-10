import React from 'react';
import ConnectionList from '../containers/connection-list';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const styles = {
  paper:{
    height: 'auto',
    maxWidth: 800,
    flex: 4,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
  },
  mainContainer: {
    paddingTop: 15,
    paddingBottom: 100,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};

export class MonitorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInx: -1,
    };
  }

  selectCallback = (inx,item) => {
    this.setState({
      selectedInx: inx,
    });
  };

  handleProfileCallback = (profileIdStr) => {
    if (this.props.onProfileClick!=null){
      this.props.onProfileClick(profileIdStr)
    }
  }

  handleSubscription = (subscStr) => {
    if (this.props.onSubscribe!=null){
      this.props.onSubscribe(subscStr)
    }
  }

  render() {
    let curLevelId = this.props.item;
    let curNbrItems = 0;
    if (this.props.itemList != null) {
      curNbrItems = this.props.itemList.length;
    }
    if (curNbrItems===0) {
      return null;
    } else {
      return (
        <div style={styles.mainContainer}>
          <Paper zDepth={1} style={styles.paper}>
            <List style={styles.list}>
              {this.props.itemList.map((item,index) => {
                  return (
                    <ConnectionList
                      itemId={item.Pid}
                      store={this.props.store}
                      isSelected={index==this.state.selectedInx}
                      key={item.Pid}
                      item={item}
                      onProfileClick={this.handleProfileCallback}
                      selectCallback={this.selectCallback.bind(this,index)}
                      onSubscribe={this.handleSubscription}/>
                  )
              })}
            </List>
          </Paper>
        </div>
      );
    }
  }
}
