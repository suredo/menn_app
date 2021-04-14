import { Server } from "./server";

const port = process.env.PORT || 3000;

const App = async () => {
  try {
    const server = new Server(port);
    await server.init();
    server.listen();
  } catch (error) {
    console.log(error);
  }
};

App();
