const express = require("express");
const cors = require("cors");
const app = express();
const test = require("./routes/test");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const port = 5000;
const config = require("../config/key");

const mongoose = require("mongoose");
mongoose
    .connect(config.mongoURI, {
        dbName: "board",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use(cors());
app.use("/api", test);
app.get("/api/hello", (req, res) => {
    res.send("하이요");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            //200은 성공
            success: true,
        });
    });
});

app.post("/api/users/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다.",
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });

            // 비밀번호까지 맞다면 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 정상적일 경우 토큰을 쿠키나 로컬스토리지 등에 저장
                // 쿠키에 저장
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.get("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
    // 클라이언트에게 유저 정보 전달
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            token: "",
        },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,
            });
        }
    );
});
