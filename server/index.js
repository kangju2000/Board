const express = require("express");
const path = require("path");
const app = express();
const { User } = require("./models/User");
const { List } = require("./models/List");
const { Counter } = require("./models/Counter");
const { Comment } = require("./models/Comment");
const { auth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../board-app/build")));
app.use(cookieParser());

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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
});
// app.get("/board", function (req, res) {
//     res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
// });
// app.get("/login", function (req, res) {
//     res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
// });
// app.get("/register", function (req, res) {
//     res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
// });
// app.get("/add", function (req, res) {
//     res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
// });
// app.get("/post/:id", function (req, res) {
//     res.sendFile(path.join(__dirname, "../board-app/build/index.html"));
// });

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);
});

// 회원가입
app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

// 로그인
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

// 로그아웃
app.post("/api/users/logout", auth, (req, res) => {
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

// 회원 기능
app.post("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
    // 클라이언트에게 유저 정보 전달
    return res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        intro: req.user.intro,
        gender: req.user.gender,
        role: req.user.role,
        image: req.user.image,
    });
});

// 프로필 수정
app.post("/api/users/profile", (req, res) => {
    const data = req.body;
    User.updateOne({ email: data.email }, { $set: data }).then((doc) => {
        console.log("업데이트 완료");
        return res.status(200).json({
            success: true,
        });
    });
});

// 글 추가
app.post("/api/users/add", (req, res) => {
    const data = req.body;
    let totalPost;
    Counter.findOne({ name: "게시물갯수" }).then((doc) => {
        totalPost = doc.totalPost;
        data["post_id"] = totalPost + 1;
        const list = new List(data);

        list.save((err, userInfo) => {
            if (err) return res.json({ success: false, err });
            Counter.updateOne(
                { name: "게시물갯수" },
                { $inc: { totalPost: 1 } }
            ).then(console.log("증가 완료"));

            return res.status(200).json({
                success: true,
            });
        });
    });
});

// DB에서 글 수정
app.post("/api/users/editpost", (req, res) => {
    List.updateOne({ post_id: req.body.post_id }, { $set: req.body }).then(
        (doc) => {
            console.log("게시글 수정 완료");
            return res.status(200).json({ success: true });
        }
    );
});

//글 삭제
app.post("/api/users/deletepost", (req, res) => {
    List.deleteOne({ post_id: req.body.post_id }).then((doc) => {
        console.log("게시글 삭제 완료");
    });
    //게시글에 달린 댓글도 삭제
    Comment.deleteMany({ post_id: req.body.post_id }).then((doc) => {
        console.log("게시글 댓글삭제 완료");
        return res.status(200).json({ success: true });
    });
});

//댓글 기능
app.post("/api/users/comment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

//댓글 삭제
app.post("/api/users/deletecmt", (req, res) => {
    Comment.deleteOne({ content: req.body.content }).then((doc) => {
        console.log("댓글 삭제 완료");
        return res.status(200).json({ success: true });
    });
});

// 글 가져오기
app.post("/api/getposts", (req, res) => {
    List.find({}).then((data) => {
        return res.json(data);
    });
});

app.post("/api/getcomments", (req, res) => {
    Comment.find({ post_id: req.body.post_id }).then((data) => {
        return res.json(data);
    });
});
