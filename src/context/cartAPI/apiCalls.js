import axios from "axios";
import { logout } from "../authAPI/AuthAction"
const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getUserCart = async (dispatch, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getBookInCart", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
        });
        return res;
    } catch (err) {
        if (err?.response?.status === 401) {
            localStorage.removeItem("user");
            dispatch(logout());
        }
    }
}

export const getWaitotConfirmUser = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getWaitotConfirmUser", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getWaitoBorrowUser = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getWaitoBorrowUser", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}


export const getBorrowingUser = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getBorrowingUser", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getReturnedUser = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getReturnedUser", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const addToCart = async (data, amount, setNotify) => {
    try {
        const res = await axios.post(BACK_END_URL + "/carts/createCart", { cartItems: [{ bookId: data, amount: amount }] }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        console.log(res)
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const removeFromCart = async (data, setNotify) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/removeBook", { cartItems: [{ bookId: data }] }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const CancelOrder = async (id, user, data, amount, setNotify) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/cancelBook/" + id, { userBorrowInfo: user, cartItems: [{ bookId: data, amount: amount }] }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const orderBook = async (data, setNotify) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/orderBook", data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}