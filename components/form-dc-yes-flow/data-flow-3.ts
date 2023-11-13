import { parsedFormData } from '../common/utils/cache';
import { IDualCitizenYesInputs, countries } from './data';

export const defaultItems = ['Yes', 'No'];
export const visaFreeOptions = [
  {
    name: 'Yes',
    value: 'Yes',
    link: false,
  },
  {
    name: 'No, our mission organization/company will apply for our family’s Philippine Visa',
    value: 'No',
    link: false,
  },
];
export const visaOptions = [
  'Apply for FA 47(a)(2) Visa',
  'Apply for another PH Visa',
];

export const childEnterReasonItems = [
  {
    name: 'My child is a Faith Academy visa holder',
    value: 'visaHolder',
    link: false,
  },
  {
    name: 'My child belongs to a Visa-free Entry Country',
    value: 'visaFree',
    link: 'https://www.philippineconsulatela.org/no-visa-entry-countries-for-30-day-stay-under-e-o-408',
  },
  {
    name: 'My child will use/apply (9a-2) visa granted by the Philippine Embassy/Consulate',
    value: 'visaGranted',
    link: false,
  },
  {
    name: 'Our family has a Philippine visa (e.g. 13a, 9g, under mission organization/company, SRRV)',
    value: 'phVisa',
    link: false,
  },
];

