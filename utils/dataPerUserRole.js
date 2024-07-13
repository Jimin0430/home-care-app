import CaregiverHomeScreen from "../screens/Caregiver/CaregiverHomeScreen";
import PatientHomeScreen from "../screens/Patient/PatientHomeScreen";
import AspiringCaregiverHomeScreen from "../screens/AspiringCaregiver/AspiringCaregiverHomeScreen";

import CaregiverMyPageScreen from "../screens/Caregiver/CaregiverMyPageScreen";
import PatientMyPageScreen from "../screens/Patient/PatientMyPageScreen";
export const dataPerUserRole = [
  {
    index: 0,
    userRole: "Caregiver",
    loginPage: "SignInCaregiver",
    text: "요양사에요.",
    homePage: CaregiverHomeScreen,
    myPage: CaregiverMyPageScreen,
  },
  {
    index: 1,
    userRole: "Patient",
    loginPage: "SignInPatient",
    text: "환자에요.",
    homePage: PatientHomeScreen,
    myPage: PatientMyPageScreen,
  },
  {
    index: 2,
    userRole: "AspiringCaregiver",
    loginPage: "SignInCaregiver",
    text: "요양사 자격증 취득을 원해요.",
    homePage: AspiringCaregiverHomeScreen,
    myPage: null,
  },
];