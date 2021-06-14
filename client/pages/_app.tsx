import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext, AppProps } from "next/app";
import Layout from "../components/Layout";
import axios from "axios";
interface MyCustomAppProps extends AppProps {
  currentUser: { id: string; username: string; iat: number };
}
function MyApp({ Component, pageProps, currentUser }: MyCustomAppProps) {
  return (
    <Layout user={currentUser}>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
MyApp.getInitialProps = async (context: AppContext) => {
  let user = null;
  try {
    if (window === "undefined") {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current",
        {
          headers: context.ctx,
        }
      );
      user = data;
    } else {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current",
        {
          withCredentials: true,
        }
      );
      user = data;
    }
  } catch (error) {
    console.error(error?.response?.data);
  }

  return {
    currentUser: user,
  };
};
