const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1] || req.cookies.token;

    console.log(token)
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        const verified = jwt.verify(token, "my-secret-key");
        console.log(verified)
        req.userId = verified.userId;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
