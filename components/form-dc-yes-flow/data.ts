import { getCountries } from "~/assets/api";
import { parsedFormData } from "../common/utils/cache";

export interface IDualCitizenYesInputs {
  id: string;
  value: any;
  title: string;
  description?: string;
  inputType:
    | "select"
    | "input-date"
    | "input-text"
    | "input-number"
    | "input-file"
    | "textarea"
    | "input-checkbox"
    | "number"
    | "display";
  required?: boolean;
  placeholder: string;
  dependsOnExpectValue?: string[][]; // ARRAY OF AND, [[AND], [AND]] = implemented as IF [AND] OR [AND] OR etc..
  items?: any[];
  hasOption?: boolean;
  itemsObjectArray?: boolean;
  isNotPersist?: boolean;
  note?: {
    dependsOn: string[];
    content?: string;
  };
  isVisible?: boolean;
}

export const defaultItems = ["Yes", "No"];
export const genderItems = ["Male", "Female"];
export const visaOptions = [
  "Apply for FA 47(a)(2) Visa",
  "Apply for another PH Visa",
];
export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Other",
  // Add more countries here
];

const isInPHNO = {
  anticipatedDateOfArrival: {
    id: "anticipatedDateOfArrival",
    value: parsedFormData.get("anticipatedDateOfArrival"),
    title: "Anticipated Date of Arrival",
    dependsOnExpectValue: [["dualFilipino-Yes", "isInPH-No"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
};

const isInPHYes = {
  isUsePhPassport: {
    id: "isUsePhPassport",
    value: parsedFormData.get("isUsePhPassport"),
    title:
      "Will/did your child use a Philippine Passport to enter the Philippines?",
    dependsOnExpectValue: [["dualFilipino-Yes", "isInPH-Any"]], // Key-Value
    items: defaultItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  country: {
    id: "country",
    value: parsedFormData.get("country"),
    title: "Country",
    dependsOnExpectValue: [["dualFilipino-Yes", "isUsePhPassport-Any"]], // Key-Value
    inputType: "select",
    placeholder: "Country",
    items: countries,
    hasOption: true,
    required: true,
  } as IDualCitizenYesInputs,
  otherCountry: {
    id: "otherCountry",
    value: parsedFormData.get("otherCountry"),
    title: "Other",
    dependsOnExpectValue: [
      ["dualFilipino-Yes", "isUsePhPassport-Any", "country-Other"],
    ], // Key-Value
    inputType: "input-text",
    placeholder: "Other",
    required: true,
  } as IDualCitizenYesInputs,
  surname: {
    id: "surname",
    value: parsedFormData.get("surname"),
    title: "Surname",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  firstName: {
    id: "firstName",
    value: parsedFormData.get("firstName"),
    title: "First Name",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  middleName: {
    id: "middleName",
    value: parsedFormData.get("middleName"),
    title: "Middle Name",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: false,
  } as IDualCitizenYesInputs,
  gender: {
    id: "gender",
    value: parsedFormData.get("gender"),
    title: "Gender",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]],
    items: genderItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  birthPlace: {
    id: "birthPlace",
    value: parsedFormData.get("birthPlace"),
    title: "Birth Place",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  dateOfBirth: {
    id: "dateOfBirth",
    value: parsedFormData.get("dateOfBirth"),
    title: "Date of Birth",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  passportNumber: {
    id: "passportNumber",
    value: parsedFormData.get("passportNumber"),
    title: "Passport Number",
    placeholder: "Passport Number",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  passportExpirationDate: {
    id: "passportExpirationDate",
    value: parsedFormData.get("passportExpirationDate"),
    title: "Passport Expiration Date",
    placeholder: "Passport Number",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  issuingAuthority: {
    id: "issuingAuthority",
    value: parsedFormData.get("issuingAuthority"),
    title: "Issuing Authority",
    placeholder: "Issuing Authority",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  bioPageFile: {
    id: "bioPageFile",
    value: parsedFormData.get("bioPageFile"),
    title: "Upload Passport Bio Page",
    dependsOnExpectValue: [["dualFilipino-Any", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-file",
    required: true,
  } as IDualCitizenYesInputs,
  arrivalStampFile: {
    id: "arrivalStampFile",
    value: parsedFormData.get("arrivalStampFile"),
    title: "Upload Arrival Stamp (if in PH)",
    dependsOnExpectValue: [["dualFilipino-Yes", "isUsePhPassport-Any"]], // Key-Value
    inputType: "input-file",
    required: false,
  } as IDualCitizenYesInputs,
  hasPHPassport: {
    id: "hasPHPassport",
    value: parsedFormData.get("hasPHPassport"),
    title: "Does your child have a Philippine passport?",
    dependsOnExpectValue: [["dualFilipino-Yes", "isUsePhPassport-No"]], // Key-Value
    inputType: "select",
    items: defaultItems,
    required: true,
  } as IDualCitizenYesInputs,
  hasBICert: {
    id: "hasBICert",
    value: parsedFormData.get("hasBICert"),
    title: "Does your child have BI Identification Certificate?",
    dependsOnExpectValue: [
      ["dualFilipino-Yes", "hasPHPassport-No"],
      ["dualFilipino-Yes", "isUsePhPassport-Yes"],
    ], // Key-Value
    inputType: "select",
    items: defaultItems,
    required: true,
  } as IDualCitizenYesInputs,
};

const hasBICertYes = {
  BIICNumber: {
    id: "BIICNumber",
    value: parsedFormData.get("BIICNumber"),
    title: "Bureau of Immigration Identification Certificate Number",
    placeholder: "BI IC Number",
    dependsOnExpectValue: [
      ["dualFilipino-Any", "isUsePhPassport-Any", "hasBICert-Yes"],
    ], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  BIICFile: {
    id: "BIICFile",
    value: parsedFormData.get("BIICFile"),
    title: "Upload BI IC",
    dependsOnExpectValue: [
      ["dualFilipino-Any", "isUsePhPassport-Any", "hasBICert-Yes"],
    ], // Key-Value
    inputType: "input-file",
    required: true,
  } as IDualCitizenYesInputs,
  hasAnotherPassport: {
    id: "hasAnotherPassport",
    value: parsedFormData.get("hasAnotherPassport"),
    title: "Does your child hold another passport?",
    dependsOnExpectValue: [
      [
        "dualFilipino-Yes",
        "isUsePhPassport-Yes",
        "isInPH-Any",
        "hasBICert-Any",
      ],
    ], // Key-Value
    inputType: "select",
    items: defaultItems,
    required: true,
  } as IDualCitizenYesInputs,
  // SUBMIT TRUE = IF hasAnotherPassport IS NO
};

const hasAnotherPassportYes = {
  child2ndCountry: {
    id: "child2ndCountry",
    value: parsedFormData.get("child2ndCountry"),
    title: "Indicate your child’s 2nd Country",
    dependsOnExpectValue: [["hasAnotherPassport-Yes"]], // Key-Value
    inputType: "select",
    items: defaultItems,
    hasOption: true,
  } as IDualCitizenYesInputs,

  childOther2ndCountry: {
    id: "childOther2ndCountry",
    value: parsedFormData.get("childOther2ndCountry"),
    title: "Other",
    dependsOnExpectValue: [["child2ndCountry-Other"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  foreignNationalPassportNumber: {
    id: "foreignNationalPassportNumber",
    value: parsedFormData.get("foreignNationalPassportNumber"),
    title: " 2nd Passport Number",
    dependsOnExpectValue: [["hasAnotherPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  foreignPassportExpirationDate: {
    id: "foreignPassportExpirationDate",
    value: parsedFormData.get("foreignPassportExpirationDate"),
    title: " 2nd Passport Expiration Date",
    dependsOnExpectValue: [["hasAnotherPassport-Yes"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  foreignNationalBioPageFile: {
    id: "foreignNationalBioPageFile",
    value: parsedFormData.get("foreignNationalBioPageFile"),
    title: "Upload 2nd  Passport Bio Page",
    dependsOnExpectValue: [["hasAnotherPassport-Yes"]], // Key-Value // Key-Value
    inputType: "input-file",
    required: true,
  } as IDualCitizenYesInputs,
};

// Record 2 of child owning PH passport
const hasPHPassportYES = {
  country2: {
    id: "country2",
    value: parsedFormData.get("country2"),
    title: "Country",
    dependsOnExpectValue: [["dualFilipino-Yes", "hasPHPassport-Yes"]], // Key-Value
    items: countries,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  otherCountry2: {
    id: "otherCountry2",
    value: parsedFormData.get("otherCountry2"),
    title: "Other",
    dependsOnExpectValue: [
      ["dualFilipino-Yes", "hasPHPassport-Yes", "country2-Other"],
    ], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  surname2: {
    id: "surname2",
    value: parsedFormData.get("surname2"),
    title: "Surname",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  firstName2: {
    id: "firstName2",
    value: parsedFormData.get("firstName2"),
    title: "First Name",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  middleName2: {
    id: "middleName2",
    value: parsedFormData.get("middleName2"),
    title: "Middle Name",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: false,
  } as IDualCitizenYesInputs,
  gender2: {
    id: "gender2",
    value: parsedFormData.get("gender2"),
    title: "Gender",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]],
    items: genderItems,
    inputType: "select",
    required: true,
  } as IDualCitizenYesInputs,
  birthPlace2: {
    id: "birthPlace2",
    value: parsedFormData.get("birthPlace2"),
    title: "Birth Place",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  dateOfBirth2: {
    id: "dateOfBirth2",
    value: parsedFormData.get("dateOfBirth2"),
    title: "Date of Birth",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  passportNumber2: {
    id: "passportNumber2",
    value: parsedFormData.get("passportNumber2"),
    title: "Passport Number",
    placeholder: "Passport Number",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  passportExpirationDate2: {
    id: "passportExpirationDate2",
    value: parsedFormData.get("passportExpirationDate2"),
    title: "Passport Expiration Date",
    placeholder: "Passport Number",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-date",
    required: true,
  } as IDualCitizenYesInputs,
  issuingAuthority2: {
    id: "issuingAuthority2",
    value: parsedFormData.get("issuingAuthority2"),
    title: "Issuing Authority",
    placeholder: "Issuing Authority",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  bioPageFile2: {
    id: "bioPageFile2",
    value: parsedFormData.get("bioPageFile2"),
    title: "Upload Passport Bio Page",
    dependsOnExpectValue: [["dualFilipino-Any", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-file",
    required: true,
  } as IDualCitizenYesInputs,
  arrivalStampFile2: {
    id: "arrivalStampFile2",
    value: parsedFormData.get("arrivalStampFile2"),
    title: "Upload Arrival Stamp (if applicable)",
    dependsOnExpectValue: [["dualFilipino-Yes", "hasPHPassport-Yes"]], // Key-Value
    inputType: "input-file",
    required: false,
  } as IDualCitizenYesInputs,
  hasBICert2: {
    id: "hasBICert2",
    value: parsedFormData.get("hasBICert2"),
    title: "Does your child have BI Identification Certificate?",
    dependsOnExpectValue: [
      ["dualFilipino-Yes", "isUsePhPassport-No", "hasPHPassport-Yes"],
    ], // Key-Value
    inputType: "select",
    items: defaultItems,
    required: true,
  } as IDualCitizenYesInputs,
};

const hasBICert2Yes = {
  BIICNumber2: {
    id: "BIICNumber2",
    value: parsedFormData.get("BIICNumber2"),
    title: "Bureau of Immigration Identification Certificate Number",
    placeholder: "BI IC Number",
    dependsOnExpectValue: [["dualFilipino-Yes", "hasBICert2-Yes"]], // Key-Value
    inputType: "input-text",
    required: true,
  } as IDualCitizenYesInputs,
  BIICFile2: {
    id: "BIICFile2",
    value: parsedFormData.get("BIICFile2"),
    title: "Upload BI IC",
    dependsOnExpectValue: [["dualFilipino-Yes", "hasBICert2-Yes"]], // Key-Value
    inputType: "input-file",
    required: true,
  } as IDualCitizenYesInputs,
  // SUBMIT TRUE
};

const hasBICert2No = {
  preferredVisa: {
    id: "preferredVisa",
    value: parsedFormData.get("preferredVisa"),
    title: "Select Preferred Visa Option",
    dependsOnExpectValue: [
      ["dualFilipino-Yes", "hasBICert2-No"],
      ["hasPHPassport-No", "hasBICert-No"],
    ],
    inputType: "select",
    items: visaOptions,
    required: true,
  } as IDualCitizenYesInputs,
  // SUBMIT TRUE
};

export const REGISTRATION_DF_YES_INPUTS = {
  ...isInPHNO,
  ...isInPHYes,
  ...hasBICertYes,
  ...hasPHPassportYES,
  ...hasBICert2Yes,
  ...hasBICert2No,
  ...hasAnotherPassportYes,
};
