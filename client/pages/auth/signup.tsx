import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Router from "next/router";
import { baseURL } from "../../types/urls";
interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  gender: string;
}
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (formData) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );
      Router.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
        />
        <div>{errors.name && "Name is required"}</div>
      </div>
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
      {/* gender */}
      <div>
        <label htmlFor="gender">Gender</label>
        <br />
        <select
          className="form-control mt-2"
          {...register("gender", { required: true })}
        >
          <option value={1}>Male</option>
          <option value={0}>Female</option>
        </select>
        <div>{errors.gender && "Gender is required"}</div>
      </div>
      <br />

      {/* submit button */}
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
