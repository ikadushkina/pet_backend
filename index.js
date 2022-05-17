require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routers");
const errorMiddleware = require("./middleware/error.middleware");
const { PORT } = require("./helper/config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
app.use(errorMiddleware);


const runServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server run. Port = ${PORT}`));
    } catch (e) {
        console.log(e);
        // process.exit(1);
    }
};

runServer();
