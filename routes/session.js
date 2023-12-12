const express = require("express");
const USER = require("../model/user");
const router = express.Router();

class handleUserSession{
    // Get session info

    static user_session_info = (req, res)=> {
        // console.log(req.session);
        console.log(req.session.id);
        // console.log(req.session.cookie);
        // console.log(req.session.cookie.maxAge);
        // console.log(req.session.cookie.origialMaxAge);
        // console.log(req.session.cookieID);
        // res.send("user-sessions-info...");
        res.redirect("/users/login");
    }
}

router.get("/user-info", handleUserSession.user_session_info);

// module.exports = handleUserSession;
module.exports = router;