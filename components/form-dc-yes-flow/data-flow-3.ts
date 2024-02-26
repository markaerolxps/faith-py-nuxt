import { parsedFormData } from "../common/utils/cache";
import { IDualCitizenYesInputs, countries, genderItems } from "./data";

export const defaultItems = ["Yes", "No"];
export const visaFreeOptions = [
  {
    name: "Yes",
    value: "Yes",
    link: false,
  },
  {
    name: "No, our mission organization/company will apply for our family’s Philippine Visa",
    value: "No",
    link: false,
  },
];
export const visaOptions = [
  "Apply for FA 47(a)(2) Visa",
  "Apply for another PH Visa",
];

export const typeOfVisaItems = [
  "47(a)(2)",
  "9(A)",
  "9(B)",
  "9(C)",
  "9(D)",
  "9(E)",
  "9(F)",
  "9(G)",
  "13 Quota Immigrants",
  "13(A)",
  "13(B)",
  "13(C)",
  "13(D)",
  "13(E)",
  "13(F)",
  "13(G)",
  "PEZZA",
  "SRRV",
];

export const childEnterReasonItems = [
  {
    name: "My child is a Faith Academy visa holder",
    value: "visaHolder",
    link: false,
  },
  {
    name: "My child belongs to a Visa-free Entry Country",
    value: "visaFree",
    link: "https://www.philippineconsulatela.org/no-visa-entry-countries-for-30-day-stay-under-e-o-408",
  },
  {
    name: "My child will use/apply (9a-2) visa granted by the Philippine Embassy/Consulate",
    value: "visaGranted",
    link: false,
  },
  {
    name: "Our family has a Philippine visa (e.g. 13a, 9g, under mission organization/company, SRRV)",
    value: "phVisa",
    link: false,
  },
];

const isInPHYes = {
  dateOfArrival: {
    id: "dateOfArrival",
    value: parsedFormData.get("dateOfArrival"),
    title: "Date of Arrival",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Yes"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  dateOfAuthorizedStay: {
    id: "dateOfAuthorizedStay",
    value: parsedFormData.get("dateOfAuthorizedStay"),
    title: "Date of Authorized Stay",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Yes"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  stampArrivalFile: {
    id: "stampArrivalFile",
    value: null,
    title: "Upload Arrival Stamp",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Yes"]],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const isInPHNo = {
  anticipatedArrivalDate: {
    id: "anticipatedArrivalDate",
    value: parsedFormData.get("anticipatedArrivalDate"),
    title: "Anticipated Date of Arrival ",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-No"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
};
const flow3Fields = {
  country: {
    id: "country",
    value: parsedFormData.get("country"),
    title: "Country",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "select",
    required: true,
    items: defaultItems,
    hasOption: true,
  } as IDualCitizenYesInputs,

  otherCountry: {
    id: "otherCountry",
    value: parsedFormData.get("otherCountry"),
    title: "Other",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any", "country-Other"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  surName: {
    id: "surName",
    value: parsedFormData.get("surName"),
    title: "Surname",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  firstName: {
    id: "firstName",
    value: parsedFormData.get("firstName"),
    title: "First Name",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  middleName: {
    id: "middleName",
    value: parsedFormData.get("middleName"),
    title: "Middle Name",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: false,
  } as IDualCitizenYesInputs,
  gender: {
    id: "gender",
    value: parsedFormData.get("gender"),
    title: "Gender",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    items: genderItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  birthPlace: {
    id: "birthPlace",
    value: parsedFormData.get("birthPlace"),
    title: "Birth Place",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  dateOfBirth: {
    id: "dateOfBirth",
    value: parsedFormData.get("dateOfBirth"),
    title: "Date of Birth",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,

  passportNumber: {
    id: "passportNumber",
    value: parsedFormData.get("passportNumber"),
    title: "Passport Number",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  passportExpirationDate: {
    id: "passportExpirationDate",
    value: parsedFormData.get("passportExpirationDate"),
    title: "Passport Expiration Date",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,

  issuingAuthority: {
    id: "issuingAuthority",
    value: parsedFormData.get("issuingAuthority"),
    title: "Issuing Authority",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  bioPageFile: {
    id: "bioPageFile",
    value: null,
    title: "Upload Passport Bio Page",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,

  childEnterReason: {
    id: "childEnterReason",
    value: parsedFormData.get("childEnterReason"),
    title: "How did/will your child enter the Philippines? ",
    dependsOnExpectValue: [["dualFilipino-No", "isInPH-Any"]],
    inputType: "select",
    items: childEnterReasonItems,
    required: true,
    itemsObjectArray: true,
  } as IDualCitizenYesInputs,
};
const childFaVisaFieldForVisaGranted = {
  childFaVisa: {
    id: "childFaVisa",
    value: parsedFormData.get("childFaVisa"),
    title: "Does your child need Faith Academy’s 47(a)(2) Visa?",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree",
      ],
    ],
    items: visaFreeOptions,
    inputType: "select",
    required: true,
    itemsObjectArray: true,
  } as IDualCitizenYesInputs,
};

const otherPassportOption = {
  childAnotherPassport: {
    id: "childAnotherPassport",
    value: parsedFormData.get("childAnotherPassport"),
    title: "Does your child hold another passport?",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "childFaVisa-Any",
      ],
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "acrCardOption-Any",
      ],
    ],
    items: defaultItems,
    inputType: "select",
    required: true,
    note: {
      dependsOn: [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa||visaGranted||visaFree",
        "childFaVisa-No",
      ],
      content: "Your child need a Special Study Permit",
    },
  } as IDualCitizenYesInputs,
};

const anotherPassportOptionYes = {
  country2: {
    id: "country2",
    value: parsedFormData.get("country2"),
    title: "Indicate your child’s 2nd Country",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "childFaVisa-Any",
        "childAnotherPassport-Yes",
      ],
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "childAnotherPassport-Yes",
      ],
    ],
    items: defaultItems,
    inputType: "select",
    required: true,
    hasOption: true,
  } as IDualCitizenYesInputs,

  otherCountry2: {
    id: "otherCountry2",
    value: parsedFormData.get("otherCountry"),
    title: "Other",
    dependsOnExpectValue: [["dualFilipino-No", "country2-Other"]],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  passportNumber2: {
    id: "passportNumber2",
    value: parsedFormData.get("passportNumber2"),
    title: "2nd Passport Number",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "childFaVisa-Any",
        "childAnotherPassport-Yes",
      ],
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "childAnotherPassport-Yes",
      ],
    ],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  passportExpirationDate2: {
    id: "passportExpirationDate2",
    value: parsedFormData.get("passportExpirationDate2"),
    title: "2nd Passport Expiration Date",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "childFaVisa-Any",
        "childAnotherPassport-Yes",
      ],
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "childAnotherPassport-Yes",
      ],
    ],
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,

  bioPageFile2: {
    id: "bioPageFile2",
    value: null,
    title: "Upload 2nd Passport Bio Page",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaGranted||visaFree||phVisa",
        "childFaVisa-Any",
        "childAnotherPassport-Yes",
      ],
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "childAnotherPassport-Yes",
      ],
    ],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const visaFreeHolderNo = {
  nameOfMission: {
    id: "nameOfMission",
    value: parsedFormData.get("nameOfMission"),
    title: "Name of Mission Org/Company ",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaFree||visaGranted",
        "childFaVisa-No",
      ],
    ],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  nameOfAccreditedOffice: {
    id: "nameOfAccreditedOffice",
    value: parsedFormData.get("nameOfAccreditedOffice"),
    title: "Contact Name ",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaFree||visaGranted",
        "childFaVisa-No",
      ],
    ],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  missionCellNo: {
    id: "missionCellNo",
    value: parsedFormData.get("missionCellNo"),
    title: "Contact Cel. No ",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaFree||visaGranted",
        "childFaVisa-No",
      ],
    ],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,

  missionEmail: {
    id: "missionEmail",
    value: parsedFormData.get("missionEmail"),
    title: "Contact Email",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-visaFree||visaGranted",
        "childFaVisa-No",
      ],
    ],
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
};

