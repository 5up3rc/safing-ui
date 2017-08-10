import React from 'react';
import ConnectionList from '../components/connection-list.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state, props) {
  const { connList } = state.safingTree;
  let tmpList = [];
  for(let [key, value] of Object.entries(connList)) {
    value.key = key;
    tmpList.push(value);
  }
  let itemList = [];
  if ((tmpList != null) && (tmpList.length>=0)) {
    itemList = tmpList.filter((elem) => ((parseInt(elem.parentId))===props.itemId));
  }
  return {
    itemList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionList);
