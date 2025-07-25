import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

connectDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

// routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// middlwares
import { errorMiddleware } from "./middlewares/error.middlware.js";
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname,"/client/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
})

server.listen(PORT, () => {
  console.log(`your server listening at port ${PORT}`);
});
