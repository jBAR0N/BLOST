const path = require("path")
const con = require("../config/db-config")

module.exports = (app, passport)=>{

    app.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
          if (err) { return next(err); }
          if (!user) { 
              res.send({ success: false });
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
          if (err) return next(err)
          if (!user) { 
              res.send({ success: false });
              return;
          }
          req.login(user, loginErr => {
            if (loginErr) return next(loginErr);
            return res.send({ success : true});
          });
        })(req, res, next);
      });

    app.get("/get/session", (req, res)=>{
        if(req.isAuthenticated()) {
          con.query(`
          SELECT 
          COUNT(DISTINCT f.follower) AS followers, COUNT(DISTINCT c.id) AS posts, COUNT(DISTINCT d.id) AS drafts,
          IF(u.id IN (SELECT user_id FROM notifications WHERE noticed = 0), true, false) AS unread
          FROM
            users AS u
            LEFT JOIN followed AS f
            ON f.user = u.id
            LEFT JOIN content AS c
            ON c.user_id = u.id AND c.roll = 'public'
            LEFT JOIN content AS d
            ON d.user_id = u.id AND d.roll = 'draft'
          WHERE u.id = ?
          `,[req.user.id], (err, result)=>{
            res.send({
              email: req.user.email,
              username: req.user.name,
              description: req.user.description,
              image: req.user.image,
              about: req.user.about,
              ...result[0]
            })
          })
        } else {
            res.send({})
        }
    })
    
    app.get("/logout", (req, res)=>{
        req.logout(()=>{
            res.send({success: true})
        })
    })
}