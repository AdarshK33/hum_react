import { app } from "firebase";
import {
  ADD_COSTOMIZER,
  ADD_LAYOUT,
  ADD_SIDEBAR_TYPES,
  ADD_SIDEBAR_SETTINGS,
  ADD_COLOR,
  ADD_MIXlAYOUT,
  SET_ACCESS_TOKEN_SUCCESS,
  SET_ACCESS_TOKEN_FAIL,
  AUTHENTICATE_USER,
  FETCH_USER_INFO
} from "../constant/actionTypes";
import ConfigDB from "../data/customizer/config";

const initial_state = {
  customizer: ConfigDB.data,
  configData: {},
  layout: "ltr",
  sidebar_types: {},
  settings: "",
  color: {},
  mix_layout: "",
  app: {
    loaded: false,
    isLoggedin: false
  },
};

export default (state = initial_state, action) => {
  console.log("IN REDUCER " + JSON.stringify(state.user));
  const data = action.payload;

  switch (action.type) {
    case ADD_COSTOMIZER:
      return { ...state, loading: false, customizer: ConfigDB.data };

    case ADD_LAYOUT:
      state.customizer.settings.layout_type = action.payload;
      const layoutUpdate = state.customizer.settings.layout_type;
      return { ...state, loading: true, layout: layoutUpdate };

    case ADD_SIDEBAR_TYPES:
      state.customizer.settings.sidebar = action.payload;
      const sidebarTypeUpdate = state.customizer.settings.sidebar;

      return { ...state, loading: true, sidebar_types: sidebarTypeUpdate };

    case ADD_SIDEBAR_SETTINGS:
      state.customizer.settings.sidebar_setting = action.payload;
      const settingsUpdate = state.customizer.settings.sidebar_setting;
      return { ...state, loading: true, settings: settingsUpdate };

    case ADD_COLOR:
      const colors = action.payload;
      state.customizer.color.primary_color = colors.primary_color;
      state.customizer.color.secondary_color = colors.secondary_color;
      state.customizer.color.color = colors.color;
      state.customizer.color.layout_version = colors.layout_version;

      return { ...state, color: colors, loading: true };

    case ADD_MIXlAYOUT:
      const mix_layout = action.payload;
      state.customizer.color.mix_layout = mix_layout;

      return { ...state, mix_layout: mix_layout, loading: true };

    //   LOGIN FOR APP
    case SET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        app: {
          ...state.app,
          loaded: true,
          isLoggedin: true,
          data,
        },
      };

    case SET_ACCESS_TOKEN_FAIL:
      return {
        ...state,
        app: {
          ...state.app,
          loaded: true,
          data,
        },
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        app: {
          ...state.app,
          isLoggedin: action.payload
        },
      };

    case FETCH_USER_INFO:
      return {
        ...state,
        user: action.payload
      };

    default:
      return { ...state };
  }
};
