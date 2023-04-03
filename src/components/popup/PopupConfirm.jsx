import React, { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./popupConfirm.scss"
import { getUserCart, removeFromCart, CancelOrder, getWaitotConfirmUser } from "../../context/cartAPI/apiCalls"


const PopupConfirm = ({ setOpenModal, title, id, user, data, amount, isPopup, setNoti, setDataUser }) => {
    console.log(data)
    return (
        <div className="modalBackgroundConfirmPopup">
            <div className="modalContainerr">
                <ExclamationCircleOutlined style={{ color: "rgba(220, 20, 60, 0.9)", fontSize: "30px" }} />
                <div className="titlee">
                    {title}
                </div>
                {/* <div className="body">
          <p>Nếu </p>
        </div> */}
                <div className="footerr">
                    <button
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        id="cancellBtn"
                    >
                        Đóng
                    </button>
                    {
                        isPopup == 1 ?
                            <button onClick={async () => {
                                await removeFromCart(data, setNoti)
                                const bookList = await getUserCart(setNoti)
                                setDataUser(bookList?.data?.data?.cartItems)
                                setOpenModal(false)
                            }
                            }>
                                Xóa
                            </button> :
                            <></>
                    }
                    {
                        isPopup == 2 ?
                            <button onClick={async () => {
                                await CancelOrder(id, user, data, amount, setNoti)
                                const bookList = await getWaitotConfirmUser(setNoti)
                                setDataUser(bookList?.data?.data?.cartItems)
                                setOpenModal(false)
                            }
                            }>
                                Hủy
                            </button> :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default PopupConfirm