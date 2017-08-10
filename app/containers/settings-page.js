import React from 'react';
import { SettingsPage } from '../components/settings-page.js';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state) {
  const { configList } = state.safingTree;
  let configObj = {};
  for(let [key, value] of Object.entries(configList)) {
    value.key = key;
    configObj[key]=value;
  }
  return {
    configList,
    configObj,
  }
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
