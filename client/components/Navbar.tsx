import React from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { baseURL } from "../types/urls";

interface NavbarPorps {
  user: { id: string; username: string; iat: number };
}
function Navbar({ user }: NavbarPorps) {
  const signOut = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/auth/signout`, {
        withCredentials: true,
      });
      Router.push("/auth/signin");
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            {user ? (
              <React.Fragment>
                <li className="nav-item">{user.username}</li>
                <li className="nav-item">
                  <button className="btn btn-warning" onClick={signOut}>
                    Sign Out
                  </button>
                </li>
                <li className="nav-item">
                  <Link href="/posts/create">
                    <a className="btn btn-primary">Create Post</a>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link href="/auth/signup">
                    <a className="nav-link active" aria-current="page">
                      Sign Up
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/auth/signin">
                    <a className="nav-link active" aria-current="page">
                      Sign In
                    </a>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
