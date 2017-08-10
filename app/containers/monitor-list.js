import React from 'react';
import { MonitorList } from '../components/monitor-list.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state) {
  const { procList } = state.safingTree;
  let itemList = [];
  for(let [key, value] of Object.entries(procList)) {
    value.key = key;
    itemList.push(value);
  }
  return {
    procList,
    itemList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorList);
