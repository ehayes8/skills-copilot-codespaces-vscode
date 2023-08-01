// Create web server
    // 1. make sure node is installed
// 2. make sure npm is installed
// 3. make sure express is installed
// 4. make sure body-parser is installed
// 5. make sure mongodb is installed
// 6. make sure mongoose is installed
// 7. make sure nodemon is installed

// 1. require express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// 2. create an instance of express
const app = express();

// 3. connect to mongodb
mongoose.connect("mongodb://localhost:27017/commentsDB", { useNewUrlParser: true });

// 4. create a schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// 5. create a model
const Comment = mongoose.model("Comment", commentSchema);

// 6. set view engine
app.set("view engine", "ejs");

// 7. use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// 8. set up public folder
app.use(express.static("public"));

// 9. set up routes
app.get("/", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { comments: comments });
    }
  });
});

app.post("/", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  comment.save();
  res.redirect("/");
});

// 10. start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});