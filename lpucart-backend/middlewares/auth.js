const passport = require("passport");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject({ status: 403, message: "Forbidden: Please Authenticate" });
    }
    req.user = user;
    resolve();
};

const auth = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
            "jwt",
            { session: false },
            verifyCallback(req, resolve, reject)
        )(req, res, next);
    })
    .then(() => next())
    .catch((err) => {
        res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
    });
};

module.exports = auth;
