import { useState } from "react";
import { config } from "../config";

const getItem = key =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
        const item = currentCookie.split("=");
        const storedKey = item[0];
        const storedValue = item[1];

        return key === storedKey ? decodeURIComponent(storedValue) : total;
    }, "");

const setItem = (key, value, numberOfDays) => {
    const now = new Date();

    // set the time to be now + numberOfDays
    now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);

    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

const resetItem = () => {
    document.cookie = `${config.token}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

/**
 *
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */
const useCookie = (key, defaultValue) => {
    const getCookie = () => getItem(key) || defaultValue;
    const [cookie, setCookie] = useState(getCookie());

    const updateCookie = (value, numberOfDays) => {
        setCookie(value);
        setItem(key, value, numberOfDays);
    };

    const removeCookie = () => {
        resetItem(); 
        window.location.reload(true);
    };

    return [cookie, updateCookie, removeCookie];
};

export default useCookie;
