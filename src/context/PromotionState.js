import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import PromotionReducer from "../reducers/PromotionReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {
  promotionList: [],
  promotionIdData: {},
  positionNew: [],
  promotionCreate: {},
  total: {},
  data: [],
  promotionLetterData: {},
  promotionByEmployee: {},
  approvePromotionData: {},
  rejectPromotionData: {},
  employeeDetails:[],
  promotionEmployeeDetails:[]

};

export const PromotionContext = createContext();

export const PromotionProvider = (props) => {
  const [state, dispatch] = useReducer(PromotionReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const [createdPromotion, setCreatedPromotion] = useState(false);
  const [lettterview, setLetterView] = useState(false);

  const setViewLetter = (val) => {
    setLetterView(val);
  };

  const promotionListView = (key, page, status = 6, role) => {
    console.log(key, page, client.defaults.headers, "promotion ");
    console.log(key, page, "promotion ");
    setLoader(true);
    client
      .get(
        "/api/v1/promotion/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&status=" +
          status +
          "&superManager=" +
          role
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.promotionList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        makeViewPromotionById();
        setCreatedPromotion(false);
        setLoader(false);
        return dispatch({
          type: "PROMOTION_LIST",
          payload: state.promotionList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const makeViewPromotionById = () => {
    state.promotionIdData = {};
    return dispatch({
      type: "PROMOTION_ID",
      payload: state.promotionIdData,
    });
  };
  const ViewPromotionById = (promotionId) => {
    setLoader(true);
    client
      .get("/api/v1/promotion/search/" + promotionId)
      .then((response) => {
        state.promotionIdData = response.data.data;

        setLoader(false);
        console.log("--->promotionIdData", state.promotionIdData);
        console.log(response);

        return dispatch({
          type: "PROMOTION_ID",
          payload: state.promotionIdData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PositionNew = (depId, oldPosition) => {
    setLoader(true);
    console.log(oldPosition);
    client
      .get("/api/v1/position/view/deptId?deptId=" + depId)
      .then((response) => {
        state.positionNew = response.data.data.filter(
          (item) => item.position.toLowerCase() !== oldPosition.toLowerCase()
        );
        setLoader(false);
        console.log("--->", state.positionNew);
        console.log(response);
        return dispatch({
          type: "POSITION_NEW",
          payload: state.positionNew,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generatePromotionLetter = (id) => {
    console.log("candidate id", id);
    setLoader(true);
    return client
      .get("/api/v1/promotion/letter/" + id)
      .then((response) => {
        state.promotionLetterData = response.data.data;
        console.log("offer.message", state.promotionLetterData);
        setLoader(false);
        return dispatch({
          type: "PROMOTION_LETTER_DATA",
          payload: state.promotionLetterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PromotionCreate = (create, Approve = 0,history) => {
    setLoader(true);

    console.log(create, "promotionCreate");
    client
      .post("/api/v1/promotion/create", create)
      .then((response) => {
        state.promotionCreate = response.data.data;

        console.log("response--->", state.promotionCreate);
        console.log(response);
        if(response.data.message == "Promotion already exist"||response.data.message == "Separation already exist" || response.data.message == "Disciplinary already exist"){
          toast.error(response.data.message);
          history.push('/promotion-list')
        }else{
          toast.info(response.data.message);
        }
        ViewPromotionById(response.data.data.promotionId);
        if (
          Approve === 1 &&
          response.data !== null &&
          response.data !== undefined &&
          response.data.data !== null &&
          response.data.data !== undefined &&
          response.data.data.promotionId !== null &&
          response.data.data.promotionId !== undefined
        ) {
          approvePromotion(response.data.data.promotionId, Approve);
          approvePromotion(response.data.data.promotionId, 5);
        }
        if (
          Approve === 2 &&
          response.data !== null &&
          response.data !== undefined &&
          response.data.data !== null &&
          response.data.data !== undefined &&
          response.data.data.promotionId !== null &&
          response.data.data.promotionId !== undefined
        ) {
          approvePromotion(response.data.data.promotionId, Approve);
        } else {
          setCreatedPromotion(true);
        }
        setLoader(false);
        return dispatch({
          type: "PROMOTION_CREATE",
          payload: state.promotionCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewPromotionByEmployee = (id) => {
    console.log("id", id);
    return client
      .get("/api/v1/promotion/view/" + id)
      .then((response) => {
        state.promotionByEmployee = response.data.data;
        console.log(response);
        toast.info(response.data.message);
        return dispatch({
          type: "PROMOTION_VIEW_EMPLOYEE",
          payload: state.promotionByEmployee,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approvePromotion = (id, status) => {
    setLoader(true);
    client
      .get("/api/v1/promotion/approve?promotionId=" + id + "&status=" + status)
      .then((response) => {
        state.approvePromotionData = response.data.data;
        if (status !== 5) {
          toast.info(response.data.message);
        }
        ViewPromotionById(id);
        setCreatedPromotion(true);
        setLoader(false);
        return dispatch({
          type: "APPROVE_PROMOTION_DATA",
          payload: state.approvePromotionData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectPromotion = (id, remarks) => {
    client
      .get("/api/v1/promotion/reject?promotionId=" + id + "&remarks=" + remarks)
      .then((response) => {
        state.rejectPromotionData = response.data.data;
        toast.info(response.data.message);
        return dispatch({
          type: "REJECT_PROMOTION_DATA",
          payload: state.rejectPromotionData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEmployeeDetails = (loginType) => {
    client
      .get("/api/v1/employee/search/"+ loginType )
      .then((response) => {
      
        if (
          response.data.data!== null &&
         response.data.data !== undefined &&
        Object.keys( response.data.data).length !== 0
      ) {

        state.employeeDetails=response.data.data;
      }
       
        return dispatch({
           type: "EMPLOYEE_DATA",
          payload: state.employeeDetails,
        });
      })
      .catch((error) => {
        console.log(error  ,"Error in API ./context/PromotionState");
      });
  };

  const getEmployeeList = (loginType) => {
    client
      .get("/api/v1/promotion/search/employees/"+ loginType )
      .then((response) => {
        if (
          response.data.data!== null &&
         response.data.data !== undefined &&
        Object.keys( response.data.data).length !== 0
      ) {

        state.promotionEmployeeDetails=response.data.data;
      }
        return dispatch({
           type: "PROMOTION_EMPLOYEE_DATA",
          payload: state.promotionEmployeeDetails,
        });
      })
      .catch((error) => {
        console.log(error  ,"Error in API ./context/PromotionState");
      });
  };


  return (
    <PromotionContext.Provider
      value={{
        promotionListView,
        ViewPromotionById,
        PromotionCreate,
        PositionNew,
        setLoader,
        generatePromotionLetter,
        ViewPromotionByEmployee,
        approvePromotion,
        rejectPromotion,
        makeViewPromotionById,
        getEmployeeDetails,
        getEmployeeList,
        total: state.total,
        promotionList: state.promotionList,
        positionNew: state.positionNew,
        promotionIdData: state.promotionIdData,
        promotionCreate: state.promotionCreate,
        loader: loader,
        createdPromotion: createdPromotion,
        promotionLetterData: state.promotionLetterData,
        promotionByEmployee: state.promotionByEmployee,
        approvePromotionData: state.approvePromotionData,
        rejectPromotionData: state.rejectPromotionData,
        lettterview: lettterview,
        employeeDetails: state.employeeDetails,
        promotionEmployeeDetails: state.promotionEmployeeDetails,
        setViewLetter,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};
