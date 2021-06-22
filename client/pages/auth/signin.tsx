import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Router from "next/router";
import { baseURL } from "../../types/urls";
interface SignInFormInputs {
  email: string;
  password: string;
}
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<SignInFormInputs> = async (formData) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/auth/signin`,
        formData,
        { withCredentials: true }
      );
      Router.push("/");
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          {...register("email", { required: true })}
        />
        <div>{errors.email && "Email is required"}</div>
      </div>
      {/* password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        <div>{errors.password && "Password is required"}</div>
      </div>
      {/* submit button */}
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
}

export default SignIn;
