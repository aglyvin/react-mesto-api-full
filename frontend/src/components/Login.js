import React from "react";

function Login(props) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onSignIn({
            password: passwordRef.current.value,
            email: emailRef.current.value
        });
    } 
    return (
        <form className="sign-form" onSubmit={handleSubmit}>
            <h2 className="sign-form__title">Вход</h2>
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
                    >Войти
                </button>
        </form>
    )
}

export default Login;