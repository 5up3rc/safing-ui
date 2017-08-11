import React from 'react';
import { List } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import { countryList } from '../public/country-list';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  paper:{
    display: 'block',
    height: 'auto',
    maxWidth: 600,
    flex: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
  },
  mainContainer: {
    marginTop: 15,
    paddingBottom: 100,
  },
  headerReadonly: {
    width: 160,
    display: 'inline-block',
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  settingsPane: {
    height: 'auto',
    paddingBottom: 10,
    marginBottom: 20,
  },
  dropdownlabel: {
  },
  helpHeader: {
    paddingBottom: 20,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: 200,
    color: "grey",
    fontFamily: "Roboto, sans-serif",
  },
  button: {
    minWidth: 55,
    marginRight: 5,
    marginBottom: 5,
  },
  textField: {
    paddingLeft: 20,
    width: "90%",
  },
  textFieldNumber: {
    paddingLeft: 20,
  },
  selectField: {
    paddingLeft: 20,
  },
  ratingGroup: {
    paddingTop: 25,
  },
  ratingRow: {
    paddingLeft: 20,
  },
  ratingHeader: {
    padding: 10,
    fontSize: 14,
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  iconOff: {
    width: 30,
    height: 30,
  },
  iconOn: {
    width: 30,
    height: 30,
  },
  miniSubheader: {
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 5,
    lineHeight: '18px',
    fontSize: 12,
    fontWeight: 100,
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  textFieldReadOnly: {
    paddingLeft: 44,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  valueReadOnly: {
    paddingLeft: 22,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '30px',
    color: "rgba(0, 0, 0, 0.770588)",
    fontFamily: "Roboto, sans-serif"
  },
  textFieldNumberReadOnly: {
    paddingLeft: 44,
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
    marginLeft: 22,
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

const competenceLevelText = [
  "Beginner",
  "Basic",
  "Power User",
  "Expert"
];

const helpText = {
  EnforceCT: "Hardfail on Certificate Transparency",
	EnforceRevocation: "Hardfail on Certificate Revokation",
  DenyInsecureTLS: "Block TLS connections, that use insecure TLS versions, cipher suites, ...",
  DenyTLSWithoutSNI: "Block TLS connections that do not use SNI, connections without SNI cannot be verified as well as connections with SNI.",
  DoNotUseAssignedDNS: "Do not use DHCP Serverse assigned by DHCP",
  DoNotUseMDNS: "Do not use MDNS",
  DoNotForwardSpecialDomains: "Do not resolve special domains with assigned DNS Servers",
  AlwaysPromptAtNewProfile: "Always prompt user to review new profiles",
  DenyNetworkUntilProfileApproved: "Deny network communication until a new profile is actively approved by the user",
  CompetenceLevel: "Select CompetenceLevel",
  DNSServerRetryRate: "Amount of seconds to wait until failing DNS Servers may be retried.",
  PermanentVerdicts: "As soon as work on a link is finished, leave it to the system for performance and stability",
  Beta: "Take part in Beta",
  DNSServers: "DNS Servers to use for name resolution. Please refer to the user guide for further help. Possible values: DNS, DoH (DNS over HTTPS - using Google's syntax: https://developers.google.com/speed/public-dns/docs/dns-over-https)",
}

const levelData = [
  {
    icon: "icons/icon_fortress.png",
  },{
    icon: "icons/icon_secure.png",
  },{
    icon: "icons/icon_dynamic.png",
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

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      tag: null,
      cList: [],
      errorText: '',
      editMode: false,
      showHelp: false,
      eItem: {},
    };
  }

  onFieldChange(event,inputName) {
    let tmpObj = this.state.eItem;
    tmpObj[inputName] = event.target.value;
    this.setState({
      eItem: tmpObj
    });
  }

  onSelectFieldChange(event,key,inputName) {
    let tmpObj = this.state.eItem;
    tmpObj[inputName] = key;
    this.setState({
      eItem: tmpObj
    });
  }

  onSecurityIconTap(event,level,field) {
    let tmpObj = this.state.eItem;
    const curLevel = tmpObj[field];
    tmpObj[field] = level+1;
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

/*
  onChange = (event) => {
    if (event.target.value.match(/[a..z]/)) {
      this.setState({ errorText: '' })
    } else {
      this.setState({ errorText: 'Invalid format: ###-###-####' })
    }
  }
*/

  menuItems = (values) => {
    return Object.entries(countryList).map((item) => (
      <MenuItem
        key={item[0]}
        insetChildren={true}
        checked={values && values.includes(item[0])}
        value={item[0]}
        style={styles.menuItem}
        primaryText={item[1]}
        label={item[0]}
      />
    ));
  }

  handleCountryChange = (event, index, cList) => this.setState({cList});

  handleClose = () => {
    this.setState({
      editMode: false,
      showHelp: false,
      eItem: {}
    });
  }

  handleInfoClick = () => {
    const newShowHelpStatus = !this.state.showHelp;
    this.setState({
      showHelp: newShowHelpStatus,
    });
  };

  handleEditButtonClick = () => {
    if (!this.state.editMode) {
      const tmpItem = this.props.configList["config"];
      this.setState({
        editMode: true,
        eItem: {
          EnforceCT: nullToEmptyStr(tmpItem.EnforceCT),
          EnforceRevocation: nullToEmptyStr(tmpItem.EnforceRevocation),
          DenyInsecureTLS: nullToEmptyStr(tmpItem.DenyInsecureTLS),
          DenyTLSWithoutSNI:  nullToEmptyStr(tmpItem.DenyTLSWithoutSNI),
          DoNotUseAssignedDNS: nullToEmptyStr(tmpItem.DoNotUseAssignedDNS),
          DoNotUseMDNS: nullToEmptyStr(tmpItem.DoNotUseMDNS),
          DoNotForwardSpecialDomains: nullToEmptyStr(tmpItem.DoNotForwardSpecialDomains),
          AlwaysPromptAtNewProfile: nullToEmptyStr(tmpItem.AlwaysPromptAtNewProfile),
          DenyNetworkUntilProfileApproved: nullToEmptyStr(tmpItem.DenyNetworkUntilProfileApproved),
          CompetenceLevel: nullToZero(tmpItem.CompetenceLevel),
          DNSServerRetryRate: nullToZero(tmpItem.DNSServerRetryRate),
          PermanentVerdicts: nullToFalse(tmpItem.PermanentVerdicts),
          Beta: nullToFalse(tmpItem.Beta),
          DNSServers: arrToStr(tmpItem.DNSServers),
        },
      });
    } else {
      let adaptedFieldObj = {
        DNSServers: returnArr(this.state.eItem.DNSServers),
      }
      let tmpMergedObj = {...this.props.item, ...this.state.eItem, ...adaptedFieldObj};
      this.setState({
        editMode: false,
        showHelp: false,
        eItem: {},
      });
      if (this.props.onApiUpdate!=null){
        this.props.onApiUpdate("/Me/Configuration:config","/Me/Configuration:config",tmpMergedObj);
      }
    }
  }

  renderSelectField = (field) => {
    if (this.state.editMode) {
      return (
        <div>
          <SelectField
            style={styles.selectField}
            floatingLabelText="Competence Level"
            value={this.state.eItem[field]}
            onChange={(e, key) => this.onSelectFieldChange(e, key, field)}
            autoWidth={true}
          >
          {competenceLevelText.map((item,index) => {
            return (
              <MenuItem
                key={index}
                value={index}
                primaryText={item} />
              );
            })}
          </SelectField>
          {this.state.showHelp ? <div style={styles.helpHeader}>{helpText[field]}</div> : null }
        </div>
      )
    } // else
    const curConf = this.props.configList["config"];
    return (
      <div>
        <span style={styles.headerReadonly}>Competence level: </span>
        <span style={styles.valueReadOnly}>{competenceLevelText[curConf[field]]}</span>
      </div>
    )
  }

  renderRightButton = () => {
    return (
      <ToolbarGroup lastChild>
        {!this.state.editMode ? null : (
          <FlatButton
            backgroundColor={"white"}
            label="Cancel"
            onTouchTap={this.handleClose}
          />
        )}
        <FlatButton
          backgroundColor={"white"}
          label={this.state.editMode ? "Save" : null}
          icon={this.state.editMode ? null : <ContentCreate />}
          onTouchTap={this.handleEditButtonClick}
        />
      </ToolbarGroup>
    )
  }

  renderIconButton = (level,field) => {
    const icon = levelData[level].icon;
    if (!this.state.editMode){
      const curC = this.props.configList["config"];
      const isSet = (curC[field]>level);
      return (
        <RaisedButton
          icon={<img src={icon} style={isSet ? styles.iconOn : styles.iconOff} className="icon" />}
          style={styles.button}
          disabledBackgroundColor={isSet ? "lightgreen" : "lightcoral"}
          disabled={true}
        />
      )
    } else if (this.state.eItem[field]>level){
      return (
        <RaisedButton
          icon={<img src={icon} style={styles.iconOn} className="icon" />}
          onTouchTap={(e) => this.onSecurityIconTap(e, level, field)}
          backgroundColor={"lightgreen"}
          style={styles.button}
        />
      )
    } // else
    return (
      <RaisedButton
        icon={<img src={icon} style={styles.iconOff} className="icon" />}
        onTouchTap={(e) => this.onSecurityIconTap(e, level, field)}
        backgroundColor={"lightcoral"}
        style={styles.button}
      />
    )
  };

  renderRating = (titleStr,field) => {
    return (
      <div style={styles.ratingRow}>
        <span style={styles.grpDiv}>
          {this.renderIconButton(0,field)}
          {this.renderIconButton(1,field)}
          {this.renderIconButton(2,field)}
        </span>
        <span style={styles.ratingHeader}>{titleStr}</span>
        {this.state.showHelp ? <div style={styles.helpHeader}>{helpText[field]}</div> : null }
      </div>
    )
  }

  renderNumberField = (label,hint,field) => {
    if (!this.state.editMode){
      const curC = this.props.configList["config"];
      return (
        <div>
          <span style={styles.headerReadonly}>{label}: </span>
          <span style={styles.valueReadOnly}>{curC[field]}</span>
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
        {this.state.showHelp ? <div style={styles.helpHeader}>{helpText[field]}</div> : null }
      </div>
    )
  };

  renderTextField = (label,hint,field) => {
    if (!this.state.editMode){
      const curC = this.props.configList["config"];
      if (curC[field].length>0) {
        let useValue = curC[field];
        if (Array.isArray(useValue) && (useValue.length>0)) {
          useValue = useValue.join()
        }
        return (
          <div>
            <Subheader style={styles.subheader}>{label}</Subheader>
            <div style={styles.textFieldReadOnly}>{useValue}</div>
          </div>
        )
      } // else
      return null;
    } // else
    return (
      <div>
        <TextField
          value={nullToEmptyStr(this.state.eItem[field])}
          onChange={(e) => this.onFieldChange(e, field)}
          style={styles.textField}
          hintText={hint}
          floatingLabelFixed={this.state.showHelp}
          floatingLabelText={label}
        />
        {this.state.showHelp ? <div style={styles.helpHeader}>{helpText[field]}</div> : null }
      </div>
    )
  };

  renderCheckBox = (header,textStr,field) => {
    if (!this.state.editMode){
      const curC = this.props.configList["config"];
      if (curC[field]){
        return (
          <div>
            <span style={styles.headerReadonly}>{header}: </span>
            <span style={styles.valueReadOnly}>{textStr}</span>
          </div>
        )
      } // else
      return null;
    } // else
    return (
      <div>
        {this.state.showHelp ? null : <Subheader style={styles.miniSubheader}>{header}</Subheader>}
        <Checkbox
          checked={nullToEmptyStr(this.state.eItem[field])}
          onCheck={(e, checked) => this.onCheck(e, checked, field)}
          style={styles.checkbox}
          labelStyle={styles.checkboxLabel}
          label={textStr}
        />
        {this.state.showHelp ? <div style={styles.helpHeader}>{helpText[field]}</div> : null}
      </div>
    )
  }

  renderInfoButton = () => {
    if (this.state.editMode){
      return (
        <ActionInfoOutline style={styles.info} onTouchTap={this.handleInfoClick}/>
      )
    } // else
    return null;
  }

/*
  <div>
    <SelectField
      style={styles.selectField}
      floatingLabelText="Blacklisted countries"
      multiple={true}
      hintText="Select countries"
      value={this.state.cList}
      onChange={this.handleCountryChange}
      autoWidth={true}
    >
      {this.menuItems(this.state.cList)}
    </SelectField>
  </div>
*/

  render() {
    if ((this.props.configList==null) || (this.props.configList["config"]==null)){
      return null
    } else {
      const curC = this.props.configList["config"];
      return (
        <div style={styles.mainContainer}>
          <Paper zDepth={2} style={styles.paper}>
            <div style={styles.settingsPane}>
              <Toolbar>
                <ToolbarGroup/>
                {this.renderRightButton()}
              </Toolbar>
              {this.renderInfoButton()}
              <div style={styles.ratingGroup}>
                {this.renderRating("Enforce Certificate Transparency","EnforceCT")}
                {this.renderRating("Enforce Certificate Revokation","EnforceRevocation")}
                {this.renderRating("Ignore insecure TLS connections","DenyInsecureTLS")}
                {this.renderRating("Enforce SNI for TLS connections","DenyTLSWithoutSNI")}
                {this.renderRating("Ignore DHCP Servers assigned by DHCP","DoNotUseAssignedDNS")}
                {this.renderRating("Ignore MDNS","DoNotUseMDNS")}
                {this.renderRating("Ignore special domains with assigned DNS Servers","DoNotForwardSpecialDomains")}
                {this.renderRating("Always prompt at new profile","AlwaysPromptAtNewProfile")}
                {this.renderRating("Ignore connections until profile is approved","DenyNetworkUntilProfileApproved")}
              </div>
              {this.renderSelectField("CompetenceLevel")}
              <div>
                {this.renderCheckBox("Beta testing","Join as beta tester","Beta")}
              </div>
              <div>
                {this.renderCheckBox("Optimization","Enable permanent verdicts","PermanentVerdicts")}
              </div>
              {this.renderTextField("DNS Servers","List of servers to use","DNSServers")}
              <div>
                {this.renderNumberField("DNS Server retry rate","time in seconds","DNSServerRetryRate")}
              </div>
            </div>
          </Paper>
        </div>
      );
    }
  }
}