const childPhVisa = {
  typeOfPhVisa: {
    id: "typeOfPhVisa",
    value: parsedFormData.get("typeOfPhVisa"),
    title: "Type of Philippine Visa",
    dependsOnExpectValue: [
      ["dualFilipino-No", "isInPH-Any", "childEnterReason-phVisa"],
    ],
    items: typeOfVisaItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,

  phVisaExpDate: {
    id: "phVisaExpDate",
    value: parsedFormData.get("phVisaExpDate"),
    title: "Expiration Date of Visa   ",
    dependsOnExpectValue: [
      ["dualFilipino-No", "isInPH-Any", "childEnterReason-phVisa"],
    ],
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,

  indefinite: {
    id: "indefinite",
    value: parsedFormData.get("indefinite"),
    description: "Indefinite",
    title: "Indefinite",
    dependsOnExpectValue: [
      ["dualFilipino-No", "isInPH-Any", "childEnterReason-phVisa"],
    ],
    inputType: "input-checkbox",
    required: false,
  } as IDualCitizenYesInputs,

  visaPageFile: {
    id: "visaPageFile",
    value: null,
    title: `Upload your child's visa page`,
    dependsOnExpectValue: [
      ["dualFilipino-No", "isInPH-Any", "childEnterReason-phVisa"],
    ],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
  acrCardOption: {
    id: "acrCardOption",
    value: parsedFormData.get("acrCardOption"),
    title:
      "Do you have an ACR I-card or Philippine Retirement Authority (PRA) Card?",
    dependsOnExpectValue: [
      ["dualFilipino-No", "isInPH-Any", "childEnterReason-phVisa"],
    ],
    items: defaultItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
};

const acrOptionYes = {
  expirationDateACRCard: {
    id: "expirationDateACRCard",
    value: parsedFormData.get("expirationDateACRCard"),
    title:
      "Expiration Date of ACR I-card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "acrCardOption-Yes",
      ],
    ],
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,

  acrCardFileFront: {
    id: "acrCardFileFront",
    value: null,
    title:
      "Upload your child's valid card, front ACR I-card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "acrCardOption-Yes",
      ],
    ],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,

  acrCardFileBack: {
    id: "acrCardFileBack",
    value: null,
    title:
      "Upload your child's valid card, back ACR I-card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "acrCardOption-Yes",
      ],
    ],
    inputType: "input-file",
    required: true,
    isNotPersist: true,
  } as IDualCitizenYesInputs,
};

const acrOptionNo = {
  reasonDontHaveACRCard: {
    id: "reasonDontHaveACRCard",
    value: parsedFormData.get("reasonDontHaveACRCard"),
    title:
      "Indicate reason why you don’t have an ACR I-Card or Philippine Retirement Authority (PRA) Card",
    dependsOnExpectValue: [
      [
        "dualFilipino-No",
        "isInPH-Any",
        "childEnterReason-phVisa",
        "acrCardOption-No",
      ],
    ],
    placeholder: "Reason",
    inputType: "input-text",
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
