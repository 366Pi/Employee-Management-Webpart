import * as React from 'react';
import styles from './EmployeeManagement.module.scss';
import { IEmployeeManagementProps } from './IEmployeeManagementProps';
import { escape } from '@microsoft/sp-lodash-subset';

// REQUIRED IMPORTS
///////////////////////////////////////////////////////////////////////////////
import {
  ChoiceGroup,
  ComboBox,
  DatePicker,
  DefaultButton,
  Dropdown,
  IChoiceGroupOption,
  IComboBox,
  IComboBoxOption,
  IDropdownOption,
  TagPicker,
  TextField
} from 'office-ui-fabric-react';
import { IEmployeeManagementState } from './IEmployeeManagementState';

import { Web } from '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
///////////////////////////////////////////////////////////////////////////////

// INITIALIZE BOOTSTRAP
///////////////////////////////////////////////////////////////////////////////
// import the reference to jquery.js and bootstrap.js
import * as $ from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { padStart } from 'lodash';

// specify css which comes with bootstrap and fontawesome
// faced problems using require and giving absolute path of css files
// system could not find the files

SPComponentLoader.loadCss(
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
);
SPComponentLoader.loadCss(
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
);
require('bootstrap');

// dummy function to kickstart jquery
const GetIPAddress = (): void => {
  var call = $.ajax({
    url: 'https://api.ipify.org/?format=json',
    method: 'GET',
    async: false,
    dataType: 'json',
    success: (data) => {
      console.log('IP Address : ' + data.ip);
      // ipaddress = data.ip;
    },
    error: (textStatus, errorThrown) => {
      console.log(
        'Ip Address fetch failed : ' + textStatus + '--' + errorThrown
      );
    }
  }).responseJSON;
};
///////////////////////////////////////////////////////////////////////////////

const GenderDropdownOptions: IDropdownOption[] = [
  { key: 'Male', text: 'Male' },
  { key: 'Female', text: 'Female' },
  { key: 'Others', text: 'Others' }
];

const EthnicityDropdownOptions: IDropdownOption[] = [
  { key: 'Hindu', text: 'Hindu' },
  { key: 'Muslim', text: 'Muslim' },
  { key: 'Christian', text: 'Christian' },
  { key: 'Sikh', text: 'Sikh' },
  { key: 'Sarna', text: 'Sarna' },
  { key: 'Not Available', text: 'Not Available' }
];

const BloodGroupDropdownOptions: IDropdownOption[] = [
  { key: 'O Positive', text: 'O Positive' },
  { key: 'O Negative', text: 'O Negative' },
  { key: 'A Positive', text: 'A Positive' },
  { key: 'A Negative', text: 'A Negative' },
  { key: 'B Positive', text: 'B Positive' },
  { key: 'B Negative', text: 'B Negative' },
  { key: 'AB Positive', text: 'AB Positive' },
  { key: 'AB Negative', text: 'AB Negative' },
  { key: 'Not Available', text: 'Not Available' }
];

const MaratialStatusSelectionOptions: IChoiceGroupOption[] = [
  { key: 'Unmarried', text: 'Unmarried' },
  { key: 'Married', text: 'Married' }
];

const StatusDropdownOptions: IDropdownOption[] = [
  { key: 'Active', text: 'Active' },
  { key: 'Absconded', text: 'Absconded' },
  { key: 'Resigned', text: 'Resigned' }
];

const EmploymentTypeOptions: IChoiceGroupOption[] = [
  { key: 'Permanent', text: 'Permanent' },
  { key: 'Contractual', text: 'Contractual' },
  { key: 'Trainee', text: 'Trainee' }
];

export default class EmployeeManagement extends React.Component<
  IEmployeeManagementProps,
  IEmployeeManagementState
