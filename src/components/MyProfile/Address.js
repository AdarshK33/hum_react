import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import countryList from "react-select-country-list";
import { OnBoardContext } from "../../context/OnBoardState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import "react-toastify/dist/ReactToastify.css";
import { TransferContext } from "../../context/TransferState";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
const Address = (props) => {
  const { user,fetchemployeeData } = useContext(AppContext);
  const { addressView, addressViewData, bankView, UpdateAddress, uploadFile } =
    useContext(EmployeeProfileContext);
  const {
    getCountryDetails,
    countryDetails,
    getCostCentreLocationDetails,
    costCentreLocationData,
  } = useContext(TransferContext);
  const { stateData, stateList } = useContext(OfferContext);
  const {
    candidateCountryList,
    candidateCountryData,
    CandidateStateList,
    candidateStateData,
    candidatePermanentCityList,
    candidatePresentCityList,
    candidatePermanentCityData,
    candidatePresentCityData,
    addressCreate,
    addressSaveData,
    CandidateProfile,
    candidateProfileData,
  } = useContext(OnBoardContext);

  const [isChecked, changeCheckState] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const [flatNumberErro, setFlatNumberError] = useState(false);
  const [addressLineError, setAddressLineError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);

  const [PermanentFlatNumberError, setPermanentFlatNumberError] =
    useState(false);
  const [PermanentAddressLineError, setPermanentAddressLineError] =
    useState(false);
  const [PermanentCountryError, setPermanentCountryError] = useState(false);
  const [PermanentStateError, setPermanentStateError] = useState(false);
  const [PermanentCityError, setPermanentCityError] = useState(false);
  const [PermanentPinCodeError, setPermanentPinCodeError] = useState(false);
  const [PermanentPhoneNoError, setPermanentPhoneNoError] = useState(false);
  const [saveclick, setSaveclick] = useState(false);
  const [permanetCityData, setPermanentCityData] = useState([]);
  const [presentCityData, setPresentCityData] = useState([]);

  const [state, setState] = useState({
    flatNumber: "",
    street: "",
    locality: "",
    addressLine: "",
    pinCode: "",
    phoneNumber: "",
    addressId: 0,
    addressType: 0,
    employeeId: 0,
    permanentFlatNumber: "",
    permanentStreet: "",
    permanentLocality: "",
    permanentAddressLine: "",
    permanentPinCode: "",
    permanentPhoneNumber: "",
    permanentAddressId: "",
  });
  const [stateOfOb, setStateOfOb] = useState({
    addressProof: "",
  });
  const [stateOfName, setStateOfNames] = useState({
    addressProof: "",
  });
  const [UploadedArray, setUploadedError] = useState([
    {
      ULAddressProof: false,
    },
  ]);

  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [permanentCountryName, setPermanentCountryName] = useState();
  const [permanentStateName, setPermanentStateName] = useState("");
  const [permanentCityName, setPermanentCityName] = useState("");

  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [cityId, setCityId] = useState();
  const [permanentCountryId, setPermanentCountryId] = useState();
  const [permanentStateId, setPermanentStateId] = useState();
  const [permanentCityId, setPermanentCityId] = useState();
  const [addressValue, setAddressValue] = useState(0);
  // un commect
  useEffect(() => {
    addressView(fetchemployeeData.employeeId);
    getCountryDetails();
    getCostCentreLocationDetails();
    stateData();
    bankView(fetchemployeeData.employeeId);
  }, []);

  useEffect(() => {
    if (
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined &&
      Object.keys(addressViewData.presentAddress).length !== 0 &&
      addressViewData.presentAddress.addressType === 0 &&
      addressViewData.permanentAddress !== null &&
      addressViewData.permanentAddress !== undefined &&
      Object.keys(addressViewData.permanentAddress).length !== 0
    ) {
      setState({
        flatNumber: addressViewData.presentAddress.flatNumber,
        street: addressViewData.presentAddress.street,
        locality: addressViewData.presentAddress.locality,
        addressLine: addressViewData.presentAddress.addressLine,
        pinCode: addressViewData.presentAddress.pinCode,
        phoneNumber: addressViewData.presentAddress.phoneNumber,
        addressId: addressViewData.presentAddress.addressId,
        addressType: addressViewData.presentAddress.addressType,
        employeeId: addressViewData.presentAddress.employeeId,

        permanentFlatNumber: addressViewData.permanentAddress.flatNumber,
        permanentStreet: addressViewData.permanentAddress.street,
        permanentLocality: addressViewData.permanentAddress.locality,
        permanentAddressLine: addressViewData.permanentAddress.addressLine,
        permanentPinCode: addressViewData.permanentAddress.pinCode,
        permanentPhoneNumber: addressViewData.permanentAddress.phoneNumber,
        permanentAddressId: addressViewData.permanentAddress.addressId,
      });
    } else if (
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined &&
      Object.keys(addressViewData.presentAddress).length !== 0 &&
      addressViewData.presentAddress.addressType === 1
    ) {
      setState({
        flatNumber: addressViewData.presentAddress.flatNumber,
        street: addressViewData.presentAddress.street,
        locality: addressViewData.presentAddress.locality,
        addressLine: addressViewData.presentAddress.addressLine,
        pinCode: addressViewData.presentAddress.pinCode,
        phoneNumber: addressViewData.presentAddress.phoneNumber,
        addressId: addressViewData.presentAddress.addressId,
        addressType: addressViewData.presentAddress.addressType,
        employeeId: addressViewData.presentAddress.employeeId,

        permanentFlatNumber: addressViewData.presentAddress.flatNumber,
        permanentStreet: addressViewData.presentAddress.street,
        permanentLocality: addressViewData.presentAddress.locality,
        permanentAddressLine: addressViewData.presentAddress.addressLine,
        permanentPinCode: addressViewData.presentAddress.pinCode,
        permanentPhoneNumber: addressViewData.presentAddress.phoneNumber,
        permanentAddressId: addressViewData.presentAddress.addressId,
      });
    } else if (
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined
    ) {
      setState({
        flatNumber: addressViewData.presentAddress.flatNumber,
        street: addressViewData.presentAddress.street,
        locality: addressViewData.presentAddress.locality,
        addressLine: addressViewData.presentAddress.addressLine,
        pinCode: addressViewData.presentAddress.pinCode,
        phoneNumber: addressViewData.presentAddress.phoneNumber,
        addressId: addressViewData.presentAddress.addressId,
        addressType: addressViewData.presentAddress.addressType,
        employeeId: addressViewData.presentAddress.employeeId,
      });
    }
  }, [addressViewData]);
  useEffect(() => {
    if (
      countryDetails !== null &&
      countryDetails !== undefined &&
      Object.keys(countryDetails).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined
    ) {
      countryDetails.map((item, i) => {
        if (item.countryName === addressViewData.presentAddress.country) {
          setCountryName(item.countryName);
        }
      });
    } else {
      setCountryName("");
    }
    if (
      countryDetails !== null &&
      countryDetails !== undefined &&
      Object.keys(countryDetails).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined &&
      Object.keys(addressViewData.presentAddress).length !== 0 &&
      addressViewData.presentAddress.addressType === 0 &&
      addressViewData.permanentAddress !== null &&
      addressViewData.permanentAddress !== undefined &&
      Object.keys(addressViewData.permanentAddress).length !== 0
    ) {
      countryDetails.map((item, i) => {
        if (item.countryName === addressViewData.permanentAddress.country) {
          setPermanentCountryName(item.countryName);
        }
      });
    } else {
      // setPermanentCountryName("");
      if(addressViewData.presentAddress !== null &&
        addressViewData.presentAddress !== undefined &&
        Object.keys(addressViewData.presentAddress).length !== 0){
          countryDetails.map((item, i) => {
            if (item.countryName === addressViewData.presentAddress.country) {
              setPermanentCountryName(item.countryName);
            }
          });
        }

    }
  }, [addressViewData, countryDetails]);
  useEffect(() => {
    if (
      costCentreLocationData !== null &&
      costCentreLocationData !== undefined &&
      Object.keys(costCentreLocationData).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined
    ) {
      costCentreLocationData.map((item, i) => {
        if (item.stateName === addressViewData.presentAddress.state) {
          setStateName(item.stateName);
        }
      });
    } else {
      setStateName("");
    }
    if (
      costCentreLocationData !== null &&
      costCentreLocationData !== undefined &&
      Object.keys(costCentreLocationData).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined &&
      Object.keys(addressViewData.presentAddress).length !== 0 &&
      addressViewData.presentAddress.addressType === 0 &&
      addressViewData.permanentAddress !== null &&
      addressViewData.permanentAddress !== undefined &&
      Object.keys(addressViewData.permanentAddress).length !== 0
    ) {
      costCentreLocationData.map((item, i) => {
        if (item.stateName === addressViewData.permanentAddress.state) {
          setPermanentStateName(item.stateName);
        }
      });
    } else {
      // setPermanentStateName("");
      if (
        costCentreLocationData !== null &&
        costCentreLocationData !== undefined &&
        Object.keys(costCentreLocationData).length !== 0&& addressViewData.presentAddress !== null &&
        addressViewData.presentAddress !== undefined &&
        Object.keys(addressViewData.presentAddress).length !== 0)
        {
      costCentreLocationData.map((item, i) => {
        if (item.stateName === addressViewData.presentAddress.state) {
          setPermanentStateName(item.stateName);
        }
      });
    }
    }
  }, [addressViewData, costCentreLocationData]);

  useEffect(() => {
    if (
      stateList !== null &&
      stateList !== undefined &&
      Object.keys(stateList).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined
    ) {
      stateList.map((item, i) => {
        if (item.cityName === addressViewData.presentAddress.city) {
          setCityName(item.cityName);
        }
      });
    } else {
      setCityName("");
    }
    if (
      stateList !== null &&
      stateList !== undefined &&
      Object.keys(stateList).length !== 0 &&
      addressViewData !== null &&
      addressViewData !== undefined &&
      Object.keys(addressViewData).length !== 0 &&
      addressViewData.presentAddress !== null &&
      addressViewData.presentAddress !== undefined &&
      Object.keys(addressViewData.presentAddress).length !== 0 &&
      addressViewData.presentAddress.addressType === 0 &&
      addressViewData.permanentAddress !== null &&
      addressViewData.permanentAddress !== undefined &&
      Object.keys(addressViewData.permanentAddress).length !== 0
    ) {
      stateList.map((item, i) => {
        if (item.cityName === addressViewData.permanentAddress.city) {
          setPermanentCityName(item.cityName);
        }
      });
    } else {
      // setPermanentCityName("");
      if(stateList !== null &&
        stateList !== undefined &&
        Object.keys(stateList).length !== 0&& addressViewData.presentAddress !== null &&
        addressViewData.presentAddress !== undefined &&
        Object.keys(addressViewData.presentAddress).length !== 0){
          stateList.map((item, i) => {
            if (item.cityName === addressViewData.presentAddress.city) {
              setPermanentCityName(item.cityName);
            }
          });
        }
    }
  }, [addressViewData, stateList]);
  // useEffect(() => {
  //   CandidateProfile();
  //   candidateCountryList();
  //   addressView(candidateProfileData.candidateId);
  //   console.log("intialdata");
  // }, [candidateProfileData]);

  // console.log("address candidate data", candidateProfileData);
  // console.log("candidateCountryList data", candidateCountryData);
  // console.log("addressViewData data", addressViewData);
  // useEffect(() => {
  //   if (
  //     candidateCountryData !== undefined &&
  //     candidateCountryData !== null &&
  //     countryName === ""
  //   ) {
  //     const countryvalue = candidateCountryData.filter(
  //       (i) => i.countryId === addressViewData.countryId
  //     );
  //     console.log("Countryvalue", countryvalue);
  //     setCountryName(countryvalue[0].countryName);
  //   }
  // }, [candidateCountryData]);
  // useEffect(() => {
  //   let permanentStatevalue;
  //   let permanentCityValue;
  //   let stateValue;
  //   let cityValue;
  //   if (
  //     addressViewData !== undefined &&
  //     addressViewData !== null &&
  //     addressViewData.stateId !== undefined &&
  //     addressViewData.stateId !== null
  //   ) {
  //     stateValue = candidateStateData.filter(
  //       (i) => i.stateId === addressViewData.stateId
  //     );
  //     console.log("stateValue", stateValue);
  //     if (stateValue.length !== 0) {
  //       setStateId(stateValue[0].stateId);
  //       setStateName(stateValue[0].stateName);
  //       candidatePresentCityList(addressViewData.stateId);
  //     }
  //     setPresentCityData(candidatePresentCityData);
  //     permanentStatevalue = candidateStateData.filter(
  //       (i) => i.stateId === addressViewData.permanentStateId
  //     );
  //     if (permanentStatevalue.length !== 0) {
  //       setPermanentStateId(permanentStatevalue[0].stateId);
  //       setPermanentStateName(permanentStatevalue[0].stateName);
  //       candidatePermanentCityList(addressViewData.permanentStateId);
  //     }
  //   }
  // }, [candidateStateData, addressViewData]);
  // useEffect(() => {
  //   let cityValue;
  //   if (addressViewData !== undefined && addressViewData !== null) {
  //     cityValue = candidatePresentCityData.filter(
  //       (i) => i.cityId == addressViewData.cityId
  //     );
  //     console.log("present............", cityValue);

  //     setPresentCityData(cityValue);

  //     let permanentCityValue;

  //     if (addressViewData.addressType === 0) {
  //       permanentCityValue = candidatePermanentCityData.filter(
  //         (i) => i.cityId === addressViewData.permanentCityId
  //       );
  //       setPermanentCityData(permanentCityValue);
  //     }
  //   }
  // }, [addressViewData, candidatePresentCityData, candidatePermanentCityData]);

  // useEffect(() => {
  //   if (permanetCityData.length !== 0) {
  //     setPermanentCityId(permanetCityData[0].cityId);
  //     setPermanentCityName(permanetCityData[0].cityName);
  //   }
  // }, [candidateStateData, permanetCityData]);
  // useEffect(() => {
  //   if (presentCityData.length !== 0) {
  //     setCityId(presentCityData[0].cityId);
  //     setCityName(presentCityData[0].cityName);
  //   }
  // }, [candidateStateData, presentCityData]);
  // useEffect(() => {
  //   console.log("prefill data", addressViewData);
  //   let countryvalue;
  //   let stateValue;
  //   let cityValue;
  //   let permanentCountryvalue;

  //   if (addressViewData !== undefined && addressViewData !== null) {
  //     if (addressViewData.addressType === 0) {
  //       setAddressValue(addressViewData.addressId);
  //       if (
  //         candidateCountryData !== null &&
  //         candidateCountryData !== undefined &&
  //         candidateCountryData.length !== 0
  //       ) {
  //         countryvalue = candidateCountryData.filter(
  //           (i) => i.countryId === addressViewData.countryId
  //         );
  //         console.log("Countryvalue", countryvalue);
  //         if (countryvalue !== undefined && countryvalue !== null) {
  //           setCountryName(countryvalue[0].countryName);
  //           setCountryId(countryvalue[0].countryId);
  //           CandidateStateList(countryvalue[0].countryName);
  //         }

  //         permanentCountryvalue = candidateCountryData.filter(
  //           (i) => i.countryId === addressViewData.permanentCountryId
  //         );
  //         console.log("permanentCountryvalue", permanentCountryvalue);
  //         if (
  //           permanentCountryvalue !== undefined &&
  //           permanentCountryvalue !== null
  //         ) {
  //           setPermanentCountryId(permanentCountryvalue[0].countryId);
  //           setPermanentCountryName(permanentCountryvalue[0].countryName);
  //           CandidateStateList(permanentCountryvalue[0].countryName);
  //         }
  //       }

  //       changeCheckState(false);
  //       setState({
  //         flatNumber: addressViewData.flatNumber,
  //         street: addressViewData.street,
  //         locality: addressViewData.locality,
  //         addressLine: addressViewData.addressLine,
  //         pinCode: addressViewData.pinCode,
  //         phoneNumber: addressViewData.phoneNumber,
  //         permanentFlatNumber: addressViewData.permanentFlatNumber,
  //         permanentStreet: addressViewData.permanentStreet,
  //         permanentLocality: addressViewData.permanentLocality,
  //         permanentAddressLine: addressViewData.permanentAddressLine,
  //         permanentPinCode: addressViewData.permanentPinCode,
  //         permanentPhoneNumber: addressViewData.permanentPhoneNumber,
  //       });
  //     } else if (addressViewData.addressType === 1) {
  //       setAddressValue(addressViewData.addressId);
  //       if (
  //         candidateCountryData !== null &&
  //         candidateCountryData !== undefined &&
  //         candidateCountryData.length !== 0
  //       ) {
  //         countryvalue = candidateCountryData.filter(
  //           (i) => i.countryId === addressViewData.countryId
  //         );
  //         console.log("Countryvalue", countryvalue);
  //         setCountryName(countryvalue[0].countryName);
  //         setCountryId(countryvalue[0].countryId);
  //         CandidateStateList(countryvalue[0].countryName);
  //         stateValue = candidateStateData.filter(
  //           (i) => i.stateId === addressViewData.stateId
  //         );
  //         console.log("stateValue", stateValue);

  //         if (stateValue.length !== 0) {
  //           setStateId(stateValue[0].stateId);
  //           setStateName(stateValue[0].stateName);
  //           candidatePresentCityList(stateValue[0].stateId);
  //         }
  //       }

  //       changeCheckState(true);
  //       setState({
  //         flatNumber: addressViewData.flatNumber,
  //         street: addressViewData.street,
  //         locality: addressViewData.locality,
  //         addressLine: addressViewData.addressLine,
  //         pinCode: addressViewData.pinCode,
  //         phoneNumber: addressViewData.phoneNumber,
  //       });
  //     }
  //   }
  // }, [addressViewData]);

  const flatNumberValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.flatNumber !== "" && state.flatNumber !== undefined) {
      setFlatNumberError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setFlatNumberError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const addressLineValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.addressLine !== "" && state.addressLine !== undefined) {
      setAddressLineError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setAddressLineError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const countryValidation = () => {
    console.log("--------------->", countryName);
    if (
      (countryName !== null) &
      (countryName !== undefined) &
      (countryName !== "") &
      (countryName !== "Select Country")
    ) {
      setCountryError(false);
      console.log("CountrySucess");
      return true;
    } else {
      setCountryError(true);
      console.log("countryFaill");
      return false;
    }
  };
  const StateValidation = () => {
    if (
      (stateName !== null) &
      (stateName !== undefined) &
      (stateName !== 0) &
      (stateName !== "") &
      (stateName !== "Select State")
    ) {
      setStateError(false);
      console.log("StateSucess");
      return true;
    } else {
      setStateError(true);
      console.log("stateFaill");
      return false;
    }
  };
  const CityValidation = () => {
    if (
      (cityName !== null) &
      (cityName !== undefined) &
      (cityName !== 0) &
      (cityName !== "") &
      (cityName !== "Select City")
    ) {
      setCityError(false);
      console.log("citySucess");
      return true;
    } else {
      setCityError(true);
      console.log("cityFaill");
      return false;
    }
  };
  const PinCodeErrorValidations = () => {
    const aadharValid = /^[0-9\b]+$/;
    if (
      state.pinCode !== "" &&
      state.pinCode !== undefined &&
      aadharValid.test(state.pinCode) &&
      state.pinCode.length === 6
    ) {
      setPinCodeError(false);

      console.log("pinCodeSuccess", state.pinCode.length);
      return true;
    } else {
      setPinCodeError(true);
      console.log("pinCodeFailError");
      return false;
    }
  };
  const PhoneNoErrorValidations = () => {
    const aadharValid = /^[0-9\b]+$/;

    if (
      state.phoneNumber !== "" &&
      state.phoneNumber !== undefined &&
      aadharValid.test(state.phoneNumber) &&
      state.phoneNumber.length === 10
    ) {
      setPhoneNoError(false);
      console.log("phoneNoeSuccess");
      return true;
    } else {
      setPhoneNoError(true);
      console.log("phoneNumberFailError");
      return false;
    }
  };

  const permanentFlatNumberValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    console.log("------>pFNo", state.permanentFlatNumber);
    if (
      state.permanentFlatNumber !== "" &&
      state.permanentFlatNumber !== null &&
      state.permanentFlatNumber !== undefined
    ) {
      setPermanentFlatNumberError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setPermanentFlatNumberError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const permanentAddressLineValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.permanentAddressLine !== "" &&
      state.permanentAddressLine !== null &&
      state.permanentAddressLine !== undefined
    ) {
      setPermanentAddressLineError(false);
      console.log("addresSuccess");
      return true;
    } else {
      setPermanentAddressLineError(true);
      console.log("addressError");
      return false;
    }
  };
  const permanentCountryValidation = () => {
    if (
      (permanentCountryName !== null) &
      (permanentCountryName !== undefined) &
      (permanentCountryName !== "") &
      (permanentCountryName !== "Select Country")
    ) {
      setPermanentCountryError(false);
      console.log("CountrySucess");
      return true;
    } else {
      setPermanentCountryError(true);
      console.log("countryFaill");
      return false;
    }
  };
  const permanentStateValidation = () => {
    if (
      (permanentStateName !== null) &
      (permanentStateName !== undefined) &
      (permanentStateName !== 0) &
      (permanentStateName !== "") &
      (permanentStateName !== "Select State")
    ) {
      setPermanentStateError(false);
      console.log("StateSucess");
      return true;
    } else {
      setPermanentStateError(true);
      console.log("stateFaill");
      return false;
    }
  };
  const permanentCityValidation = () => {
    if (
      (permanentCityName !== null) &
      (permanentCityName !== undefined) &
      (permanentCityName !== 0) &
      (permanentCityName !== "") &
      (permanentCityName !== "Select City")
    ) {
      setPermanentCityError(false);
      console.log("citySucess");
      return true;
    } else {
      setPermanentCityError(true);
      console.log("cityFaill");
      return false;
    }
  };
  const permanentPinCodeErrorValidations = () => {
    const aadharValid = /^[0-9\b]+$/;
    if (
      state.permanentPinCode !== "" &&
      aadharValid.test(state.permanentPinCode) &&
      state.permanentPinCode.length === 6
    ) {
      setPermanentPinCodeError(false);
      console.log("pinCodeSuccess");
      return true;
    } else {
      setPermanentPinCodeError(true);
      console.log("pinCodeFailError");
      return false;
    }
  };
  const permanentPhoneNoErrorValidations = () => {
    const aadharValid = /^[0-9\b]+$/;
    if (
      state.permanentPhoneNumber !== "" &&
      aadharValid.test(state.permanentPhoneNumber) &&
      state.permanentPhoneNumber.length === 10
    ) {
      setPermanentPhoneNoError(false);
      console.log("phoneNoeSuccess");
      return true;
    } else {
      setPermanentPhoneNoError(true);
      console.log("phoneNumberFailError");
      return false;
    }
  };

  const checkValidations = () => {
    // if (
    //   (flatNumberValidation() == true) &
    //   (addressLineValidations() == true) &
    //   (countryValidation() == true) &
    //   (StateValidation() == true) &
    //   (CityValidation() == true) &
    //   (PinCodeErrorValidations() == true) &
    //   (PhoneNoErrorValidations() == true)
    // ) {
      if (
        addressViewData !== null &&
        addressViewData !== undefined &&
        Object.keys(addressViewData).length !== 0 &&
        addressViewData.presentAddress !== null &&
        addressViewData.presentAddress !== undefined &&
        Object.keys(addressViewData.presentAddress).length !== 0 &&
        addressViewData.presentAddress.addressType === 0
      ) {
        console.log("isChecked");
        if (
          (permanentFlatNumberValidation() == true) &
          (permanentAddressLineValidations() == true) &
          (permanentCountryValidation() == true) &
          (permanentCityValidation() == true) &
          (permanentStateValidation() == true) &
          (permanentPinCodeErrorValidations() == true) &
          (permanentPhoneNoErrorValidations() == true)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    // } 
    //else {
    //   return false;
    // }
  };
  const countryHandler = (e) => {
    // console.log("countryHandler", e.target.value);
    // let filteredListOfCountry = candidateCountryData.filter(
    //   (i) => i.countryName === e.target.value
    // );
    // console.log("filteredListOfCountry", filteredListOfCountry);
    setCountryName(e.target.value);
    // setCountryId(filteredListOfCountry[0].countryId);
    // CandidateStateList(filteredListOfCountry[0].countryName);
  };

  const stateHandler = (e) => {
    // console.log("stateHandler", e.target.value);
    // let filteredListOfState = candidateStateData.filter(
    //   (i) => i.stateName === e.target.value
    // );
    // console.log("filteredListOfState", filteredListOfState);
    setStateName(e.target.value);
    // setStateId(filteredListOfState[0].stateId);
    // candidatePresentCityList(filteredListOfState[0].stateId);
  };

  const cityHandler = (e) => {
    // let filteredListOfCity = candidatePresentCityData.filter(
    //   (i) => i.cityName === e.target.value
    // );
    // console.log("filteredListOfCity", filteredListOfCity);
    setCityName(e.target.value);
    // setCityId(filteredListOfCity[0].cityId);
  };

  const permanentCountryHandler = (e) => {
    // let filteredListOfCountry = candidateCountryData.filter(
    //   (i) => i.countryName === e.target.value
    // );
    // console.log("filteredListOfCountry", filteredListOfCountry);
    setPermanentCountryName(e.target.value);
    // setPermanentCountryId(filteredListOfCountry[0].countryId);
    // CandidateStateList(filteredListOfCountry[0].countryName);
  };

  const permanentStateHandler = (e) => {
    // let filteredListOfState = candidateStateData.filter(
    //   (i) => i.stateName === e.target.value
    // );
    // console.log("filteredListOfState", filteredListOfState);
    setPermanentStateName(e.target.value);
    // setPermanentStateId(filteredListOfState[0].stateId);
    // candidatePermanentCityList(filteredListOfState[0].stateId);
  };

  const permanentCityHandler = (e) => {
    // let filteredListOfCity = candidatePermanentCityData.filter(
    //   (i) => i.cityName === e.target.value
    // );
    // console.log("filteredListOfCity", filteredListOfCity);
    setPermanentCityName(e.target.value);
    // setPermanentCityId(filteredListOfCity[0].cityId);
  };
  const changeHandler1 = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    if (
      fileObj.type === "image/jpeg" ||
      fileObj.type === "image/jpg" ||
      fileObj.type === "image/png" ||
      fileObj.type === "application/pdf"
    ) {
      if (fileObj.size/(1024*1024)<= 2) {
        setStateOfOb({
          ...stateOfOb,
          [event.target.name]: fileObj,
        });
        setStateOfNames({
          ...stateOfName,
          [event.target.name]: fileObj.name,
        });

        if (event.target.name === "addressProof") {
          UploadedArray[0].ULAddressProof = false;
        }
      } else {
        toast.error("File size should not exceed 2mb");
      }
    } else {
      toast.error("Please select jpg, jpeg, png and pdf formats");
    }
  };
  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "addressProof") {
      // if (AddressProofValidation() === true) {
      fileUpload = stateOfOb.addressProof;
      fileType = 3;
      UploadedArray[0].ULAddressProof = true;
      // }
    }
    if (fileUpload) {
      console.log("inside file info", fileUpload, fileType);
      const fileInfo = {
        employeeId: fetchemployeeData.employeeId,
        file: fileUpload,
        fileType: fileType,
      };
      console.log("handleUpload", fileInfo);
      uploadFile(fileInfo);
    } else {
      toast.info("Please select file");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      console.log("Inside the address submit");
      // setSaveclick(true);

      const AddressInfo = {
        presentAddress: {
          addressId: state.addressId?state.addressId:0,
          addressLine: state.addressLine,
          // addressProof: ,
          addressType: state.addressType,
          city: cityName,
          country: countryName,
          employeeId: fetchemployeeData.employeeId,
          flatNumber: state.flatNumber,
          locality: state.locality,
          phoneNumber: state.phoneNumber,
          pinCode: state.pinCode,
          state: stateName,
          street: state.street,
          addressType: 0
        },

        permanentAddress:
          addressViewData !== null &&
          addressViewData !== undefined &&
          Object.keys(addressViewData).length !== 0 &&
          addressViewData.presentAddress !== null &&
          addressViewData.presentAddress !== undefined &&
          Object.keys(addressViewData.presentAddress).length !== 0 &&
          addressViewData.presentAddress.addressType === 0
            ? {
                addressId: state.permanentAddressId?state.permanentAddressId:0,
                addressLine: state.permanentAddressLine,
                // addressProof: "string",
                city: permanentCityName,
                country: permanentCountryName,
                employeeId: fetchemployeeData.employeeId,
                flatNumber: state.permanentFlatNumber,
                locality: state.permanentLocality,
                phoneNumber: state.permanentPhoneNumber,
                pinCode: state.permanentPinCode,
                state: permanentStateName,
                street: state.permanentStreet,
              }:((addressViewData.permanentAddress == null  ||
                addressViewData.permanentAddress == undefined) && ( addressViewData.presentAddress == null 
                  || addressViewData.presentAddress == null)
                 )?{
                  addressId: state.permanentAddressId?state.permanentAddressId:0,
                  addressLine: state.permanentAddressLine,
                  // addressProof: "string",
                  city: permanentCityName,
                  country: permanentCountryName,
                  employeeId: fetchemployeeData.employeeId,
                  flatNumber: state.permanentFlatNumber,
                  locality: state.permanentLocality,
                  phoneNumber: state.permanentPhoneNumber,
                  pinCode: state.permanentPinCode,
                  state: permanentStateName,
                  street: state.permanentStreet,
                }:(((addressViewData.permanentAddress == null  ||
                  addressViewData.permanentAddress == undefined) ||( addressViewData.presentAddress !== null 
                    || addressViewData.presentAddress !== undefined)) && addressViewData.presentAddress.addressType === 1
                   )?{
                    addressId: state.permanentAddressId?state.permanentAddressId:0,
                    addressLine: state.permanentAddressLine,
                    // addressProof: "string",
                    city: permanentCityName,
                    country: permanentCountryName,
                    employeeId: fetchemployeeData.employeeId,
                    flatNumber: state.permanentFlatNumber,
                    locality: state.permanentLocality,
                    phoneNumber: state.permanentPhoneNumber,
                    pinCode: state.permanentPinCode,
                    state: permanentStateName,
                    street: state.permanentStreet,
                  }
            : null,
      };

      console.log("address payload", AddressInfo);
      UpdateAddress(AddressInfo);
      // addressCreate(AddressInfo);
      // const nextPage = props.NextStep;
      // nextPage(true);
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const handleCheckboxChange = (e) => {
    changeCheckState(e.target.checked);
    console.log(isChecked);
  };
  const handleNoCheckboxChange = (e) => {
    changeCheckState(!e.target.checked);
    console.log(isChecked);
  };
  return (
    console.log("cityName", presentCityData),
    console.log("permanet", permanetCityData),
    (
      <Fragment>
        {/* <ToastContainer /> */}
        <Form>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={6}>
              <div>
                <label>
                  <b>Present Address</b>
                </label>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2rem" }}>
            {/* <div className="divContents"> */}
            <div className="col-sm-3">
              {/* <label for="validationCustom03" class="form-label">City</label>
      <input type="text" class="form-control" id="validationCustom03" required/>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div> */}
              <Form.Group>
                <Form.Label>
                  <b>Flat/Plot No</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="flatNumber"
                  value={state.flatNumber}
                  onChange={changeHandler}
                  required
                  style={flatNumberErro ? { borderColor: "red" } : {}}
                  placeholder="Flat/Plot No"
                  disabled={disabled}
                />
                {flatNumberErro ? (
                  <p style={{ color: "red" }}> Please enter flat/plot no</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>Street</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={state.street}
                  onChange={changeHandler}
                  placeholder="Street"
                  disabled={disabled}
                />
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>Locality</b>
                </Form.Label>

                <Form.Control
                  type="text"
                  name="locality"
                  value={state.locality}
                  onChange={changeHandler}
                  placeholder="Locality"
                  disabled={disabled}
                />
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>Address Line 1</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="addressLine"
                  value={state.addressLine}
                  onChange={changeHandler}
                  required
                  style={addressLineError ? { borderColor: "red" } : {}}
                  placeholder="Address Line 1"
                  disabled={disabled}
                />
                {addressLineError ? (
                  <p style={{ color: "red" }}> Please enter address line1</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            {/* </div> */}
          </Row>
          <Row style={{ marginBottom: "2rem" }}>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b> Country </b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="countryId"
                  value={countryName}
                  onChange={(e) => countryHandler(e)}
                  required
                  style={countryError ? { borderColor: "red" } : {}}
                  disabled={disabled}
                >
                  <option value="">Select Country</option>
                  {countryDetails !== null &&
                    countryDetails !== undefined &&
                    countryDetails.length > 0 &&
                    countryDetails.map((item, i) => {
                      return (
                        <option key={item.countryId}>{item.countryName}</option>
                      );
                    })}
                </Form.Control>
                {countryError ? (
                  <p style={{ color: "red" }}> Please choose country</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>State</b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="stateId"
                  value={stateName}
                  style={stateError ? { borderColor: "red" } : {}}
                  onChange={(e) => stateHandler(e)}
                >
                  <option value="">Select State</option>
                  {costCentreLocationData !== null &&
                    costCentreLocationData !== undefined &&
                    costCentreLocationData.length > 0 &&
                    costCentreLocationData.map((item, i) => {
                      return (
                        <option key={item.stateId}>{item.stateName}</option>
                      );
                    })}
                </Form.Control>
                {stateError ? (
                  <p style={{ color: "red" }}> Please choose state</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>City </b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="cityId"
                  value={cityName}
                  style={cityError ? { borderColor: "red" } : {}}
                  onChange={cityHandler}
                >
                  <option value="">Select City</option>
                  {stateList !== null &&
                    stateList !== undefined &&
                    stateList.length > 0 &&
                    stateList.map((item, i) => {
                      return <option key={item.cityId}>{item.cityName}</option>;
                    })}
                </Form.Control>
                {cityError ? (
                  <p style={{ color: "red" }}> Please choose city</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>

            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>PinCode</b>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="pinCode"
                  value={state.pinCode}
                  onChange={changeHandler}
                  maxLength="6"
                  required
                  style={pinCodeError ? { borderColor: "red" } : {}}
                  placeholder="Pin Code"
                  disabled={disabled}
                />
                {pinCodeError ? (
                  <p style={{ color: "red" }}> Please enter valid pin code</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>
          <Row style={{ marginBottom: "2rem" }}>
            <div className="col-sm-3">
              <Form.Group>
                <Form.Label>
                  <b>Phone No</b>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  value={state.phoneNumber}
                  onChange={changeHandler}
                  maxLength="10"
                  required
                  style={phoneNoError ? { borderColor: "red" } : {}}
                  placeholder="Phone No"
                  disabled={disabled}
                />
                {phoneNoError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    Please enter valid phone number{" "}
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>
          {/* <Row style={{ marginBottom: "2rem" }}>
            <Col sm={5}>
              <div>
                <label>
                  <b>Is permanent address same as present address ?</b>
                </label>
              </div>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField input">
                
                  <input
                    type="checkbox"
                    value="No"
                    checked={!isChecked}
                    onChange={handleNoCheckboxChange}
                  />
                  <label>No </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField input">
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label>Yes</label>
                </div>
              </Form.Group>
            </Col>
          </Row> */}
          {isChecked ? (
            <div></div>
          ) : (
            <div>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={6}>
                  <div>
                    <label>
                      <b>Permanent Address</b>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                {/* <div className="divContents"> */}
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Flat/Plot No</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="permanentFlatNumber"
                      value={state.permanentFlatNumber}
                      onChange={changeHandler}
                      required
                      style={
                        PermanentFlatNumberError ? { borderColor: "red" } : {}
                      }
                      placeholder="Flat/Plot No"
                      disabled={disabled}
                    />
                    {PermanentFlatNumberError ? (
                      <p style={{ color: "red" }}> Please enter flat/plot no</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Street</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="permanentStreet"
                      value={state.permanentStreet}
                      onChange={changeHandler}
                      required
                      placeholder="Street"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Locality</b>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="permanentLocality"
                      value={state.permanentLocality}
                      onChange={changeHandler}
                      required
                      placeholder="Locality"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Address Line 1</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="permanentAddressLine"
                      value={state.permanentAddressLine}
                      onChange={changeHandler}
                      required
                      style={
                        PermanentAddressLineError ? { borderColor: "red" } : {}
                      }
                      placeholder="Address Line 1"
                      disabled={disabled}
                    />
                    {PermanentAddressLineError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        Please enter address line1
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                {/* </div> */}
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Country </b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="permanentCountryId"
                      value={permanentCountryName}
                      onChange={permanentCountryHandler}
                      required
                      style={
                        PermanentCountryError ? { borderColor: "red" } : {}
                      }
                      disabled={disabled}
                    >
                      <option value="">Select Country</option>
                      {countryDetails !== null &&
                        countryDetails !== undefined &&
                        countryDetails.length > 0 &&
                        countryDetails.map((item) => {
                          return (
                            <option key={item.countryId}>
                              {item.countryName}
                            </option>
                          );
                        })}
                    </Form.Control>
                    {PermanentCountryError ? (
                      <p style={{ color: "red" }}> Please choose country</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b> State</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="permanentStateId"
                      value={permanentStateName}
                      style={PermanentStateError ? { borderColor: "red" } : {}}
                      onChange={permanentStateHandler}
                    >
                      <option value="">Select State</option>
                      {costCentreLocationData !== null &&
                        costCentreLocationData !== undefined &&
                        costCentreLocationData.length > 0 &&
                        costCentreLocationData.map((item) => {
                          return (
                            <option key={item.stateId}>{item.stateName}</option>
                          );
                        })}
                    </Form.Control>
                    {PermanentStateError ? (
                      <p style={{ color: "red" }}> Please choose state</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>City</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="permanentCityId"
                      value={permanentCityName}
                      style={PermanentCityError ? { borderColor: "red" } : {}}
                      onChange={permanentCityHandler}
                    >
                      <option value="">Select City</option>
                      {stateList !== null &&
                        stateList !== undefined &&
                        stateList.length > 0 &&
                        stateList.map((item) => {
                          return (
                            <option key={item.cityId}>{item.cityName}</option>
                          );
                        })}
                    </Form.Control>
                    {PermanentCityError ? (
                      <p style={{ color: "red" }}> Please choose city</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>

                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>PinCode</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="permanentPinCode"
                      value={state.permanentPinCode}
                      onChange={changeHandler}
                      maxLength="6"
                      required
                      style={
                        PermanentPinCodeError ? { borderColor: "red" } : {}
                      }
                      placeholder="Pin Code"
                      disabled={disabled}
                    />
                    {PermanentPinCodeError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        Please enter valid pin code
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <div className="col-sm-3">
                  <Form.Group>
                    <Form.Label>
                      <b>Phone No</b><span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="permanentPhoneNumber"
                      value={state.permanentPhoneNumber}
                      onChange={changeHandler}
                      maxLength="10"
                      required
                      style={
                        PermanentPhoneNoError ? { borderColor: "red" } : {}
                      }
                      placeholder="Phone No"
                      disabled={disabled}
                    />
                    {PermanentPhoneNoError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        Please enter valid phone number
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </div>
          )}
          <Row style={{ marginTop: "2rem", marginLeft: "-2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInputWithOutStar">
                  <label>
                    {" "}
                    <b>Upload Address Proof</b>
                  </label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.addressProof !== ""
                      ? stateOfName.addressProof
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      name="addressProof"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler1(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="addressProof"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {/* {addressProofError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the address
                    Proof
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              textAlign: "right",
            }}
          >
            <button className="profileButtons" onClick={submitHandler}>
              Update
            </button>
          </div>
        </Form>
      </Fragment>
    )
  );
};
export default Address;
