import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Router from "next/router";
import { baseURL } from "../../types/urls";
interface PostFormInputs {
  title: string;
  description: string;
  image: string;
}
function create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<PostFormInputs> = async (formData) => {
    // const postData = { ...formData, image: formData.image[0] };
    // console.log(postData);
    // console.log(postData.image);
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("description", formData.description);
    postData.append("image", formData.image[0]);
    try {
      const { data } = await axios.post(`${baseURL}/api/posts`, postData, {
        withCredentials: true,
      });
      Router.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/*post title */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          {...register("title", { required: true })}
        />
        <div>{errors.title && "Title is required"}</div>
      </div>
      {/* post description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id=""
          cols={30}
          rows={10}
          className="form-control"
          {...register("description", { required: true })}
        ></textarea>
        <div>{errors.description && "Description is required"}</div>
      </div>
      {/* post image */}
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Post Image
        </label>
        <input
          type="file"
          className="form-control"
          {...register("image", { required: true })}
        />
        <div>{errors.image && "Image is required"}</div>
      </div>

      {/* submit button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default create;
