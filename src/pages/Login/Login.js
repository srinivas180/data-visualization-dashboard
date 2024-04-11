import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";

import { EyeIcon } from "../../assets/icons/EyeIcon/EyeIcon";
import { ClosedEyeIcon } from "../../assets/icons/ClosedEyeIcon/ClosedEyeIcon";

import { login } from "../../slices/authSlice.js";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [showPassword, setShowPassword] = useState();
    const [userCreds, setUserCreds] = useState({ email: "", password: "" });
    const [searchParams, setSearchParams] = useSearchParams();

    function handleInputChange(e) {
        setUserCreds((userCreds) => ({
            ...userCreds,
            [e.target.name]: e.target.value,
        }));
    }

    function handleLogin(e, userCreds) {
        e.preventDefault();
        dispatch(login(userCreds));
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/?${searchParams.toString()}`);
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container container--center column column--center">
            <form
                className="form column"
                onSubmit={(e) => handleLogin(e, userCreds)}
            >
                <h2 className="form__heading">Login</h2>

                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={userCreds.email}
                    onChange={handleInputChange}
                />

                <div className="password-container">
                    <input
                        className="form__input"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={userCreds.password}
                        onChange={handleInputChange}
                    />
                    {showPassword ? (
                        <ClosedEyeIcon
                            toggleShowPassword={toggleShowPassword}
                        />
                    ) : (
                        <EyeIcon toggleShowPassword={toggleShowPassword} />
                    )}
                </div>

                <div className="row row--space-between">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <NavLink className="form__navlink navlink--no-underline">
                        Forgot password
                    </NavLink>
                </div>
                <button
                    className="button button--primary form__submit"
                    type="submit"
                >
                    Login
                </button>
                <button
                    onClick={(e) =>
                        handleLogin(e, {
                            email: "jack@gmail.com",
                            password: "jack",
                        })
                    }
                    className="button button--text form__guest-login-button"
                >
                    Login as Guest
                </button>
            </form>
            <div className="row row--gap-8">
                Don't have account?
                <NavLink className="form__navlink" to="/signup">
                    Signup
                </NavLink>
            </div>
        </div>
    );
}
