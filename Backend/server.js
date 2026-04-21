import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

const PORT = 3000;

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });

  } catch (error) {
    console.error("Server start error ❌", error.message);
  }
};

startServer();