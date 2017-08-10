import React from 'react';
import LinkList from '../components/link-list.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state,props) {
  const { linkList } = state.safingTree;
  let tmpList = [];
  for(let [key, value] of Object.entries(linkList)) {
    value.key = key;
    tmpList.push(value);
  }
  let itemList = [];
  if ((tmpList != null) && (tmpList.length>=0)) {
    itemList = tmpList.filter((elem) => (elem.parentId===props.itemId));
  }
  return {
    itemList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList);
