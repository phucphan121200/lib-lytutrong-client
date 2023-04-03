import axios from "axios";
import { logout } from "../authAPI/AuthAction"
const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const handleUpdate = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/update/" + id, data, {
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
            // dispatch(loginSuccess(res.data.data))
            setOpenModal(false)
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
};

export const handleUpdatePassword = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/updatePassword", data, {
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
            setOpenModal(false)
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
};

export const getUser = async (dispatch, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/users/getuser", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
        });
        return res
    } catch (err) {
        if (err?.response?.status === 401) {
            localStorage.removeItem("user");
            dispatch(logout());
        }
    }
};