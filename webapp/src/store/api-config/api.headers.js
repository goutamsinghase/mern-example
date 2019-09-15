import {DEVICE_ID} from '../../config/local-storage-keys';
// UUID
import uuidv4 from 'uuid/v4';
const deviceId = () => {
    if (localStorage.getItem(DEVICE_ID)) {
        return localStorage.getItem(DEVICE_ID);
    } else {
        // Set Device ID
        localStorage.setItem(DEVICE_ID, uuidv4());
        return localStorage.getItem(DEVICE_ID)
    }
};

export const defaultAPIHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-auth-deviceid': deviceId(),
    'x-auth-devicetype': '3'
};
