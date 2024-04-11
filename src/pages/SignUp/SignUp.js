import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";

import { EyeIcon } from "../../assets/icons/EyeIcon/EyeIcon";
import { ClosedEyeIcon } from "../../assets/icons/ClosedEyeIcon/ClosedEyeIcon";

import { signup } from "../../slices/authSlice";

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [showPassword, setShowPassword] = useState();
    const [showConfirmPassword, setShowConfirmPassword] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleInputChange(e) {
        setUserDetails((userDetails) => ({
            ...userDetails,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSignUp(e) {
        e.preventDefault();
        dispatch(signup(userDetails));
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    function toggleShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/?${searchParams.toString()}`);
        }
    }, [isLoggedIn]);

    return (
        <div className="container container--center column column--center">
            <form className="form column" onSubmit={handleSignUp}>
                <h2 className="form__heading">Sign Up</h2>
                <input
                    className="form__input"
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                />
                <input
                    className="form__input"
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                />
                <div className="password-container">
                    <input
                        className="form__input"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={userDetails.password}
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
                <div className="password-container">
                    <input
                        name="confirm-password"
                        className="form__input"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                    />

                    {showConfirmPassword ? (
                        <ClosedEyeIcon
                            toggleShowPassword={toggleShowConfirmPassword}
                        />
                    ) : (
                        <EyeIcon
                            toggleShowPassword={toggleShowConfirmPassword}
                        />
                    )}
                </div>
                <button
                    className="button button--primary form__submit"
                    type="submit"
                >
                    Create New Account
                </button>
            </form>
            <div className="row row--gap-8">
                Already have account?
                <NavLink className="form__navlink" to="/login">
                    Login
                </NavLink>
            </div>
        </div>
    );
}
