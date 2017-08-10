import React from 'react';
import SafingTabs from '../components/safing-tabs';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state) {
  const { statusList } = state.safingTree;
  let itemList = [];
  for(let [key, value] of Object.entries(statusList)) {
    value.key = key;
    itemList.push(value);
  }
  return {
    statusList,
    itemList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SafingTabs);
