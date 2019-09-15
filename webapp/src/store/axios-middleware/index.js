import axios from "axios";
import uuidv4 from "uuid/v4";
import axiosMiddleware from "redux-axios-middleware";
import { ToastStore } from "react-toasts";
import Progress from "react-progress-2";
import { DEVICE_ID, AUTH_DATA } from "../../config/local-storage-keys";
import { baseUrl } from "../api-config/api.util";

import { session_logout } from '../actions/auth';

const deviceId = () => {
  if (localStorage.getItem(DEVICE_ID)) {
    return localStorage.getItem(DEVICE_ID);
  } else {
    localStorage.setItem(DEVICE_ID, uuidv4());
    return localStorage.getItem(DEVICE_ID);
  }
};

const getToken = () => {
  let userJsonString = localStorage.getItem(AUTH_DATA);
  let data = userJsonString ? JSON.parse(userJsonString) : {};
  const token = data.token ? data.token : "";
  return token;
};

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["x-auth-deviceid"] = deviceId();
axios.defaults.headers.common["x-auth-devicetype"] = 3;

const options = {
  // not required, but use-full configuration option
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      {
        success: function(_, req) {
          Progress.show();
          let token = getToken();
          let authorizedUrl = new RegExp(/\/account\//);
          if (token && authorizedUrl.test(req.url)) {
            req.headers["x-auth-token"] = token;
          }
          return req;
        }
      }
    ],
    response: [
      {
        success: ({ getState, dispatch }, response) => {
          if (response && response.data && !response.data.success) {
            if (response.data.errorCode) {
              if(Number(response.data.errorCode)===403 && response.data.error_code && response.data.error_code.length){
                let errTexts = '';
                errTexts = errTexts + response.data.error_code[0].replace(/_/g, ' ');
                for(let i=1; i<response.data.error_code.length; i++){
                  errTexts = errTexts +', '+response.data.error_code[i];
                }
                ToastStore.error(errTexts);
              }else{
                let errCodeText = getState().literalsReducer.errCodes[
                  Number(response.data.errorCode)
                ]; 
                ToastStore.error(errCodeText);
              }
            }
            
            if (response.data.errorCode===1000) {
              dispatch(session_logout());
            }

            return Promise.reject(new Error("API Validation Error"));
          }

          // if (!response.config.reduxSourceAction.hideToast) {
          //   ToastStore.success(
          //     getState().literalsReducer.successCodes[
          //       response.config.reduxSourceAction.type
          //     ]
          //   );
          // }
          return Promise.resolve(response.data);
        },
        error: (_, error) => {
          console.log("error", error);
          if (!error.response) {
            ToastStore.error("Network Error");
          } else {
            ToastStore.error(error.response.status);
          }

          return Promise.reject(error);
        }
      }
    ]
  },
  onComplete: data => {
    Progress.hide();
  }
};
export default axiosMiddleware(axios, options);
