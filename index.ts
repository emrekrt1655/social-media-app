import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes/index";
import bodyParser from "body-parser";
import {createServer} from "http";
import {Server, Socket} from "socket.io";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", routes.authRoutes);
app.use("/api", routes.topicRoutes);
app.use("/api", routes.postRoutes);
app.use("/api", routes.commentRoutes);
app.use('/api', routes.likeRoutes);
app.use('/api', routes.followerRoutes);

// Socket.io
const http = createServer(app)
export const io = new Server(http)
import { SocketServer } from './config/socket'

io.on("connection", (socket: Socket) => {
  SocketServer(socket)
})


http.listen(PORT, () => {
  console.log(`Server at listening on port ${PORT}`);
});
