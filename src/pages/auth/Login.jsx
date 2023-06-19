import "./Auth.scss";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {LoginSchema} from "../../schemas/Schemas.js";
import LoginImage from "../../assets/login.svg";
import SmallLoader from "../../components/small-loader/SmallLoader.jsx";
import {useContext, useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {loginUser} from "../../services/Api.js";
import userContext from "../../store/UserContext.jsx";
import {ErrorToaster, SuccessToaster} from "../../components/toaster/Toaster.js";

export default function Login() {
    const [showPassword,setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const context = useContext(userContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const {
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        touched,
        errors,
        handleSubmit
    } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit
    });

    async function onSubmit() {
        try {
            SuccessToaster("Login Successfully");
            setIsLoading(true);
            const res = await loginUser(values);
            const token = res?.accessToken;
            const user = res.user;
            if(token){
                context.onUserUpdate({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username
                });
                localStorage.setItem("token",token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            }
        } catch (err) {
            ErrorToaster(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="form-section">
                <div className="container">
                    <div className="form-image">
                        <img src={LoginImage} alt=""/>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete={"off"}>
                        <h1>log in</h1>
                        <div className="form-wrapper">
                            <div className="form-control">
                                <label htmlFor="loginEmail">email</label>
                                <div className="input-control">
                                    <input type="email" name="email" id="loginEmail" placeholder="email"
                                           value={values.email}
                                           onChange={handleChange} onBlur={handleBlur}
                                           className={errors.email && touched.email ? "input-error" : ""}/>
                                </div>
                                {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="loginPassword">password</label>
                                <div className="input-control">
                                    <input type={`${showPassword ? "text" : "password"}`} name="password" id="loginPassword" placeholder="password"
                                           value={values.password} onChange={handleChange} onBlur={handleBlur}
                                           className={errors.password && touched.password ? "input-error" : ""}/>
                                    <span className="show_hide_password" onClick={handleShowPassword}>
                                        {showPassword ? <BsEyeSlash size={23}/> : <BsEye size={23}/>}
                                    </span>
                                </div>
                                {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
                            </div>
                            <div className="form-control">
                                <button type="submit">{isSubmitting && isLoading ? <>
                                    <SmallLoader/> loading...</> : "log in"}
                                </button>
                            </div>
                            <div className="form-control">
                                <p>do not have an account? <Link to={"/auth/register"}>register</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
