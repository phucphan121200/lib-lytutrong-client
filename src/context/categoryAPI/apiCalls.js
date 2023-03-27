import axios from "axios";
const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListCategory = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/categories/getallCategory");
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}