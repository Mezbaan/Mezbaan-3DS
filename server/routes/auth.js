const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../controllers/auth");

router.post("/users", Auth.signup);
router.post("/auth", Auth.signin);

router.get("/profile/:id", Auth.authMiddleware, function(req, res) {
	console.log('req.params.id: ',req.params.id);
  User.findOne({_id:req.params.id}).
    exec(function(err, foundProfile) {
    	console.log('foundProfile:',foundProfile);
      res.json(foundProfile);
  });
});

router.get("/test", Auth.authMiddleware, function(req, res) {
  res.json({ok: "ok"});
});

module.exports = router;
