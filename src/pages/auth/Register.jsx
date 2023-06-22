import "./Auth.scss";
import {useFormik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {RegisterSchema} from "../../schemas/Schemas.js";
import RegisterImage from "../../assets/register.svg";
import {useContext, useState} from "react";
import {registerUser} from "../../services/Api.js";
import SmallLoader from "../../components/small-loader/SmallLoader.jsx";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import userContext from "../../store/UserContext.jsx";
import {SuccessToaster} from "../../components/toaster/Toaster.js";
import {ErrorToaster} from "../../components/toaster/Toaster.js";
import {motion} from "framer-motion";


export default function Register() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const context = useContext(userContext);

   const handleShowPassword = () => {
      setShowPassword(!showPassword);
   }
   const handleShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
   }

   const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      touched,
      errors,
   } = useFormik({
      initialValues: {
         username: "",
         email: "",
         firstname: "",
         lastname: "",
         phoneNumber: "",
         password: "",
         confirm: ""
      },
      validationSchema: RegisterSchema,
      onSubmit
   });

   async function onSubmit() {
      try {
         setIsLoading(true);
         const res = await registerUser(values);
         const token = res?.accessToken;
         const user = res?.user;
         if (token) {
            context.onUserUpdate({
               firstname: user.firstname,
               lastname: user.lastname,
               username: user.username
            });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
         }
         if (res) {
            SuccessToaster("Register Successfully");
         }
      } catch (err) {
         ErrorToaster(err.message);
      } finally {
         setIsLoading(false);
      }
   }

   /// ასე ამუშავდა ///
   // if (error) {
   //     ///როგორც მივხვდი return(არ მოსწონდა)///
   //     toast.error(error, {
   //         position: "bottom-left",
   //         style: {backgroundColor: "#cecee6"}
   //     })
   //     setError("")
   // }
   return (
      <>
         <section className="form-section" style={{overflow: "hidden"}}>
            <motion.div
               className="container"
               initial={{scale: 0.5}}
               animate={{scale: 1}}
               transition={{type: "spring", stiffness: 100}}
            >
               <div className="form-image">
                  <img src={RegisterImage} alt=""/>
               </div>
               <form
                  onSubmit={handleSubmit}
                  autoComplete={"off"}>
                  <h1>register</h1>
                  <div className="form-wrapper">
                     <div className="form-control">
                        <label htmlFor="username">username</label>
                        <div className="input-control">
                           <input
                              type="text" id="username" placeholder="username" name="username"
                              value={values.username} onChange={handleChange} onBlur={handleBlur}
                              className={errors.username && touched.username ? "input-error" : ""}
                           />
                        </div>
                        {errors.username && touched.username && <p className="error-text">{errors.username}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="email">email</label>
                        <div className="input-control">
                           <input
                              type="email" id="email" placeholder="email" name="email" value={values.email}
                              onChange={handleChange} onBlur={handleBlur}
                              className={errors.email && touched.email ? "input-error" : ""}
                           />
                        </div>
                        {errors.email && touched.email && <p className="error-text">{errors.email}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="firstname">first name</label>
                        <div className="input-control">
                           <input
                              type="text" id="firstname" placeholder="first name" name="firstname"
                              value={values.firstname} onChange={handleChange} onBlur={handleBlur}
                              className={errors.firstname && touched.firstname ? "input-error" : ""}
                           />
                        </div>
                        {errors.firstname && touched.firstname &&
                           <p className="error-text">{errors.firstname}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="lastname">last name</label>
                        <div className="input-control">
                           <input
                              type="text" id="lastname" placeholder="last name" name="lastname"
                              value={values.lastname} onChange={handleChange} onBlur={handleBlur}
                              className={errors.lastname && touched.lastname ? "input-error" : ""}
                           />
                        </div>
                        {errors.lastname && touched.lastname && <p className="error-text">{errors.lastname}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="phonenumber">phone number</label>
                        <div className="input-control">
                           <input
                              type="number" id="phonenumber" placeholder="phone number" name="phoneNumber"
                              value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur}
                              className={errors.phoneNumber && touched.phoneNumber ? "input-error" : ""}
                           />
                        </div>
                        {errors.phoneNumber && touched.phoneNumber &&
                           <p className="error-text">{errors.phoneNumber}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="password">password</label>
                        <div className="input-control">
                           <input
                              type={`${showPassword ? "text" : "password"}`} id="password"
                              placeholder="password" name="password"
                              value={values.password} onChange={handleChange} onBlur={handleBlur}
                              className={errors.password && touched.password ? "input-error" : ""}
                           />
                           <span
                              className="show_hide_password" onClick={handleShowPassword}>
                              {showPassword ? <BsEyeSlash size={23}/> : <BsEye size={23}/>}
                           </span>
                        </div>
                        {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
                     </div>
                     <div className="form-control">
                        <label htmlFor="confirm">confirm password</label>
                        <div className="input-control">
                           <input
                              type={`${showConfirmPassword ? "text" : "password"}`} id="confirm"
                              placeholder="confirm password" name="confirm"
                              value={values.confirm} onChange={handleChange} onBlur={handleBlur}
                              className={errors.confirm && touched.confirm ? "input-error" : ""}
                              onPaste={e => e.preventDefault()}
                           />
                           <span
                              className="show_hide_password" onClick={handleShowConfirmPassword}>
                              {showConfirmPassword ? <BsEyeSlash size={23}/> : <BsEye size={23}/>}
                           </span>
                        </div>
                        {errors.confirm && touched.confirm && <p className="error-text">{errors.confirm}</p>}
                     </div>
                     <div className="form-control">
                        <button type="submit">{isSubmitting && isLoading ? <>
                           <SmallLoader/> loading...</> : "Register"}
                        </button>
                     </div>
                     <div className="form-control">
                        <p>do you have an account? <Link to={"/auth/login"}>login</Link></p>
                     </div>
                  </div>
               </form>
            </motion.div>
         </section>
      </>
   );
}
