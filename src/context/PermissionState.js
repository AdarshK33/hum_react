import React, { createContext, useCallback, useReducer, useState } from "react";
import { client } from "../utils/axios";
import PermissionReducer from "../reducers/PermissionReducer";
import { toast } from "react-toastify";

const initial_state = {
  permission: false,
  locationDetailsList: [],
  monthlyQtyDetailsList: [],
  permissionList: [],
  groupList: [],
  rolePermission: "",
  grantManagerAccessData: {},
  imageViewData: {}
};

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PermissionReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const ImageView = (data, employeeId) => {
    return client.get(`/api/v1/document/view/file/${employeeId}?fileName=${data}`).then((response) => {
      console.log(response.data, "grantValue")
      state.imageViewData = response.data
      return dispatch({
        type: "IMAGE_VIEW",
        payload: state.imageViewData,
      });
    }).catch((error) => {
      console.log(error)
    })
  }
  const GrantManagerAccess = (employeeId, grantValue) => {

    return client
      .post(`/api/v1/employee/profile/update/roles/${employeeId}?isManager=${grantValue}`)
      .then((response) => {
        console.log(response.data, "grantValue")
        state.grantManagerAccessData = response.data
        toast.info(response.data.message);
        return dispatch({
          type: "GRANT_MANAGER_ACCESS",
          payload: state.grantManagerAccessData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout((handler) => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const DebounceSearching = (functionHandler) => {
    const optimizedSearch = useCallback(debounce(functionHandler), []);
    return optimizedSearch;
  };

  const editPermission = (val) => {
    // console.log("====================NAV================");
    // console.log(val)
    return client
      .post("/api/v1/email/create", val)
      .then((response) => {
        toast.info(response.data.message);
        return dispatch({
          type: "SET_PERMISSION",
          payload: state.permissionList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const locationDetails = () => {
    return client
      .get("/api/v1/location/view")
      .then((response) => {
        if (response.data.data === null) {
          state.locationDetailsList = [];
        } else {
          state.locationDetailsList = response.data.data;
        }

        return dispatch({
          type: "LOCATION_DETAILS_LIST",
          payload: state.locationDetailsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const monthlyQtyDetails = (id, month, year) => {
    // console.log(id);
    // console.log(month);
    // console.log(year);
    setLoader(true);
    return client
      .get(
        "/api/v1/monthly/view?" +
        "&month=" +
        month +
        "&storeId=" +
        id +
        "&year=" +
        year
      )
      .then((response) => {
        if (response.data.data === null) {
          state.monthlyQtyDetailsList = [];
          // toast.info("No Records Found")
        } else {
          state.monthlyQtyDetailsList = response.data.data;
        }
        setLoader(false);
        return dispatch({
          type: "MONTHLY_QTY_DETAILS_LIST",
          payload: state.monthlyQtyDetailsList,
          loader: loader,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const uploadMonthFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return client
      .post("/api/v1/monthly/upload", formData)
      .then((response) => {
        console.log(response, "res");
        toast.info(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewPermission = () => {
    return client
      .get("/api/v1/email/view")
      .then((response) => {
        if (response.data.data !== null) {
          state.permissionList = response.data.data[0];
          console.log("service permission list if", state.permissionList);
        } else {
          state.permissionList = response.data.data;
          console.log("service permission list else", state.permissionList);
        }

        console.log("service permission list", state.permissionList);
        return dispatch({
          type: "VIEW_PERMISSION",
          payload: state.permissionList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Service group permission get api
  const viewServiceGroup = async () => {
    try {
      const result = await client.get("/api/v1/service_group/view");
      if (result.data.data !== null) {
        state.groupList = result.data.data[0];
        console.log("service group list if", state.groupList);
      } else {
        state.groupList = result.data.data;
        console.log("service group list else", state.groupList);
      }

      console.log("service group list", state.groupList);
      return dispatch({ type: "GROUP_LIST", payload: state.groupList });
    } catch (error) {
      console.log(error);
    }
  };

  //Service group permission post api
  const createServiceGroup = async (values) => {
    console.log("values in state", values);
    try {
      const result = await client.post("/api/v1/service_group/create", values);
      toast.info(result.data.message);
      viewServiceGroup();
      return dispatch({ type: "CREATE_GROUP", payload: state.groupList });
    } catch (error) {
      console.log(error);
    }
  };

  const permissionRoleAccess = (role) => {
    console.log("roleAccess", role);
    state.rolePermission = role;
    return dispatch({
      type: "ROLE_ACCESS_PERMISSION",
      payload: state.rolePermission,
    });
  };

  //Service group permission get api
  //   const viewServiceGroup = async() => {
  //     try {
  //         const result = await client.get('/service_group/view')
  //         if(result.data.data !== null){
  //             state.groupList = result.data.data[0]
  //             console.log("service group list if", state.groupList)
  //         }else{
  //             state.groupList = result.data.data
  //             console.log("service group list else", state.groupList)
  //         }

  //         console.log("service group list", state.groupList)
  //         return dispatch({type:'GROUP_LIST', payload: state.groupList})
  //     }
  //     catch(error){
  //         console.log(error)
  //     }
  // }

  // //Service group permission post api
  // const createServiceGroup = async(values) => {
  //     console.log("values in state", values)
  //     try {
  //         const result = await client.post('/service_group/create',values)
  //         toast.info(result.data.message)
  //         viewServiceGroup()
  //         return dispatch({type:'CREATE_GROUP', payload: state.groupList})
  //     }
  //     catch(error){
  //         console.log(error)
  //     }

  return (
    <PermissionContext.Provider
      value={{
        editPermission,
        locationDetails,
        monthlyQtyDetails,
        viewPermission,
        uploadMonthFile,
        viewServiceGroup,
        createServiceGroup,
        permissionRoleAccess,
        DebounceSearching,
        GrantManagerAccess,
        ImageView,
        imageViewData: state.imageViewData,
        grantManagerAccessData: state.grantManagerAccessData,
        permission: state.permission,
        locationDetailsList: state.locationDetailsList,
        monthlyQtyDetailsList: state.monthlyQtyDetailsList,
        permissionList: state.permissionList,
        loader: loader,
        groupList: state.groupList,
        rolePermission: state.rolePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
