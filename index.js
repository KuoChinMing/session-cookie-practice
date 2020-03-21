const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoDB = require("./mongoDB");
//router
const post = require("./router/post");
const index = require("./router/index");
const login = require("./router/login");
const logout = require("./router/logout");
const home = require("./router/home");
const sessionLogin = require("./router/sessionLogin");
const sessionLogout = require("./router/sessionLogout");
const sessionHome = require("./router/sessionHome");

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.static(__dirname + "/public"));
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", "views");
app.use(cookieParser("cookiecookie"));
app.use(
  session({
    secret: "werwer",
    store: new MongoStore({ url: "mongodb://127.0.0.1:27017/sessionDB" }),
    cookie: { maxAge: 600 * 1000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", index);
app.use("/posts", post);
app.use("/login", login);
app.use("/logout", logout);
app.use("/home", home);
app.use("/sessionLogin", sessionLogin);
app.use("/sessionHome", sessionHome);
app.use("/sessionLogout", sessionLogout);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
