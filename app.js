require("dotenv").config();
require("./CoachModule/nodescheduler");
require("./chat/socket");
var http = require("http");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var conversation = require("./chat/conversations");
var message = require("./chat/messages");
var indexRouter = require("./routes/index");
var usersRouter = require("./userModule/userController");
var libraryRouter = require("./LibraryModule/LibraryController");
var commentaireRouter = require("./LibraryModule/CommentaireController");
var EventRouter = require("./EventsModule/EventController");
var ReviewRouter = require("./EventsModule/ReviewController");
var ParticipateRouter = require("./EventsModule/ParticipateController");
var likeEventRouter = require("./EventsModule/likeEventController");

var coachrouter = require("./CoachModule/coachcontroller");
const cors = require("cors");
const sessions = require("express-session");
var abonnementRouter = require("./LibraryModule/AbbController");
var courseRouter = require("./CourseModule/CourseController");
var lessonRouter = require("./CourseModule/LessonController");
var fileUploadRouter = require("./routes/fileUploadRoute");
const uri = process.env.URI;
var app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(cors({ credentials: true, origin: "https://youthcc.onrender.com" }));

app.use(cookieParser());
app.use(express.json());
var mongoose = require("mongoose");
var mongoconfig = require("./config/mongoConfig.json");
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

/*
var mongoose = require("mongoose");
var mongoconfig = require("./config/mongoConfig.json");
mongoose
  .connect(mongoconfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });*/
var server = http.createServer(app);
server.listen(3000, () => {
  console.log("server strated");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/library", libraryRouter);
app.use("/commentaire", commentaireRouter);
app.use("/events", EventRouter);
app.use("/review", ReviewRouter);
app.use("/participate", ParticipateRouter);
app.use("/likeEvent", likeEventRouter);

app.use("/abonnement", abonnementRouter);

app.use("/message", message);
app.use("/conversation", conversation);
app.use("/upload", fileUploadRouter);
app.use("/coach", coachrouter);
app.use("/course", courseRouter);
app.use("/lesson", lessonRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
