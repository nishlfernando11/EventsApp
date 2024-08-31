const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/userDashboardRoutes");
const paymentRouter = require("./routes/paymentRoute");
const adminRouter = require("./routes/adminRoutes");
const eventRouter = require("./routes/eventRoutes");
// const checkInRouter = require("./routes/checkInRoutes")

dotenv.config();
console.log("in index - ", process.env.MONGO_ATLAS_URI);
//database url
dbUrl = process.env.MONGO_ATLAS_URI.replace('${DB_USERNAME}',process.env.DB_USERNAME).replace('${DB_PASSWORD}', process.env.DB_PASSWORD)
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connected to the database.')
    })
    .catch((err) => {
        console.log(err);
    });

require("./models/otpAuth");
require("./models/user");
require("./models/admin");
require("./models/event");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: [process.env.FRONT_END_URL, process.env.DEV_END_URL],
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/", paymentRouter);
app.use("/api/user", userRouter);
app.use("/api/user", dashboardRouter);

app.use("/api/", adminRouter);
app.use("/api/", eventRouter);

app.get("/api/", (req, res) => {
    res.send("Event Management micro services API.");
});

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server Running on: ${process.env.PORT}`);
});
