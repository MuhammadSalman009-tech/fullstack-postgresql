import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { AppContext, AppProps } from "next/app";
import Layout from "../components/Layout";
import axios from "axios";
import { baseURL } from "../types/urls";
interface MyCustomAppProps extends AppProps {
  currentUser: { id: string; username: string; iat: number };
}
function MyApp({ Component, pageProps, currentUser }: MyCustomAppProps) {
  return (
    <Layout user={currentUser}>
      <div className="container">
        <Component {...pageProps} user={currentUser} />
      </div>
    </Layout>
  );
}

export default MyApp;
MyApp.getInitialProps = async (context: AppContext) => {
  let user = null;
  try {
    if (typeof window === "undefined") {
      const { data } = await axios.get(`${baseURL}/api/auth/current`, {
        headers: context.ctx.req.headers,
      });
      user = data;
    } else {
      const { data } = await axios.get(`${baseURL}/api/auth/current`, {
        withCredentials: true,
      });
      user = data;
    }
  } catch (error) {
    console.error("error: " + error.response);
  }

  return {
    currentUser: user,
  };
};