> {
  //////////// default for page link
  // required in development
  w = Web(this.props.webUrl + '/sites/Maitri');

  // required in production
  // w = Web(this.props.webUrl);

  url = location.search;
  params = new URLSearchParams(this.url);
  id = this.params.get('spid');

  ////////////

  // constructor is used to initialize the default state values
  constructor(
    props: IEmployeeManagementProps,
    _state: IEmployeeManagementState
  ) {
    super(props);
    this.state = {
      empName: undefined,
      empGender: undefined,
      empDOB: undefined,
      empGuardName: undefined,
      empEmail: undefined,
      empMobile: undefined,
      empPermAddress: undefined,
      empPermAddressPin: undefined,
      empCity: undefined,
      empState: undefined,
      empCountry: undefined,
      empNationality: undefined,
      empEthnicGroup: undefined,
      empMaratialStatus: undefined,
      empBloodGroup: undefined,
      empCommAddress: undefined,
      empCommAddressPin: undefined,
      empAltNo: undefined,
      empEmgNo: undefined,
      empAdharNo: undefined,
      empPanNo: undefined,
      empBankACNo: undefined,
      empBankName: undefined,
      empBankIFSCCode: undefined,
      empBankHolderName: undefined,
      empJobDep: undefined,
      empDesignation: undefined,
      empStatus: undefined,
      empDOJ: undefined,
      empInCharge: undefined,
      empType: undefined,

      // combobox state
      designationCombobox: [],
      departmentCombobox: [],
      empCombobox: [],

      // to be calculated
      empID: undefined
    };
  }

  // Handlers for components
  //////////////////////////////

  //////// overview_tab
  private handleEmpName = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Name input
    this.setState({
      empName: newValue
    });
  };

  private handleGender = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    // handles Gender dropdown
    this.setState({ empGender: option.key });
  };

  private handleDOB = (date: Date | null | undefined) => {
    // handles DOB datepicker
    this.setState({ empDOB: date }, () => {
      console.log(this.state.empDOB);
    });
  };

  private handleGuardianName = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empGuardName: newValue
    });
  };

  private handleEmail = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empEmail: newValue
    });
  };

  private handleMobileNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empMobile: newValue
    });
  };

  private handleCommAddress = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Communication address input
    this.setState({
      empCommAddress: newValue
    });
  };

  private handleCommAddressPin = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Communication Add pin input
    this.setState({
      empCommAddressPin: newValue
    });
  };

  private handleCity = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empCity: newValue
    });
  };

  private handleState = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empState: newValue
    });
  };

  //////// personal_tab
  private handleEthnicity = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    // handles Ethnicity dropdown
    this.setState({ empEthnicGroup: option.key });
  };

  private handleMaratialStatus = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => {
    // handles Maratial status choice box
    this.setState({ empMaratialStatus: option.key });
  };

  private handleBloodGroup = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    // handles Gender dropdown
    this.setState({ empBloodGroup: option.key });
  };

  private handleEmpAltNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Alternate communication No input
    this.setState({
      empAltNo: newValue
    });
  };

  private handleEmpEmgNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Communication address input
    this.setState({
      empEmgNo: newValue
    });
  };

  private handlePermAdd = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empPermAddress: newValue
    });
  };

  private handlePermAddPin = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Father/Spouse's name input
    this.setState({
      empPermAddressPin: newValue
    });
  };
  //////// Documentation_tab

  private handleAdharNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Adhar No input
    this.setState({
      empAdharNo: newValue
    });
  };

  private handlePanNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Pan No input
    this.setState({
      empPanNo: newValue
    });
  };

  private handleBankAcNo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Bank AC No input
    this.setState({
      empBankACNo: newValue
    });
  };

  private handleBankName = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Bank Name input
    this.setState({
      empBankName: newValue
    });
  };

  private handleBankIfscCode = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Bank IFSC code input
    this.setState({
      empBankIFSCCode: newValue
    });
  };

  private handleBankACholderName = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // handles Bank AC holder's Name
    this.setState({
      empBankHolderName: newValue
    });
  };

  //////// Office_tab

  private handleJobDes = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string
  ) => {
    // handles Job Designation input
    this.setState(
      {
        empDesignation: option.key
      },
      () => {
        console.log('emp designation combobox is: ', this.state.empDesignation);
      }
    );
  };

  private handleJobDep = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string
  ) => {
    // handles Job Department input
    this.setState({
      empJobDep: option.key
    });
  };

  private handlesEmpStatus = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    // handles Employee Status input
    this.setState({
      empStatus: option.key
    });
  };

  private handleDOJ = (date: Date | null | undefined) => {
    // handles Date of joining datepicker
    this.setState({ empDOJ: date }, () => {
      console.log(this.state.empDOJ);
    });
  };

  private handleEmpType = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => {
    // handles employement type choice box
    this.setState({ empType: option.key });
  };

  private handleInCharge = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string
  ) => {
    // handles incharge for the employee
    this.setState({
      empInCharge: option.key
    });
  };
  //////////////////////////////

  public render(): React.ReactElement<IEmployeeManagementProps> {
    return (
      <div id="container">
        <form id="frm">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a data-toggle="tab" href="#overview">
                    Overview
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#personal">
                    Personal
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#documentation">
                    Documentation
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#office">
                    Office
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                {/* Overview */}
                <div
                  id="overview"
                  className="tab-pane fade in active ui-tabs-panel ui-widget-content ui-corner-bottom"
                >
                  <div className="panel panel-default">
                    <div className="panel-body">
                      {/* Name */}
                      <div className="row top-buffer">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Name"
                              // readOnly
                              value={this.state.empName}
                              onChange={this.handleEmpName}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Gender, DOB */}
                      <div className="row top-buffer">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <Dropdown
                              placeholder="Select an option"
                              label="Gender"
                              options={GenderDropdownOptions}
                              onChange={this.handleGender}
                              selectedKey={this.state.empGender}
                              // styles={dropdownStyles}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <DatePicker
                              // firstDayOfWeek={firstDayOfWeek}
                              label="Date Of Birth"
                              placeholder="Select a date..."
                              ariaLabel="Select a date"
                              // DatePicker uses English strings by default. For localized apps, you must override this prop.
                              // strings={defaultDatePickerStrings}
                              onSelectDate={this.handleDOB}
                              value={this.state.empDOB}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Father/spoue's name, email, mobile */}
                      <div className="row top-buffer">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Father's/Spouse's Name"
                              onChange={this.handleGuardianName}
                              value={this.state.empGuardName}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Email"
                              onChange={this.handleEmail}
                              value={this.state.empEmail}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Mobile No"
                              onChange={this.handleMobileNo}
                              value={this.state.empMobile}
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                      {/* Communication Address, pin */}
                      <div className="row top-buffer">
                        <div className="col-sm-8">
                          <div className="form-group">
                            <TextField
                              label="Communication Address"
                              onChange={this.handleCommAddress}
                              value={this.state.empCommAddress}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <TextField
                              label="Pincode"
                              onChange={this.handleCommAddressPin}
                              value={this.state.empCommAddressPin}
                            />
                          </div>
                        </div>
                      </div>

                      {/* City, State, Country */}
                      <div className="row top-buffer">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <TextField
                              label="City"
                              onChange={this.handleCity}
                              value={this.state.empCity}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <TextField
                              label="State"
                              onChange={this.handleState}
                              value={this.state.empState}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <TextField
                              label="Country"
                              readOnly
                              value={'India'}
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                      {/* Next Button */}
                      <div className="row align-items-right">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <DefaultButton
                              text="Next"
                              // onClick={_alertClicked}
                              href="#personal"
                              allowDisabledFocus
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal  */}
                <div
                  id="personal"
                  className="tab-pane fade in ui-tabs-panel ui-widget-content ui-corner-bottom"
                >
                  <div className="panel panel-default">
                    <div className="panel-body">
                      {/* {this.state.showIncomplete ? <ErrorMessage /> : null} */}

                      {/* Nationality, Ethnic Group */}
                      <div className="row top-buffer">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <TextField
                              label="Nationality"
                              readOnly
                              value={'Indian'}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Dropdown
                              placeholder="Select an option"
                              label="Ethnic Group"
                              options={EthnicityDropdownOptions}
                              // styles={dropdownStyles}
                              onChange={this.handleEthnicity}
                              selectedKey={this.state.empEthnicGroup}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Maratial Status, blood group */}
                      <div className="row top-buffer">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <ChoiceGroup
                              // defaultSelectedKey="B"
                              options={MaratialStatusSelectionOptions}
                              onChange={this.handleMaratialStatus}
                              label="Maratial Status"
                              selectedKey={this.state.empMaratialStatus}
                              // required={true}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Dropdown
                              placeholder="Select an option"
                              label="Blood Group"
                              onChange={this.handleBloodGroup}
                              options={BloodGroupDropdownOptions}
                              selectedKey={this.state.empBloodGroup}
                              // styles={dropdownStyles}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Alternate Contact No, Emergency Contact No */}
                      <div className="row top-buffer">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Alternate Contact Number"
                              onChange={this.handleEmpAltNo}
                              value={this.state.empAltNo}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <TextField
                              label="Emergency Contact Number"
                              onChange={this.handleEmpEmgNo}
                              value={this.state.empEmgNo}
                            />
                          </div>
                        </div>
                      </div>

                      {/* permanent Add, pin */}
                      <div className="row top-buffer">
                        <div className="col-sm-8">
                          <div className="form-group">
                            <TextField
                              label="Permanent Address"
                              onChange={this.handlePermAdd}
                              value={this.state.empPermAddress}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <TextField
                              label="Pincode"
                              onChange={this.handlePermAddPin}
                              value={this.state.empPermAddressPin}
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                      {/* Next Button */}
                      <div className="row top-buffer">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <DefaultButton
                              text="Back"
                              // onClick={_alertClicked}
                              href="#personal"
                              allowDisabledFocus
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 align-items-right">
                          <div className="form-group">
                            <DefaultButton
                              text="Next"
                              // onClick={_alertClicked}
                              href="#personal"
                              allowDisabledFocus
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentation */}
                <div
                  id="documentation"
                  className="tab-pane fade in ui-tabs-panel ui-widget-content ui-corner-bottom"
                >
                  {/* adhar no */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextField
                          label="Adhar Number"
                          onChange={this.handleAdharNo}
                          value={this.state.empAdharNo}
                        />
                      </div>
                    </div>
                  </div>

                  {/* pan no */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextField
                          label="PAN Number"
                          onChange={this.handlePanNo}
                          value={this.state.empPanNo}
                        />
                      </div>
                    </div>
                  </div>

                  {/* bank ac no */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextField
                          label="Bank Account Number"
                          onChange={this.handleBankAcNo}
                          value={this.state.empBankACNo}
                        />
                      </div>
                    </div>
                  </div>

                  {/* bank ac name, ifsc code */}
                  <div className="row top-buffer">
                    <div className="col-sm-8">
                      <div className="form-group">
                        <TextField
                          label="Bank Name"
                          onChange={this.handleBankName}
                          value={this.state.empBankName}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <TextField
                          label="IFSC Code"
                          onChange={this.handleBankIfscCode}
                          value={this.state.empBankIFSCCode}
                        />
                      </div>
                    </div>
                  </div>

                  {/* bank ac holder name */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextField
                          label="Account holder's name"
                          onChange={this.handleBankACholderName}
                          value={this.state.empBankHolderName}
                        />
                      </div>
                    </div>
                  </div>

                  <hr />
                  {/* Next Button */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <DefaultButton
                          text="Back"
                          // onClick={_alertClicked}
                          href="#personal"
                          allowDisabledFocus
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <DefaultButton
                          text="Next"
                          // onClick={_alertClicked}
                          href="#personal"
                          allowDisabledFocus
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office */}
                <div
                  id="office"
                  className="tab-pane fade in ui-tabs-panel ui-widget-content ui-corner-bottom"
                >
                  {/* Employee ID */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextField
                          label="Employee ID"
                          readOnly
                          value={this.state.empID}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Designation, Department */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <ComboBox
                          label="Designation"
                          allowFreeform={false}
                          autoComplete={'on'}
                          options={this.state.designationCombobox}
                          onChange={this.handleJobDes}
                          selectedKey={this.state.empDesignation}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <ComboBox
                          label="Department"
                          allowFreeform={false}
                          autoComplete={'on'}
                          options={this.state.departmentCombobox}
                          onChange={this.handleJobDep}
                          selectedKey={this.state.empJobDep}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status, Date of Joining */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <Dropdown
                          placeholder="Select an option"
                          label="Status"
                          options={StatusDropdownOptions}
                          onChange={this.handlesEmpStatus}
                          selectedKey={this.state.empStatus}
                          // styles={dropdownStyles}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <DatePicker
                          // firstDayOfWeek={firstDayOfWeek}
                          label="Date Of Joining"
                          placeholder="Select a date..."
                          ariaLabel="Select a date"
                          onSelectDate={this.handleDOJ}
                          value={this.state.empDOJ}
                          // DatePicker uses English strings by default. For localized apps, you must override this prop.
                          // strings={defaultDatePickerStrings}
                        />
                      </div>
                    </div>
                  </div>

                  {/* In-charge combobox, employment type */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <ComboBox
                          label="In-Charge"
                          allowFreeform={false}
                          autoComplete={'on'}
                          options={this.state.empCombobox}
                          onChange={this.handleInCharge}
                          selectedKey={this.state.empInCharge}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <ChoiceGroup
                          // defaultSelectedKey="B"
                          options={EmploymentTypeOptions}
                          onChange={this.handleEmpType}
                          label="Employment Type"
                          selectedKey={this.state.empType}
                          // required={true}
                        />
                      </div>
                    </div>
                  </div>

                  <hr />
                  {/* Next Button */}
                  <div className="row top-buffer">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <DefaultButton
                          text="Back"
                          // onClick={_alertClicked}
                          href="#personal"
                          allowDisabledFocus
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <DefaultButton
                          text={
                            this.id != null || this.id != undefined
                              ? 'Update'
                              : 'Sumbit'
                          }
                          onClick={this._onSubmitClicked}
                          href="#personal"
                          allowDisabledFocus
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  public componentDidMount = () => {
    this._getAllEmps();
    this._getDesignations();
    this._getDepartments();

    console.log('id is: ', this.id);

    if (this.id != null || this.id != undefined) {
      // we need to fetch all the prexisting data from emp_master list item with id
      // get a specific item by id
      this.w.lists
        .getByTitle('Employee_Master')
        .items.getById(parseInt(this.id))
        .get()
        .then((item: any) => {
          console.log(item);
          this.setState({
            // --------------- Overview states ---------------
            empName: item.Employee_Name,
            empGender: item.Gender,
            empDOB: new Date(item.Date_of_Birth),
            empGuardName: item.Father_Spouse_Name,
            empEmail: item.Email,
            empMobile: item.Contact_No,
            empCommAddress: item.Address,
            empCommAddressPin: item.Pincode,
            empCity: item.Home_Town,
            empState: item.State,
            // --------------- Overview end ---------------

            // --------------- Personal states ---------------
            empEthnicGroup: item.Ethnic_Group,
            empMaratialStatus: item.Marital_Status,
            empBloodGroup: item.Blood_Group,
            empAltNo: item.Alternate_Contact,
            empEmgNo: item.Emergency_Contact,
            empPermAddress: item.Permanent_Address,
            empPermAddressPin: item.Permanent_Pincode,
            // --------------- Personal end ---------------

            // --------------- Docmentation States ---------------
            empAdharNo: item.Aadhaar,
            empPanNo: item.PAN,
            empBankACNo: item.Bank_Account_No,
            empBankName: item.Bank_Name,
            empBankIFSCCode: item.IFSC_Code,
            empBankHolderName: item.Account_Holder_Name,
            // --------------- Docmentation end ---------------

            // --------------- Office States ---------------
            empDesignation: item.DesignationId,
            empJobDep: item.DepartmentId,
            empStatus: item.Status,
            empDOJ: new Date(item.Date_of_Joining),
            empInCharge: item.Manager_LookupId,
            empType: item.Employment_Type,
            empID: item.Title
            // --------------- Office end---------------
          });
        });
    }
  };

  private _getAllEmps = () => {
    /* Fetches all emps from sp Employee_Master table who have active status
    1. has the new emp id calculation
    2. setting the combobox options
    */

    // basic usage
    this.w.lists
      .getByTitle('Employee_Master')
      .items.getAll()
      .then((allItems: any[]) => {
        // // how many did we get
        // console.log(
        //   allItems.length,
        //   ' emp records fetched from emp master succesfully....'
        // );

        // console.log(allItems);

        // calculating a new ID for emp
        // will only run if new form
        if (this.id === null || this.id === undefined) {
          allItems
            .slice(0)
            .reverse()
            .every((el, index) => {
              if (el.Title[0] != 'E' && el.Title[0] != 'C') {
                return true;
              } else {
                // console.log(
                //   'Found the last value in index: ',
                //   index,
                //   ' ',
                //   el.Title
                // );
                let new_ID = el.Title;
                new_ID = parseInt(new_ID.slice(1, new_ID.length));
                new_ID++;
                this.setState({
                  empID: new_ID
                });
                return false;
              }
            });
        }

        // setting all pre-existing emps for in-charge combobox options
        allItems.map((i) => {
          if (i.Status === 'Active') {
            this.setState({
              empCombobox: [
                ...this.state.empCombobox,
                {
                  key: i.Id,
                  text: i.Employee_Name + ' ' + i.Title,
                  empID: i.Title
                }
              ]
            });
          }
        });
      });
  };

  private _getDesignations = () => {
    /* Fetches all desgination from sp MD_Designations table*/
    // get all the items from a list
    this.w.lists
      .getByTitle('MD_Designations')
      .items.get()
      .then((items: any[]) => {
        items.map((i) => {
          this.setState({
            designationCombobox: [
              ...this.state.designationCombobox,
              { key: i.Id, text: i.Title }
            ]
          });
        });
      });
  };

  private _getDepartments = () => {
    /* Fetches all desgination from sp MD_Departments table*/
    // get all the items from a list
    this.w.lists
      .getByTitle('MD_Departments')
      .items.get()
      .then((items: any[]) => {
        items.map((i) => {
          this.setState({
            departmentCombobox: [
              ...this.state.departmentCombobox,
              { key: i.Id, text: i.Title }
            ]
          });
        });
      });
  };

  private _onSubmitClicked = () => {
    /* 
    Make a new entry in sp Employee_Master list
    *****----MEN AT WORK*****----
    */

    // Fetching the list once
    let list = this.w.lists.getByTitle('Employee_Master');

    if (this.id === null || this.id === undefined) {
      // add an item to the list
      list.items
        .add({
          // --------------- Overview Tab ---------------
          Employee_Name: this.state.empName,
          Gender: this.state.empGender ? this.state.empGender : null,
          Date_of_Birth: this.state.empDOB,
          Father_Spouse_Name: this.state.empGuardName,
          Email: this.state.empEmail,
          Contact_No: this.state.empMobile,
          Address: this.state.empCommAddress,
          Pincode: this.state.empCommAddressPin,
          Home_Town: this.state.empCity,
          State: this.state.empState,
          // --------------- Complete ---------------

          // --------------- Personal Tab ---------------
          Nationality: 'Indian',
          Ethnic_Group: this.state.empEthnicGroup
            ? this.state.empEthnicGroup
            : null,
          Marital_Status: this.state.empMaratialStatus
            ? this.state.empMaratialStatus
            : null,
          Blood_Group: this.state.empBloodGroup
            ? this.state.empBloodGroup
            : null,
          Alternate_Contact: this.state.empAltNo,
          Emergency_Contact: this.state.empEmgNo,
          Permanent_Address: this.state.empPermAddress,
          Permanent_Pincode: this.state.empPermAddressPin,
          // --------------- Complete ---------------

          // --------------- Docmentation Tab ---------------
          Aadhaar: this.state.empAdharNo,
          PAN: this.state.empPanNo,
          Bank_Account_No: this.state.empBankACNo,
          Bank_Name: this.state.empBankName,
          IFSC_Code: this.state.empBankIFSCCode,
          Account_Holder_Name: this.state.empBankHolderName,
          // --------------- Complete ---------------

          // --------------- Office Tab ---------------
          DesignationId: this.state.empDesignation
            ? this.state.empDesignation
            : null,
          DepartmentId: this.state.empJobDep ? this.state.empJobDep : null,
          Status: this.state.empStatus ? this.state.empStatus : null,
          Date_of_Joining: this.state.empDOJ,
          // extra
          Manager_LookupId: this.state.empInCharge
            ? this.state.empInCharge.key
            : null,
          // --
          Employment_Type: this.state.empType ? this.state.empType : null,
          Title:
            (this.state.empType && this.state.empType === 'Permanent'
              ? 'E'
              : 'C') + String(this.state.empID)
          // --------------- Complete ---------------
        })
        .then((iar: any) => {
          console.log(iar);
          alert('🎆New member onboarded succesfully 🎆');
          location.reload();
        })
        .catch((err) => {
          alert('🔥Error on submit, err is: 🚒');
          alert(err.message);
          console.log('🔥Error on submit, err is: 🚒');
          console.log(err.message);
        });
    }

    // update an item with specific id in list
    list.items
      .getById(parseInt(this.id))
      .update({
        // --------------- Overview states ---------------
        Employee_Name: this.state.empName,
        Gender: this.state.empGender,
        Date_of_Birth: this.state.empDOB,
        Father_Spouse_Name: this.state.empGuardName,
        Email: this.state.empEmail,
        Contact_No: this.state.empMobile,
        Address: this.state.empCommAddress,
        Pincode: this.state.empCommAddressPin,
        Home_Town: this.state.empCity,
        State: this.state.empState,
        // --------------- Overview complete ---------------

        // --------------- Personal states ---------------
        Ethnic_Group: this.state.empEthnicGroup,
        Marital_Status: this.state.empMaratialStatus,
        Blood_Group: this.state.empBloodGroup,
        Alternate_Contact: this.state.empAltNo,
        Emergency_Contact: this.state.empEmgNo,
        Permanent_Address: this.state.empPermAddress,
        Permanent_Pincode: this.state.empPermAddressPin,
        // --------------- Personal end ---------------

        // --------------- Docmentation States ---------------
        Aadhaar: this.state.empAdharNo,
        PAN: this.state.empPanNo,
        Bank_Account_No: this.state.empBankACNo,
        Bank_Name: this.state.empBankName,
        IFSC_Code: this.state.empBankIFSCCode,
        Account_Holder_Name: this.state.empBankHolderName,
        // --------------- Docmentation end ---------------

        // --------------- Office States ---------------
        DesignationId: this.state.empDesignation,
        DepartmentId: this.state.empJobDep,
        Status: this.state.empStatus,
        Date_of_Joining: this.state.empDOJ,
        Manager_LookupId: this.state.empInCharge,
        Employment_Type: this.state.empType,
        Title:
          (this.state.empType === 'Permanent' ? 'E' : 'C') +
          String(this.state.empID).slice(1)
        // --------------- Office end---------------
      })

      .then((i) => {
        console.log(i);
        alert('🎆User details updated succesfully 🎆');
        location.reload();
      })
      .catch((err) => {
        alert('🔥Error on update, err is: 🚒');
        alert(err.message);
        console.log('🔥Error on update, err is: 🚒');
        console.log(err.message);
      });
  };
}
