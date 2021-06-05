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
};

export const PromotionContext = createContext();

export const PromotionProvider = (props) => {
  const [state, dispatch] = useReducer(PromotionReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const promotionListView = (key, page) => {
    console.log(key, page, client.defaults.headers, "promotion ");
    console.log(key, page, "promotion ");
    setLoader(true);
    client
      .get(
        "/api/v1/promotion/view?key=" + key + "&page=" + page + "&size=" + 10
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.promotionList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
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

  const ViewPromotionById = (promotionId) => {
    setLoader(true);
    client
      .get("/api/v1/promotion/search/" + promotionId)
      .then((response) => {
        state.promotionIdData = response.data.data;

        setLoader(false);
        console.log("--->", state.promotionIdData);
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
  const PositionNew = () => {
    setLoader(true);
    client
      .get("/api/v1/position/view/")
      .then((response) => {
        state.positionNew = response.data.data;

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
    return client
      .get("/api/v1/promotion/letter/" + id)
      .then((response) => {
        state.promotionLetterData = response.data.data;
        console.log("offer.message", state.promotionLetterData);
        return dispatch({
          type: "PROMOTION_LETTER_DATA",
          payload: state.promotionLetterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PromotionCreate = (create) => {
    setLoader(true);

    console.log(create, "promotionCreate");
    client
      .post("/api/v1/promotion/create", create)
      .then((response) => {
        state.promotionCreate = response.data.data;

        setLoader(false);
        console.log("--->", state.promotionCreate);
        console.log(response);
        toast.info(response.data.message);
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

  const approvePromotion = () => {
    client
      .get("/api/v1/position/view/")
      .then((response) => {
        state.approvePromotionData = response.data.data;
        return dispatch({
          type: "APPROVE_PROMOTION_DATA",
          payload: state.approvePromotionData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectPromotion = () => {
    client
      .get("/api/v1/position/view/")
      .then((response) => {
        state.rejectPromotionData = response.data.data;
        return dispatch({
          type: "REJECT_PROMOTION_DATA",
          payload: state.rejectPromotionData,
        });
      })
      .catch((error) => {
        console.log(error);
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
        total: state.total,
        promotionList: state.promotionList,
        positionNew: state.positionNew,
        promotionIdData: state.promotionIdData,
        promotionCreate: state.promotionCreate,
        loader: state.loader,
        promotionLetterData: state.promotionLetterData,
        promotionByEmployee: state.promotionByEmployee,
        approvePromotionData: state.approvePromotionData,
        rejectPromotionData: state.rejectPromotionData,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};
