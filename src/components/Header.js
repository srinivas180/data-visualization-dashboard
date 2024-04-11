import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useFilterParams } from "../contexts/FilterParamsContext";
import { logout } from "../slices/authSlice";

function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { setAge, setGender, setFromDate, setToDate, removeCookie } =
        useFilterParams();
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logout());

        // reset filters
        setAge(undefined);
        setGender(undefined);
        setFromDate(undefined);
        setToDate(undefined);

        // remove cookies
        removeCookie("age");
        removeCookie("gender");
        removeCookie("fromDate");
        removeCookie("toDate");
    }

    return (
        <div className="flex justify-end gap-4 my-4 mr-4">
            {isLoggedIn ? (
                <button
                    className="border-4 border-solid border-red-500 rounded-md p-1"
                    onClick={() => onLogout()}
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        className="border-4 border-solid border-[#81cdb4] rounded-md p-1"
                        to="/signup"
                    >
                        Sign up
                    </Link>
                    <Link
                        className="border-4 border-solid border-[#81cdb4] rounded-md p-1"
                        to="/login"
                    >
                        Login
                    </Link>
                </>
            )}
        </div>
    );
}

export default Header;