const isInPHYes = {
  dateOfArrival: {
    id: 'dateOfArrival',
    value: parsedFormData.get('dateOfArrival'),
    title: 'Date of Arrival',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Yes']], // Key-Value
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,
  dateOfAuthorizedStay: {
    id: 'dateOfAuthorizedStay',
    value: parsedFormData.get('dateOfAuthorizedStay'),
    title: 'Date of Authorized Stay',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Yes']], // Key-Value
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,
  stampArrivalFile: {
    id: 'stampArrivalFile',
    value: null,
    title: 'Upload Arrival Stamp',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Yes']],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const isInPHNo = {
  anticipatedArrivalDate: {
    id: 'anticipatedArrivalDate',
    value: parsedFormData.get('anticipatedArrivalDate'),
    title: 'Anticipated Date of Arrival ',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-No']], // Key-Value
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,
};
const flow3Fields = {
  country: {
    id: 'country',
    value: parsedFormData.get('country'),
    title: 'Country',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'select',
    required: true,
    items: countries,
    hasOption: true,
  } as IDualCitizenYesInputs,

  otherCountry: {
    id: 'otherCountry',
    value: parsedFormData.get('otherCountry'),
    title: 'Other',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any', 'country-Other']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  surName: {
    id: 'surName',
    value: parsedFormData.get('surName'),
    title: 'Surname',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,
  firstName: {
    id: 'firstName',
    value: parsedFormData.get('firstName'),
    title: 'First Name',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,
  middleName: {
    id: 'middleName',
    value: parsedFormData.get('middleName') || 'none',
    title: 'Middle Name',
    description: 'If you don’t have one, just type “none”',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  birthPlace: {
    id: 'birthPlace',
    value: parsedFormData.get('birthPlace'),
    title: 'Birth Place',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  dateOfBirth: {
    id: 'dateOfBirth',
    value: parsedFormData.get('dateOfBirth'),
    title: 'Date of Birth',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,

  passportNumber: {
    id: 'passportNumber',
    value: parsedFormData.get('passportNumber'),
    title: 'Passport Number',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  passportExpDate: {
    id: 'passportExpDate',
    value: parsedFormData.get('passportExpDate'),
    title: 'Passport Expiration Date',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,

  issuingAuthority: {
    id: 'issuingAuthority',
    value: parsedFormData.get('issuingAuthority'),
    title: 'Issuing Authority',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  bioPageFile: {
    id: 'bioPageFile',
    value: null,
    title: 'Upload Passport Bio Page',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,

  childEnterReason: {
    id: 'childEnterReason',
    value: parsedFormData.get('childEnterReason'),
    title: 'How did/will your child enter the Philippines? ',
    dependsOnExpectValue: [['dualFilipino-No', 'isInPH-Any']],
    inputType: 'select',
    items: childEnterReasonItems,
    required: true,
    itemsObjectArray: true,
  } as IDualCitizenYesInputs,
};
const childFaVisaFieldForVisaGranted = {
  childFaVisa: {
    id: 'childFaVisa',
    value: parsedFormData.get('childFaVisa'),
    title: 'Does your child need Faith Academy’s 47(a)(2) Visa?',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree',
      ],
    ],
    items: visaFreeOptions,
    inputType: 'select',
    required: true,
    itemsObjectArray: true,
  } as IDualCitizenYesInputs,
};

const otherPassportOption = {
  childAnotherPassport: {
    id: 'childAnotherPassport',
    value: parsedFormData.get('childAnotherPassport'),
    title: 'Does your child holds another passport?',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'childFaVisa-Any',
      ],
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'acrCardOption-Any',
      ],
    ],
    items: defaultItems,
    inputType: 'select',
    required: true,
    note: {
      dependsOn: [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa||visaGranted||visaFree',
        'childFaVisa-No',
      ],
      content: 'Your child need a Special Study Permit',
    },
  } as IDualCitizenYesInputs,
};

const anotherPassportOptionYes = {
  child2ndCountry: {
    id: 'child2ndCountry',
    value: parsedFormData.get('child2ndCountry'),
    title: 'Indicate your child’s 2nd Country',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'childFaVisa-Any',
        'childAnotherPassport-Yes',
      ],
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'childAnotherPassport-Yes',
      ],
    ],
    items: countries,
    inputType: 'select',
    required: true,
    hasOption: true,
  } as IDualCitizenYesInputs,

  secondOtherCountry: {
    id: 'secondOtherCountry2',
    value: parsedFormData.get('secondOtherCountry'),
    title: 'Other',
    dependsOnExpectValue: [['dualFilipino-No', 'child2ndCountry-Other']],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  secondPassportNumber: {
    id: 'secondPassportNumber',
    value: parsedFormData.get('secondPassportNumber'),
    title: 'FN 2nd Passport Number',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'childFaVisa-Any',
        'childAnotherPassport-Yes',
      ],
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'childAnotherPassport-Yes',
      ],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  secondPassportExpDate: {
    id: 'secondPassportExpDate',
    value: parsedFormData.get('secondPassportExpDate'),
    title: 'FN 2nd Passport Expiration Date',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'childFaVisa-Any',
        'childAnotherPassport-Yes',
      ],
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'childAnotherPassport-Yes',
      ],
    ],
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,

  secondBioPageFile: {
    id: 'secondBioPageFile',
    value: null,
    title: 'Upload 2nd FN Passport Bio Page',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaGranted||visaFree||phVisa',
        'childFaVisa-Any',
        'childAnotherPassport-Yes',
      ],
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'childAnotherPassport-Yes',
      ],
    ],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const visaFreeHolderNo = {
  nameOfMission: {
    id: 'nameOfMission',
    value: parsedFormData.get('nameOfMission'),
    title: 'Name of Mission Org/Company ',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaFree||visaGranted',
        'childFaVisa-No',
      ],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  contactName: {
    id: 'contactName',
    value: parsedFormData.get('contactName'),
    title: 'Contact Name ',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaFree||visaGranted',
        'childFaVisa-No',
      ],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  contactNumber: {
    id: 'contactNumber',
    value: parsedFormData.get('contactNumber'),
    title: 'Contact Cel. No ',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaFree||visaGranted',
        'childFaVisa-No',
      ],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  contactEmail: {
    id: 'contactEmail',
    value: parsedFormData.get('contactEmail'),
    title: 'Contact Email',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-visaFree||visaGranted',
        'childFaVisa-No',
      ],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,
};

const childPhVisa = {
  typeOfPhVisa: {
    id: 'typeOfPhVisa',
    value: parsedFormData.get('typeOfPhVisa'),
    title: 'Type of Philippine Visa  ',
    dependsOnExpectValue: [
      ['dualFilipino-No', 'isInPH-Any', 'childEnterReason-phVisa'],
    ],
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,

  phVisaExpDate: {
    id: 'phVisaExpDate',
    value: parsedFormData.get('phVisaExpDate'),
    title: 'Expiration Date of Visa   ',
    dependsOnExpectValue: [
      ['dualFilipino-No', 'isInPH-Any', 'childEnterReason-phVisa'],
    ],
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,

  indefinite: {
    id: 'indefinite',
    value: parsedFormData.get('indefinite'),
    description: 'Indefinite',
    title: 'Indefinite',
    dependsOnExpectValue: [
      ['dualFilipino-No', 'isInPH-Any', 'childEnterReason-phVisa'],
    ],
    inputType: 'input-checkbox',
    required: false,
  } as IDualCitizenYesInputs,

  visaPageFile: {
    id: 'visaPageFile',
    value: null,
    title: `Upload your child's visa page`,
    dependsOnExpectValue: [
      ['dualFilipino-No', 'isInPH-Any', 'childEnterReason-phVisa'],
    ],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
  acrCardOption: {
    id: 'acrCardOption',
    value: parsedFormData.get('acrCardOption'),
    title:
      'Do you have an ACR I-card or Philippine Retirement Authority (PRA) Card?',
    dependsOnExpectValue: [
      ['dualFilipino-No', 'isInPH-Any', 'childEnterReason-phVisa'],
    ],
    items: defaultItems,
    inputType: 'select',
    required: true,
  } as IDualCitizenYesInputs,
};

const acrOptionYes = {
  expirationDateACRCard: {
    id: 'expirationDateACRCard',
    value: parsedFormData.get('expirationDateACRCard'),
    title:
      'Expiration Date of ACR I-card or Philippine Retirement Authority (PRA) Card',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'acrCardOption-Yes',
      ],
    ],
    inputType: 'input-date',
    required: true,
  } as IDualCitizenYesInputs,

  childFrontACRCardFile: {
    id: 'childFrontACRCardFile',
    value: null,
    title:
      "Upload your child's valid card, front ACR I-card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'acrCardOption-Yes',
      ],
    ],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,

  childBackACRCardFile: {
    id: 'childBackACRCardFile',
    value: null,
    title:
      "Upload your child's valid card, back ACR I-card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'acrCardOption-Yes',
      ],
    ],
    inputType: 'input-file',
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const acrOptionNo = {
  reasonDontHaveACRCard: {
    id: 'reasonDontHaveACRCard',
    value: parsedFormData.get('reasonDontHaveACRCard'),
    title:
      'Indicate reason why you don’t have an ACR I-Card or Philippine Retirement Authority (PRA) Card',
    dependsOnExpectValue: [
      [
        'dualFilipino-No',
        'isInPH-Any',
        'childEnterReason-phVisa',
        'acrCardOption-No',
      ],
    ],
    placeholder: 'Reason',
    inputType: 'input-text',
    required: true,
  } as IDualCitizenYesInputs,
};

export const REGISTRATION_DF_NO_INPUTS = {
  ...isInPHYes,
  ...isInPHNo,
  ...flow3Fields,
  ...childFaVisaFieldForVisaGranted,
  ...visaFreeHolderNo,

  ...childPhVisa,
  ...acrOptionYes,
  ...acrOptionNo,
  ...otherPassportOption,
  ...anotherPassportOptionYes,
};
