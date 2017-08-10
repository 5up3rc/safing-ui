import React from 'react';
import ProfileList from '../components/profile-list';
import { connect } from 'react-redux';
import * as actions from '../actions';

function mapStateToProps(state) {
  const { profileList } = state.safingTree;
  let itemList = [];
  for(let [key, value] of Object.entries(profileList)) {
    value.key = key;
    itemList.push(value);
  }
  return {
    profileList,
    itemList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
