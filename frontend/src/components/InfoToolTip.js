import React from "react";
import Success from "../images/Success.svg";
import Fail from "../images/Fail.svg";

function InfoToolTip(props) {
    return (
        <div className={`popup popup-tooltip ${props.isOpen && " popup_opened"}`}>
            <div className="popup-tooltip__container">
                <img
                    src={props.success ? Success : Fail}
                    alt={props.success ? "Успешно" : "Ошибка"}
                    className="popup-tooltip__image"
                    />
                <p className="popup-tooltip__text">
                {props.success
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз. "}
                </p>
                {/* {props.success ? (
                    <>
                        <img
                            src={`${Success}`}
                            alt="Успешно"
                            className="popup-tooltip__image"
                            />
                        <p className="popup-tooltip__text">
                            Вы успешно зарегистрировались!
                        </p>
                    </>) : 
                    (
                        <>
                            <img
                                src={`${Fail}`}
                                alt="Ошибка"
                                className="popup-tooltip__image"
                                />
                            <p className="popup-tooltip__text">
                                Что-то пошло не так! Попробуйте ещё раз.
                            </p>
                        </>
                    )} */}
                    <button
                        className="popup__close-button"
                        type="button"
                        onClick={props.onClose}
                    ></button>
            </div>
        </div>)
}

export default InfoToolTip;