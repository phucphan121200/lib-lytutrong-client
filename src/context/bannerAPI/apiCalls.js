import axios from "axios";
const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListBanner = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/banners/getallBanner");
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}