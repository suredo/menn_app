const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://192.168.100.93:3000"
  : "https://mern-app-test2.herokuapp.com";
