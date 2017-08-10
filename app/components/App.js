import React from 'react';
import '../App.css';
import SafingTabs from '../containers/safing-tabs';

import * as actionTypes from '../constants/actionTypes';

/*
Connection states:
 0 - disconnected
 1 - awaitReady
 2 - ready
 3 - error
 4 - awaitDisconnect
*/

// cmdFIFO -> First in, first out cmdline buffer for the websocket
// Already seeded with the first initial commandlines
const initState = {
      sessionIdStr: "",
      curCmdStr: "",
      responseText: "",
      errorText: "",
      connState: 0,
      prevState: 0,
      cmdFIFO: [
        "start",
        "subscribe|/Me/",
        "subscribe|/Data/Profiles/",
        "subscribe|/Run/Processes/*"
      ],
    };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  parseResultStr = (parseStr,curMode) => {
    let tmpMsg = parseStr.split("|");
    if (tmpMsg.length>0) {
      let checkRegexp = /\w*\|\/([^\|]+)/g;
//console.log(str);
      let match = checkRegexp.exec(parseStr);
      let retJson = {};
      if (match!=null) {
        let tmpStr = match[1];
        let tmpPath = tmpStr.split("/");
        var retStr = parseStr.replace(/.*?{/,"{");
        if (curMode<3){
          if ((retStr.length>0) && (retStr.indexOf("{")>=0)) {
            retJson = JSON.parse(retStr);
          }
        }
        if (tmpPath.length>4) {
          let checkIdRegexp = /Process\:(\d+)\/Connection\:(.+?)\//g;
          let matchId = checkIdRegexp.exec(tmpStr);
          if (matchId!=null) {
            let tmpIdStr = matchId[1] + "/" +matchId[2];
            retJson.parentId = tmpIdStr;
            let linkIdStr = tmpStr.replace(/.*\/Link\:/,"");
            if (curMode==3){
              this.props.store.dispatch({
                type: actionTypes.DEL_LINK_DEF,
                id: linkIdStr,
              });
            } else if (curMode<3){
              this.props.store.dispatch({
                type: actionTypes.LINK_DEF,
                id: linkIdStr,
                obj: retJson
              });
            }
          }
        } else if (tmpPath.length==4) {
          let checkIdRegexp = /Process\:(\d+)/g;
          let matchId = checkIdRegexp.exec(tmpStr);
          let tmpIdStr = "";
          if (matchId!=null) {
            tmpIdStr = matchId[1];
            retJson.parentId = tmpIdStr;
          }
          let connIdStr = tmpIdStr +"/" + tmpStr.replace(/Run\/Processes\/Process\:(\d+)\/Connection\:/,"");
          if (curMode==3){
            this.props.store.dispatch({
              type: actionTypes.DEL_CONN_DEF,
              id: connIdStr,
            });
console.log(connIdStr)
          } else if (curMode<3){
            this.props.store.dispatch({
              type: actionTypes.CONN_DEF,
              id: connIdStr,
              obj: retJson
            });
          }
        } else if (tmpPath.length==3) {
          switch (tmpPath[1]) {
            case "Profiles":
              let profIdStr = tmpStr.replace(/Data\/Profiles\/Profile\:/,"");
              if (curMode==3){
                this.props.store.dispatch({
                  type: actionTypes.DEL_PROFILE_DEF,
                  id: profIdStr,
                });
              } else if (curMode<3){
                this.props.store.dispatch({
                  type: actionTypes.PROFILE_DEF,
                  id: profIdStr,
                  obj: retJson
                });
              }
              break;
            case "Processes":
              let procIdStr = tmpStr.replace(/Run\/Processes\/Process\:/,"");
              if (curMode==3){
                this.props.store.dispatch({
                  type: actionTypes.DEL_PROC_DEF,
                  id: procIdStr,
                });
              } else if (curMode<3){
                this.props.store.dispatch({
                  type: actionTypes.PROC_DEF,
                  id: procIdStr,
                  obj: retJson
                });
              }
              break;
          }
        } else if (tmpPath.length==2) {
          if (tmpPath[1]=="Configuration:default"){
            if (curMode<3){
              this.props.store.dispatch({
                type: actionTypes.CONFIG_DEF,
                id: "default",
                obj: retJson
              });
            }
          } else if (tmpPath[1]=="Configuration:config"){
            if (curMode<3){
              this.props.store.dispatch({
                type: actionTypes.CONFIG_DEF,
                id: "config",
                obj: retJson
              });
            }
          } else if (tmpPath[1]=="SystemStatus:status"){
            if (curMode<3){
              this.props.store.dispatch({
                type: actionTypes.STATUS_DEF,
                id: "status",
                obj: retJson
              });
            }
          }
        }
      }
    }
  }

  parseMode = (parseStr) => {
    let tmpMsg = parseStr.split("|");
    let curMode = -1;
    if (tmpMsg.length>0) {
      switch (tmpMsg[0]) {
        case "created":
          curMode = 0;
          break;
        case "current":
          curMode = 1;
          break;
        case "updated":
          curMode = 2;
          break;
        case "deleted":
          curMode = 3;
          break;
        case "error":
          curMode = 4;
          break;
        case "notify":
          curMode = 5;
          break;
        case "session":
          curMode = 6;
          break;
      }
    }
    return curMode;
  }

  watchdogTimer = () => {
  if (this.state.connState==4){ // awaitDisconnect
    this.socket = null; // remove the WebSocket
    this.setState(initState);
  } else if (this.state.connState==2){ // ready
      if (this.state.cmdFIFO.length>0){
        let tmpCmdList = this.state.cmdFIFO;
        const curCmd = tmpCmdList.shift();
        console.log('send cmd '+curCmd);
        this.socket.send(curCmd);
        this.setState({
          curCmdStr: curCmd,
          cmdFIFO: tmpCmdList,
          prevState: 2,
          connState: 1, // awaitReady
        })
      }
    } else if (this.state.connState==0){ // Disconnected
console.log("disconnected")
      this.socket = new WebSocket('ws://localhost:18/api/v1');
      this.socket.onmessage = e => {
        let tmpReader = new FileReader();
        tmpReader.onload = (e) => {
          const curMode = this.parseMode(e.target.result);
          const tmpPrevState = this.state.connState;
          if (curMode==6){
            this.setState({
              sessionIdStr: e.target.result,
              responseText: e.target.result,
              prevState: tmpPrevState,
              connState: 2, // ready
            })
          } else {
            this.setState({
              responseText: e.target.result,
              prevState: tmpPrevState,
              connState: 2, // ready
            })
          }
          if ((curMode>=0) && (curMode<=3)){
            this.parseResultStr(e.target.result,curMode)
          }
          console.log("ready");
        };
        tmpReader.readAsText(e.data);
      };
      this.socket.onopen = (evt) => {
        console.log('onopen');
        console.log(evt);
        console.log(this.state);
        this.setState({
          prevState: 1,
          connState: 2, // ready
          cmdFIFO: [
            "start",
            "subscribe|/Me/",
            "subscribe|/Data/Profiles/",
            "subscribe|/Run/Processes/*"
          ],
        })
      };
      this.socket.onclose = (evt) => {
        console.log('onclose');
        console.log(evt);
        const tmpPrevState = this.state.connState;
        this.setState({
          prevState: tmpPrevState,
          connState: 4, // awaitDisconnect
        })
      };
      this.socket.onerror = (evt) => {
        console.log('onerror');
        console.log(evt);
        const tmpPrevState = this.state.connState;
        this.setState({
          errorText: evt,
          prevState: tmpPrevState,
          connState: 3, // Error
        })
      };
      console.log('awaitOpen');
      this.setState({
        prevState: 0,
        connState: 1, // awaitReady
      })
    }
  }

  componentDidMount(){
    let periodMs = 300;
    if (this.state.connState==4){ // awaitDisconnect
      periodMs = 1000; // wait one second instead
    }
    window.setInterval(function () {
     this.watchdogTimer();
   }.bind(this), periodMs);
  }

  sendCmd = (cmdStr) => {
    let tmpCmdList = this.state.cmdFIFO;
    tmpCmdList.push(cmdStr);
    this.setState({
      cmdFIFO: tmpCmdList,
    })
    console.log(tmpCmdList);
  }

  handleSubscription = (subscStr) => {
// we would unsubscribe here - but maybe not needed any longer?
//      this.state.connection.send("unsubscribe|"+this.state.curCmdStr);
console.log(subscStr);
    this.sendCmd("subscribe|"+subscStr);
  }

  apiHandleDelete = (key) => {
    console.log("deleting");
    console.log(key);
    this.sendCmd("delete|"+key);
  }

  apiHandleUpdate = (oldKey,newKey,jsonObj) => {
    console.log(oldKey);
    console.log(newKey);
    delete jsonObj.key;
    console.log(jsonObj);
    if (oldKey==newKey){
      this.sendCmd("update|"+newKey+"|J"+JSON.stringify(jsonObj));
    } else {
      this.sendCmd("create|"+newKey+"|J"+JSON.stringify(jsonObj));
      if ((oldKey!=null) && (oldKey.length>0)){
//        this.sendCmd("delete|"+oldKey+"|J"+JSON.stringify(jsonObj));
        this.sendCmd("delete|"+oldKey);
      }
    }
  }

  render() {
    const isConnected = (
      (this.state.connState>0) && (this.state.connState<3)
      && (this.state.prevState>0) && (this.state.prevState<3))
    return (
      <SafingTabs
        connected={isConnected}
        onSubscribe={this.handleSubscription}
        onApiDelete={this.apiHandleDelete}
        onApiUpdate={this.apiHandleUpdate}
        store={this.props.store}/>
      )
  }
}

export default App;
