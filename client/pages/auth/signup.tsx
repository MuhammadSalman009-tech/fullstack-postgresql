import React from "react";

function SignUp() {
  return (
    <form>
      {/* name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      {/* email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input type="email" className="form-control" id="email" />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      {/* password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" />
      </div>
      {/* gender */}
      <div>
        <label htmlFor="gender">Geder</label>
        <br />
        <span>
          <input type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label htmlFor="flexRadioDefault1">Default radio</label>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <input type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
          </label>
        </span>
      </div>
      <br />

      {/* submit button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SignUp;
