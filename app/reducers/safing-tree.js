import * as actionTypes from '../constants/actionTypes';
import { findIndex } from 'lodash';

const initialState = {
    profileList: {},
    procList: {},
    connList: {},
    linkList: {},
    configList: {},
    statusList: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DEL_PROFILE_DEF:
      return deleteProfile(state, action);
    case actionTypes.PROFILE_DEF:
      return setProfile(state, action);
    case actionTypes.DEL_PROC_DEF:
      return deleteProc(state, action);
    case actionTypes.PROC_DEF:
      return setProc(state, action);
    case actionTypes.DEL_CONN_DEF:
      return deleteConn(state, action);
    case actionTypes.CONN_DEF:
      return setConn(state, action);
    case actionTypes.DEL_LINK_DEF:
      return deleteLink(state, action);
    case actionTypes.LINK_DEF:
      return setLink(state, action);
    case actionTypes.CONFIG_DEF:
      return setConfig(state, action);
    case actionTypes.STATUS_DEF:
      return setStatus(state, action);
  }
  return state;
}

function setProfile(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.profileList[id] = obj;
  return { ...newState };
}

function deleteProfile(state, action) {
  const { id } = action;
  let newState = state;
  delete newState.profileList[id];
  return { ...newState };
}

function setProc(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.procList[id] = obj;
  return { ...newState };
}

function deleteProc(state, action) {
  const { id } = action;
  let newState = state;
  delete newState.procList[id];
  return { ...newState };
}

function setConn(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.connList[id] = obj;
  return { ...newState };
}

function deleteConn(state, action) {
  const { id } = action;
  let newState = state;
  delete newState.connList[id];
  return { ...newState };
}

function setLink(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.linkList[id] = obj;
  return { ...newState };
}

function deleteLink(state, action) {
  const { id } = action;
  let newState = state;
  delete newState.linkList[id];
  return { ...newState };
}

function setConfig(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.configList[id] = obj;
  return { ...newState };
}

function setStatus(state, action) {
  const { id, obj } = action;
  let newState = state;
  newState.statusList[id] = obj;
  return { ...newState };
}
