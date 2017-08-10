import React from 'react';
import { ProfileItem } from './profile-item.js';
import { List } from 'material-ui/List';
import Card from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import {grey300} from 'material-ui/styles/colors';

const styles = {
  card: {
    height: '100%',
  },
  radioButton: {
    marginTop: 16,
  },
  headline: {
    marginLeft: 22,
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  dropdownlabel: {
  },
  textField: {
    width: "90%",
    marginLeft: 22,
  },
  helpHeader: {
    paddingBottom: 20,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: 200,
    color: "grey",
    fontFamily: "Roboto, sans-serif",
  },
  headerReadonly: {
    paddingLeft: 22,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif",
    display: 'inline-block',
    width: 120,
  },
  subheader: {
    paddingLeft: 22,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  icon: {
    width: 40,
    height: 40,
  },
  button: {
    marginLeft: 20,
  },
  buttonLabelOn: {
    whiteSpace: "nowrap",
  },
  buttonLabelOff: {
    whiteSpace: "nowrap",
    color: "rgba(0, 0, 0, 0.770588)",
  },
  grpFramework: {
    marginLeft: 44,
  },
  grpFrameworkInRow: {
    marginLeft: 22,
  },
  grpDivInRow: {
    display: 'inline',
  },
  grpDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 22,
    paddingBottom: 10,
  },
  textFieldNumber: {
    paddingLeft: 20,
  },
  textFieldReadOnly: {
    paddingLeft: 22,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  textButtonReadOnly: {
    paddingLeft: 22,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  checkboxLabel: {
    whiteSpace: "nowrap",
    color: "rgba(0, 0, 0, 0.770588)"
  },
  checkbox: {
    marginLeft: 20,
    width: "auto",
    maxWidth: "50%",
  },
  selectedmenuitem: {
    color: "red",
    fontWeight: 500,
    backgroundColor: "lightcyan"
  },
  info:{
    float: 'right',
    color: 'grey',
    top: 7,
    right: 15,
    position: 'relative',
    heigth: 25,
    width: 25,
  }
};

const flagIDs = {
	"System":        1,
	"Admin":         2,
	"User":          3,
	"Internet":      4,
	"LocalNet":      5,
	"Strict":        6,
	"Gateway":       7,
	"Service":       8,
	"Directconnect": 9,
	"Browser":       10,
}

const allFlags = {
	"System":        false,
	"Admin":         false,
	"User":          false,
	"Internet":      false,
	"LocalNet":      false,
	"Strict":        false,
	"Gateway":       false,
	"Service":       false,
	"Directconnect": false,
	"Browser":       false,
}

const flagNames = {
	1:        "System",
	2:         "Admin",
	3:          "User",
	4:      "Internet",
	5:      "LocalNet",
	6:        "Strict",
	7:       "Gateway",
	8:       "Service",
	9: "Directconnect",
	10:       "Browser",
}

// If one exclusive flag is set, then remove the other flags (within this range)
const exclusiveFlags = [ 1, 2, 3 ];

/*
No help text for these:
 Name: "",
 Description: "",
 Path: "",
 SecurityLevel: "",
 DomainWhitelistIsBlacklist: "",
 Default: "",
To be added later:
 CountryBlacklist: "Do not talk to servers in these countries",
 ASBlacklist: "Do not talk to server in these AS",
*/

const helpTextFields = {
  hasFramework: "Framework apps may not connect to anything themselves, but what is executed within or by them must be identified and evaluated",
  FindParent: "get path from parent - amount of levels to go up the hirarchy (1 means parent, 2 means parent of parents, and so on)",
  MergeWithParent: "instead of getting the path of the parent, merge with it by presenting connections as if they were from that parent",
  Virtual: "Treat resulting path as virtual, do not check if val",
}

const helpTextFlags = {
  "System":        "System apps must be run by system user, else deny",
	"Admin":         "Admin apps must be run by user with admin privileges, else deny",
	"User":          "User apps must be run by user (identified by having an active safing UI), else deny",
	"Internet":      "Internet apps may connect to the Internet, if unset, all connections to the Internet are denied",
	"LocalNet":      "LocalNet apps may connect to the local network (i.e. private IP address spaces), if unset, all connections to the local network are denied",
	"Strict":        "Strict apps may only connect to domains that are related to themselves",
	"Gateway":       "Gateway apps will connect to user-defined servers",
	"Service":       "Service apps may accept incoming connections",
	"Directconnect": "Directconnect apps may connect to any IP without dns association (e.g. P2P apps, network analysis tools)",
	"Browser":       "Browser apps connect to multitudes of different servers and require special handling",
}

const levelData = [
  {
    icon: "icons/icon_dynamic.png",
  },{
    icon: "icons/icon_secure.png",
  },{
    icon: "icons/icon_fortress.png",
  }
];

function nullToEmptyStr(str){
  if (str==null){
    return ""
  } // else
  return str;
}

function nullToFalse(val){
  if (val!=null){
    return val;
  } // else
  return false
}

function nullToZero(val){
  if (val!=null){
    return val;
  } // else
  return 0
}

function arrToStr(arr){
  if ((arr!=null) && (arr.length>0)) {
    return arr.join();
  } // else
  return ""
}

function returnArr(str){
  return !str ? [] : str.split(',')
}

function stringToUtf8ByteArray(str) {
  var out = [], p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
}

function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

class ProfileConfigDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      showHelp: false,
      eItem: {},
      eFlags: {},
      titleStrError: false,
      pathStrError: false,
    };
  }

  wantHelp = (field) => {
    let retVal = false;
    if ((helpTextFields[field]!=null) && (helpTextFields[field].length>0)) {
      retVal = this.state.showHelp;
    }
    return retVal;
  }

  handleInfoClick = () => {
    const newShowHelpStatus = !this.state.showHelp;
    this.setState({
      showHelp: newShowHelpStatus,
    });
  };

  onFieldChange(event,inputName) {
    let tmpObj = this.state.eItem;
    tmpObj[inputName] = event.target.value;
    let tmpTitleStrError = this.state.titleStrError;
    let tmpPathStrError = this.state.pathStrError;
    if (inputName=="Name"){
      tmpTitleStrError = ((event.target.value==null) || (event.target.value.length==0));
    } else if (inputName=="Name"){
      tmpPathStrError = ((event.target.value==null) || (event.target.value.length==0));
    }
    this.setState({
      eItem: tmpObj,
      titleStrError: tmpTitleStrError,
      pathStrError: tmpPathStrError,
    });
  }

  onSecurityIconTap(event,level) {
    let tmpObj = this.state.eItem;
    tmpObj.SecurityLevel = level;
    this.setState({
      eItem: tmpObj
    });
  }

  onCheck(event,isChecked,inputName) {
    let tmpObj = this.state.eItem;
    tmpObj[inputName] = isChecked;
    this.setState({
      eItem: tmpObj
    });
  }

  onTextButtonOn(event,flagName) {
    let tmpObj = this.state.eFlags;
    const tmpInx = flagIDs[flagName];
    if ((exclusiveFlags.indexOf(tmpInx))>=0) {
      exclusiveFlags.map((item) => {
        tmpObj[flagNames[item]] = false
      })
    }
    tmpObj[flagName] = true;
    this.setState({
      eFlags: tmpObj
    });
  }

  onTextButtonOff(event,flagName) {
    let tmpObj = this.state.eFlags;
    tmpObj[flagName] = false;
    this.setState({
      eFlags: tmpObj
    });
  }

  renderNumberField = (label,hint,field) => {
    if (!this.state.editMode){
      return (
        <div>
          <span style={styles.headerReadonly}>{label}</span>
          <span style={styles.textFieldReadOnly}>{this.props.item[field]}</span>
        </div>
      )
    } // else
    return (
      <div>
        <TextField
          value={nullToEmptyStr(this.state.eItem[field])}
          onChange={(e) => this.onFieldChange(e, field)}
          type="number"
          style={styles.textFieldNumber}
          hintText={hint}
          floatingLabelFixed={this.state.showHelp}
          floatingLabelText={label}
        />
        {this.wantHelp(field) ? <div style={styles.helpHeader}>{helpTextFields[field]}</div> : null }
      </div>
    )
  };

  renderTextField = (label,hint,field,errorText) => {
    if (!this.state.editMode){
      let useValue = this.props.item[field];
      if (Array.isArray(useValue) && (useValue.length>0)) {
        useValue = useValue.join()
      }
      return (
        <div>
          <span style={styles.headerReadonly}>{label}</span>
          <span style={styles.textFieldReadOnly}>{useValue}</span>
        </div>
      )
    } // else
    const errTextStr = "This field is required";
    let isRequired = false;
    if ((field=="Name") && (this.state.titleStrError)){
      isRequired=true
    } else if ((field=="Path") && (this.state.pathStrError)){
      isRequired=true
    }
    return (
      <div>
        <TextField
          value={nullToEmptyStr(this.state.eItem[field])}
          onChange={(e) => this.onFieldChange(e, field)}
          style={styles.textField}
          hintText={hint}
          floatingLabelFixed={this.state.showHelp}
          errorText={isRequired ? errTextStr : null}
          floatingLabelText={label}
        />
        {this.wantHelp(field) ? <div style={styles.helpHeader}>{helpTextFields[field]}</div> : null }
      </div>
    )
  };

  renderIconButton = (level) => {
    const icon = levelData[level].icon;
    if (!this.state.editMode){
      if (this.props.item.SecurityLevel==level){
        return (
          <RaisedButton
            icon={<img src={icon} style={styles.icon} className="icon" />}
            style={styles.button}
            backgroundColor={grey300}
            disabled={true}
            labelStyle={styles.buttonLabelOff}
          />
        )
      } // else
      return null;
    } else if (this.state.eItem.SecurityLevel==level){
      return (
        <RaisedButton
          icon={<img src={icon} style={styles.icon} className="icon" />}
          onTouchTap={(e) => this.onSecurityIconTap(e, level)}
          backgroundColor={"rgb(140, 220, 201)"}
          style={styles.button}
          labelStyle={styles.buttonLabelOn}
        />
      )
    } // else
    return (
      <RaisedButton
        icon={<img src={icon} style={styles.icon} className="icon" />}
        onTouchTap={(e) => this.onSecurityIconTap(e, level)}
        style={styles.button}
        backgroundColor={grey300}
        labelStyle={styles.buttonLabelOff}
      />
    )
  };

  renderCheckBox = (textStr,field) => {
    if (!this.state.editMode){
      if (this.props.item[field]){
        return (<span style={styles.textFieldReadOnly}>{textStr}</span>)
      } // else
      return null;
    } // else
    return (
      <div>
        <Checkbox
          checked={this.state.eItem[field]}
          onCheck={(e, checked) => this.onCheck(e, checked, field)}
          style={styles.checkbox}
          labelStyle={styles.checkboxLabel}
          label={textStr}
        />
        {this.wantHelp(field) ? <div style={styles.helpHeader}>{helpTextFields[field]}</div> : null}
      </div>
    )
  }

  renderTextButton = (textStr,flagName) => {
    if (!this.state.editMode){
      if ((this.props.item.Flags!=null) && (this.props.item.Flags.includes(flagIDs[flagName]))){
        return (<span style={styles.textButtonReadOnly}>{textStr}</span>)
      } // else
      return null;
    } else if (this.state.eFlags[flagName]){
      return (
        <div>
          <RaisedButton
            label={textStr}
            primary={true}
            style={styles.button}
            onTouchTap={(e) => this.onTextButtonOff(e, flagName)}
            labelStyle={styles.buttonLabelOn}
          />
          {this.state.showHelp ? <div style={styles.helpHeader}>{helpTextFlags[flagName]}</div> : null}
        </div>
      )
    } // else
    return (
      <div>
        <RaisedButton
          label={textStr}
          style={styles.button}
          backgroundColor={grey300}
          onTouchTap={(e) => this.onTextButtonOn(e, flagName)}
          labelStyle={styles.buttonLabelOff}
        />
        {this.state.showHelp ? <div style={styles.helpHeader}>{helpTextFlags[flagName]}</div> : null}
      </div>
    )
  }

  renderHeader = (headerStr) => {
    if (!this.state.editMode){
      return <span style={styles.headerReadonly}>{headerStr}</span>
    } // else
    return <Subheader style={styles.subheader}>{headerStr}</Subheader>
  }

  handleClose = () => {
    this.setState({
      editMode: false,
      showHelp: false,
      eItem: {},
    });
    if (this.props.onEditModeChange!=null){
      this.props.onEditModeChange(false)
    }
  }

  handleDelete = () => {
    this.setState({
      editMode: false,
      showHelp: false,
      eItem: {},
    });
    if (this.props.onEditModeChange!=null){
      this.props.onEditModeChange(false)
    }
console.log("delete /Data/Profiles/Profile:"+this.props.item.key);
    this.props.onApiDelete("/Data/Profiles/Profile:"+this.props.item.key);
  }

  handleAdd = () => {
    console.log("Clicked on add button")
    let tmpFlags = Object.assign({}, allFlags);
    this.setState({
      editMode: true,
      showHelp: false,
      eItem: {
        Name: "",
        Description: "",
        Path: "",
        SecurityLevel: 0,
        DomainWhitelist: "",
        DomainWhitelistIsBlacklist: false,
        Default: false,
        ConnectPorts: "",
        ListenPorts: "",
        hasFramework: false,
        Build: "",
        Find:"",
        FindParent: 0,
        MergeWithParent: false,
        Virtual: false,
        ThisWasCreatedJustNow: true,
      },
      eFlags: {tmpFlags},
      titleStrError: false,
      pathStrError: false,
    });
    if (this.props.onEditModeChange!=null){
      this.props.onEditModeChange(true)
    }
  }

  handleEditButtonClick = () => {
    let newEditModeStatus = !this.state.editMode
    if (newEditModeStatus) {
      const tmpItem = this.props.item;
      let tmpFlags = Object.assign({}, allFlags);
      if (this.props.item.Flags!=null){
        this.props.item.Flags.map((item) => {
          tmpFlags[flagNames[item]] = true
        })
      }
      this.setState({
        editMode: true,
        eItem: {
          Name: nullToEmptyStr(tmpItem.Name),
          Description: nullToEmptyStr(tmpItem.Description),
          Path: nullToEmptyStr(tmpItem.Path),
          SecurityLevel:  nullToZero(tmpItem.SecurityLevel),
          DomainWhitelist: arrToStr(tmpItem.DomainWhitelist),
          DomainWhitelistIsBlacklist: nullToFalse(tmpItem.DomainWhitelistIsBlacklist),
          Default: nullToFalse(tmpItem.Default),
          ConnectPorts: arrToStr(tmpItem.ConnectPorts),
          ListenPorts: arrToStr(tmpItem.ListenPorts),
          hasFramework: nullToFalse(tmpItem.hasFramework),
          Build: nullToEmptyStr(tmpItem.Build),
          Find:nullToEmptyStr(tmpItem.Find),
          FindParent: nullToZero(tmpItem.FindParent),
          MergeWithParent: nullToFalse(tmpItem.MergeWithParent),
          Virtual: nullToFalse(tmpItem.Virtual),
        },
        eFlags: tmpFlags,
        titleStrError: false,
        pathStrError: false,
      });
    } else {
      if (this.state.eItem.Name.length==0){
        newEditModeStatus = true;
        this.setState({
          titleStrError: true,
        });
      } else if (this.state.eItem.Path.length==0){
        newEditModeStatus = true;
        this.setState({
          pathStrError: true,
        });
      } else {
        let adaptedFieldObj = {
          DomainWhitelist: returnArr(this.state.eItem.DomainWhitelist),
          ConnectPorts: returnArr(this.state.eItem.ConnectPorts),
          ListenPorts: returnArr(this.state.eItem.ListenPorts),
          Framework: {
            Build: nullToEmptyStr(this.state.eItem.Build),
            Find:nullToEmptyStr(this.state.eItem.Find),
            FindParent: nullToZero(this.state.eItem.FindParent),
            MergeWithParent: nullToFalse(this.state.eItem.MergeWithParent),
            Virtual: nullToFalse(this.state.eItem.Virtual),
          }
        };
        let tmpMergedObj = {...this.props.item, ...this.state.eItem, ...adaptedFieldObj};
        if (!this.state.eItem.hasFramework){
          tmpMergedObj.Framework = undefined;
        }
        let tmpFlagArr = [];
        for(let [key, value] of Object.entries(this.state.eFlags)) {
          if (value){
            tmpFlagArr.push(flagIDs[key]);
          }
        }
        tmpMergedObj.Flags=tmpFlagArr;
        let tmpKey = tmpMergedObj.key;
        if (tmpMergedObj.ThisWasCreatedJustNow){
          // make sure not to keep any old keys, if this profile is just created
          delete tmpMergedObj.ThisWasCreatedJustNow;
          tmpKey = "";
        }
        // delete the flattened Framework fields
        delete tmpMergedObj.Build;
        delete tmpMergedObj.Find;
        delete tmpMergedObj.FindParent;
        delete tmpMergedObj.MergeWithParent;
        delete tmpMergedObj.Virtual;
        this.setState({
          editMode: false,
          showHelp: false,
          eItem: {},
          eFlags: {},
        });
        if (this.props.onApiUpdate!=null){
          const keyBuffer = stringToUtf8ByteArray(tmpMergedObj.Path);
          let hexStr = toHexString(keyBuffer);
          if (tmpMergedObj.Default){
            hexStr = "d-"+hexStr;
          }
          this.props.onApiUpdate("/Data/Profiles/Profile:"+tmpKey,
                                  "/Data/Profiles/Profile:"+hexStr,
                                  tmpMergedObj);
        }
      }
    }
    if (this.props.onEditModeChange!=null){
      this.props.onEditModeChange(newEditModeStatus)
    }
  }

  renderInfoButton = () => {
    if (this.state.editMode){
      return (
        <ActionInfoOutline style={styles.info} onTouchTap={this.handleInfoClick}/>
      )
    } // else
    return null;
  }

  renderLeftComponents = () => {
    let curTitle = "";
    if (this.props.item!=null){
      curTitle= this.props.item.Name;
    }
    if (this.state.editMode){
      return (
        <ToolbarGroup>
          {this.renderTextField("Profile name","the name of this profile","Name")}
        </ToolbarGroup>
      )
    } // else
    return (
      <ToolbarGroup>
        <ToolbarTitle text={curTitle}/>
      </ToolbarGroup>
    )
  }

  renderRightButton = () => {
/*
<FloatingActionButton style={styles.fab}>
  <ContentCreate/>
</FloatingActionButton>
*/
    return (
      <ToolbarGroup lastChild>
        {!this.state.editMode ? null : (
          <FlatButton
            backgroundColor={"white"}
            icon={<ActionDelete />}
            onTouchTap={this.handleDelete}
          />
        )}
        {!this.state.editMode ? null : (
          <FlatButton
            backgroundColor={"white"}
            label="Cancel"
            onTouchTap={this.handleClose}
          />
        )}
        {this.state.editMode ? null : (
          <FlatButton
            backgroundColor={"white"}
            icon={<ContentAdd />}
            onTouchTap={this.handleAdd}
          />
        )}
        <FlatButton
          backgroundColor={"white"}
          label={this.state.editMode ? "Save" : null}
          icon={this.state.editMode ? null : <ContentCreate />}
          disabled={this.props.item==null}
          onTouchTap={this.handleEditButtonClick}
        />
      </ToolbarGroup>
      )
  }

  render() {
    const curP = this.props.item;
    const isE = this.state.editMode;
    let isF = false;
    const hasItem = ((curP!=null) || (isE));
    let whiteListStr = "Whitelist";
    if (hasItem){
      if (isE){
        isF = this.state.eItem.hasFramework;
      } else {
        isF = this.props.item.hasFramework;
        whiteListStr = (curP.DomainWhitelistIsBlacklist ? "Black" : "White")+"list";
      }
    }
/*
Orphaned:false
PromptUserToAdapt:false
*/
    return (
      <Card style={styles.card}>
        <Toolbar>
          {this.renderLeftComponents()}
          {this.renderRightButton()}
        </Toolbar>
        {!hasItem ? <div/> : (
          <div>
            {this.renderInfoButton()}
            <div>
              {this.renderTextField("Description","profile description","Description")}
              {this.renderTextField("Path","profile path","Path")}
            </div>
            {this.renderHeader("Security Level")}
            <span style={isE ? styles.grpDiv : styles.grpDivInRow}>
              {this.renderIconButton(0)}
              {this.renderIconButton(1)}
              {this.renderIconButton(2)}
              {isE ? null : <br/>}
            </span>
            {this.renderHeader("Profile Type")}
            <span style={isE ? styles.grpDiv : styles.grpDivInRow}>
              {this.renderCheckBox("Default","Default")}
              {this.renderCheckBox("Framework","hasFramework")}
              {isE ? null : <br/>}
            </span>
            {(!isF)? null : (
              <div style={isE ? styles.grpFramework : styles.grpFrameworkInRow}>
                {this.renderTextField("Find","Regular expression for finding path elements","Find")}
                {this.renderTextField("Build","Path definitions for building path","Build")}
                {this.renderCheckBox("Virtual","Virtual")}
                {this.renderNumberField("Find parent level","Max levels for searching parent","FindParent")}
                {this.renderCheckBox("Merge with parent","MergeWithParent")}
                {isE ? null : <br/>}
              </div>
            )}
            {this.renderHeader("User level")}
            <span style={isE ? styles.grpDiv : styles.grpDivInRow}>
              {this.renderTextButton("System","System")}
              {this.renderTextButton("Admin","Admin")}
              {this.renderTextButton("User","User")}
              {isE ? null : <br/>}
            </span>
            {this.renderHeader("Usage areas")}
            <span style={isE ? styles.grpDiv : styles.grpDivInRow}>
              {this.renderTextButton("Internet","Internet")}
              {this.renderTextButton("Local net","LocalNet")}
              {isE ? null : <br/>}
            </span>
            {this.renderHeader("Application Type")}
            <span style={isE ? styles.grpDiv : styles.grpDivInRow}>
              {this.renderTextButton("Strict","Strict")}
              {this.renderTextButton("Gateway","Gateway")}
              {this.renderTextButton("Browser","Browser")}
              {this.renderTextButton("Direct Connect","Directconnect")}
              {this.renderTextButton("Service","Service")}
              {isE ? null : <br/>}
            </span>
            {this.renderTextField("Domain " +whiteListStr,"List of domains","DomainWhitelist")}
            {isE ? this.renderCheckBox("Use as Blacklist instead","DomainWhitelistIsBlacklist") : null}
            {this.renderTextField("Connect ports","List of port numbers","ConnectPorts")}
            {this.renderTextField("Listen ports","List of port numbers","ListenPorts")}
          </div>
        )}
      </Card>
    );
  }
}

export default ProfileConfigDialog;
