import { Link } from "react-router-dom";
import React from "react";

function Signup(props) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onSignUp({
            password: passwordRef.current.value,
            email: emailRef.current.value
        });
    }   

    return (
        <form className="sign-form" onSubmit={handleSubmit}>
            <h2 className="sign-form__title">Регистрация</h2>
            <input
                className="sign-form__input"
                placeholder="Email"
                name="input-email"
                ref={emailRef}
                id="input-email"
                type="email"
                required/>
            <input
                className="sign-form__input"
                placeholder="Пароль"
                name="input-password"
                ref={passwordRef}
                id="input-password"
                type="password"
                required/>
            <button
                className="sign-form__button"
                type="submit"
                >Зарегистрироваться
            </button>
            <div className="sign-form__under-button">
                <p className="sign-form__under-button-text">Уже зарегистрированы?</p>
                <Link to="login" className="sign-form__under-button-link">
                    Войти
                </Link>
            </div>
        </form>
    )
}

export default Signup;