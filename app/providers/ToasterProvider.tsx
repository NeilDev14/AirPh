"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      // toastOptions={{
      //   // // Define default options
      //   // className: "",
      //   // duration: 5000,
      //   // style: {
      //   //   background: "#737373",
      //   //   color: "#fff",
      //   // },

      //   // Default options for specific types
      //   success: {
      //     duration: 5000,
      //     theme: {
      //       primary: "green",
      //       secondary: "black",
      //     },
      //   },
      // }}
      //   gutter={8}
      //   containerClassName=""
      //   containerStyle={{}}
      //   toastOptions={{
      //     // Define default options
      //     className: "",
      //     duration: 5000,
      //     style: {
      //       background: "#363636",
      //       color: "#fff",
      //     },

      //     // Default options for specific types
      //     success: {
      //       duration: 3000,
      //       theme: {
      //         primary: "green",
      //         secondary: "black",
      //       },
      //     },
      //   }}
    />
  );
};

export default ToasterProvider;
