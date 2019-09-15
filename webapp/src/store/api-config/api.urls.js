import {baseUrl} from "./api.util";
export const apiURLs = {
    //*****************Auth ************************* *//
    login: baseUrl + "user/auth/login",
    //******************Profile************************//
    logout: baseUrl + "account/user/profile/logout",
    //******************Item************************//
    item: baseUrl + "account/user/item"
   
};
