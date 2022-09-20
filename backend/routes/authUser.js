const path = require("path")
const con = require("../config/db-config")

module.exports = (app, passport)=>{

    app.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
          if (err) { return next(err); }
          if (!user) { 
              res.send({ success: false, message: info.message});
              return;
          }
          req.login(user, loginErr => {
            if (loginErr) {
              return next(loginErr);
            }
            return res.send({ success : true });
          });
        })(req, res, next);
      });
    
    app.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
          if (err) { return next(err); }
          if (!user) { 
              res.send({ success: false, message: info.message});
              return;
          }
          req.login(user, loginErr => {
            if (loginErr) {
              return next(loginErr);
            }
            return res.send({ success : true});
          });
        })(req, res, next);
      });

    app.get("/get/session", (req, res)=>{
        if(req.isAuthenticated()) {
          con.query(`SELECT COUNT(follower) AS followers FROM followed WHERE user = ?`,[req.user.id], (err, result)=>{
            res.send({
              email: req.user.email,
              username: req.user.name,
              description: req.user.description,
              image: req.user.image,
              followers: result[0].followers
            })
          })
        } else {
            res.send({})
        }
    })
    
    app.get("/logout", (req, res)=>{
        req.logout(()=>{
            res.redirect('/')
        })
    })
}