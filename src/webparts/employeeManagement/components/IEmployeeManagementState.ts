import { IComboBoxOption } from 'office-ui-fabric-react';

export interface IEmployeeManagementState {
  // --------------- Overview states ---------------
  empName: any;
  empGender: any;
  empDOB: any;
  empGuardName: any;
  empEmail: any;
  empMobile: any;
  empCommAddress: any;
  empCommAddressPin: any;
  empAltNo: any;
  empEmgNo: any;
  empCity: any;
  empState: any;
  empCountry: any;
  // --------------- Overview end ---------------

  // --------------- Personal states ---------------
  empNationality: any;
  empEthnicGroup: any;
  empMaratialStatus: any;
  empBloodGroup: any;
  empPermAddress: any;
  empPermAddressPin: any;
  // --------------- Personal end ---------------

  // --------------- Documentation states ---------------
  empAdharNo: any;
  empPanNo: any;
  empBankACNo: any;
  empBankName: any;
  empBankIFSCCode: any;
  empBankHolderName: any;
  // --------------- Documentation end ---------------

  // --------------- Office states ---------------
  empJobDep: any;
  empDesignation: any;
  empStatus: any;
  empDOJ: any;
  empInCharge: any;
  empType: any;
  // --------------- Overview end ---------------

  // combobox state
  designationCombobox: any;
  departmentCombobox: any;
  empCombobox: any;

  // calculated id of emp according to last found id
  empID: any;
}
