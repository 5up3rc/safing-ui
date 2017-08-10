import React from 'react';
import Loader from 'react-loader';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import {Tabs, Tab} from 'material-ui/Tabs';

import {darkBlack, redA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProfileList from '../containers/profile-list';
import MonitorList from '../containers/monitor-list';
import SettingsPage from '../containers/settings-page';
import HomePage from '../containers/home-page';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgb(31,167,135)',
        primary2Color: 'rgb(31,167,135)',
        pickerHeaderColor: 'rgb(31,167,135)',
    },
});

const styles = {
  darkBackground: {
    backgroundColor: 'rgb(35,35,35)',
    height: '100%',
    position: 'relative'
  },
  loadingText: {
    textTransform: 'none',
  },
  loading: {
    color: 'ligthgrey',
    width: 70,
    height: 70,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'white',
    zIndex: 9999,
  },
  tabs: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    height: '100%',
  },
  tabsTemplate: {
    overflow: 'auto',
    height: '100%',
  },
  tabsContainer: {
    backgroundColor: 'rgb(31,167,135)',
  },
  tabsContentContainer: {
    overflow: 'auto',
    height: '100%',
  },
};

class SafingTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 1,
      selProfileKey: "",
    };
  }

  componentWillMount(){
/*
    ThemeManager.setPalette({
         });
         */
  }

  handleChange = (value) => {
    this.setState({
      tabSelected: value,
    });
  }

  handleProfileCallback = (profileIdStr) => {
    const keyStr = profileIdStr.replace(/\/Data\/Profiles\/Profile\:/,"");
    this.setState({
      tabSelected: 2,
      selProfileKey: keyStr,
    });
  }

  handleSelectProfile = (keyStr) => {
    this.setState({
      selProfileKey: keyStr,
    });
  };

  handleSubscription = (subscStr) => {
    if (this.props.onSubscribe!=null){
      this.props.onSubscribe(subscStr)
    }
  }

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

  renderLoading() {
    return (
      <div>
        <Tabs
          value={1}
          onChange={this.handleChange}
          style={styles.tabs}
          tabTemplateStyle={styles.tabsTemplate}
          tabItemContainerStyle={styles.tabsContainer}
          contentContainerStyle={styles.tabsContentContainer}
        >
          <Tab
            value={1}
            style={styles.loadingText}
            label="Connecting to Safing core"
            icon={<ActionCompareArrows/>}
                data-route="/home" onActive={this.handleHome}>
                <Loader
                  color="lightgrey"
                  top="250px"
                  style={styles.loading}>
                </Loader>
          </Tab>
        </Tabs>
      </div>
    )
  }

  render() {
    let isSocketConnected = this.props.connected;
    let isConnected = false;
    if (this.props.statusList.status!=null){
      const curSecurityLevel = this.props.statusList.status.CurrentSecurityLevel;
      const selectedSecurityLevel = this.props.statusList.status.SelectedSecurityLevel;
      isConnected = ((isSocketConnected) && (curSecurityLevel>=0) && (selectedSecurityLevel>=0));
    }
    const useDarkBkgrd = ((this.state.tabSelected == 1) || (!isConnected));
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App" style={useDarkBkgrd ? styles.darkBackground : null}>
          {(!isConnected ) ? this.renderLoading() : (
            <Tabs
              value={this.state.tabSelected}
              onChange={this.handleChange}
              style={styles.tabs}
              tabTemplateStyle={styles.tabsTemplate}
              tabItemContainerStyle={styles.tabsContainer}
              contentContainerStyle={styles.tabsContentContainer}
            >
              <Tab value={1} style={styles.homeTab} icon={<ActionHome/>}
                    data-route="/home" onActive={this.handleHome}>
                      <HomePage
                        store={this.props.store}
                        onApiUpdate={this.apiHandleUpdate}
                        status={this.props.statusList.status}/>
              </Tab>
              <Tab value={2} icon={<ActionDescription style={styles.icon} />}
                    label="Profiles" data-route="/profiles" onActive={this.handlePermissionLevel}>
                <ProfileList
                  onApiUpdate={this.apiHandleUpdate}
                  onApiDelete={this.apiHandleDelete}
                  onSelectCallback={this.handleSelectProfile}
                  selectedKey={this.state.selProfileKey}
                  store={this.props.store}/>
              </Tab>
              <Tab
                value={3}
                style={styles.tab}
                icon={<ActionCompareArrows style={styles.icon} />}
                label="Monitor" data-route="/monitor" onActive={this.handleMonitor}
              >
                <MonitorList
                  store={this.props.store}
                  onProfileClick={this.handleProfileCallback}
                  onSubscribe={this.handleSubscription}/>
              </Tab>
              <Tab
                value={4}
                style={styles.tab}
                icon={<ActionSettings style={styles.icon} />}
                label="Settings"
                data-route="/conf"
                onActive={this.handleSettings}
              >
                <SettingsPage
                  onApiUpdate={this.apiHandleUpdate}
                  store={this.props.store}/>
              </Tab>
            </Tabs>
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SafingTabs;
