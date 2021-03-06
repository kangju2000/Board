const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 8,
    },
    email: {
        type: String,
        trim: true, // 스페이스와 같은 공백을 없애주는 역할
        unique: 1, // 똑같은 이메일을 쓰지 못하도록하는 역할
    },
    password: {
        type: String,
        minlength: 5,
    },
    gender: {
        type: String,
    },
    intro: {
        type: String,
        maxlength: 100,
        default: "",
    },
    role: {
        type: Number, // 1이면 관리자, 0은 일반
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre("save", function (next) {
    // 저장하기전에 실행할 코드
    var user = this;
    console.log(user);
    if (user.isModified("password")) {
        // 비밀번호가 변경될때만
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err); // next는 바로 register로 넘어감
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        // 그 외에는 그냥 내보낸다
        next();
    }
});
userSchema.pre("updateOne", function (next) {
    let update = this.getUpdate().$set;
    if (update.password) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(update.password, salt, function (err, hash) {
                if (err) return next(err);
                update.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// 로그인 - 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
    // 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인(비교) -> 평문을 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch); // 즉, true
    });
};

// 로그인 - 토큰 생성
userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;

    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

// auth 인증 - 복호화 (토큰을 디코드)
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, "secretToken", function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema, "users");
module.exports = { User };
