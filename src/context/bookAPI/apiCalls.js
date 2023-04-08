import axios from "axios";
const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/getallRandomBook");
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}
export const getallBookClient = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/getallBookClient");
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const filterBookClient = async (data, setNotify) => {
    console.log(data)
    try {
        const res = await axios.post(BACK_END_URL + "/books/filterBookClient", data);
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/getBook/" + id);
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}