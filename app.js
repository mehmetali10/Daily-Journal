const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogs = [];

mongoose.connect("mongodb://127.0.0.1/blogDB");

const blogSchema = {
  title: String,
  content: String
};

const Blog = mongoose.model("Blog", blogSchema);

const representative = new Blog({
  title: "User Guide",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis non neque debitis quod asperiores libero, consequuntur velit sit porro voluptate quam iste ratione natus eaque illo ex quae eos dolorum sequi blanditiis vero quas tempora ea laborum. Iste nulla porro debitis vero quidem sint, ipsa dolorum consequuntur incidunt, repudiandae eum sed quasi dignissimos itaque fugiat consequatur unde sunt fuga veritatis laudantium reprehenderit odio nisi. Aspernatur, unde dolorem quos, quidem earum quaerat provident impedit neque et corporis nemo cumque, suscipit ipsum est! Ipsa amet quasi tempore adipisci sapiente. Hic, numquam provident quaerat repellat, quidem temporibus impedit dicta corporis ad quis, id odio? Quidem hic distinctio assumenda quae inventore voluptates a, animi voluptatibus iste sunt odit suscipit, nemo et! Harum dignissimos eveniet cum illum dolores quod quisquam perferendis quibusdam dicta totam neque aspernatur, asperiores molestias deserunt, recusandae eum nesciunt ut quia qui labore iure laborum fugit, quo illo? Ad eveniet, dolores eum facere nostrum tenetur unde quia assumenda saepe fugiat corporis velit quisquam libero optio itaque, mollitia nobis vitae. Delectus beatae, exercitationem alias fugiat consequuntur et ullam culpa quod mollitia blanditiis nemo vel. Officiis iusto cupiditate, consequuntur, asperiores excepturi fuga nisi, consequatur itaque sapiente officia pariatur voluptas! Rerum, ipsa nemo. Sunt, repellat. "
});




app.get("/", (req, res) => {
  
  Blog.find({}, function(err, foundBlogs){
    
    if(foundBlogs.length === 0){
      representative.save();
      res.redirect("/");
    }
    else{
      res.render("home", {message: homeStartingContent, blogList: foundBlogs});
    }
  });
});


app.get("/about", (req, res) => {
  res.render("about", {message : aboutContent});
});


app.get("/contact", (req, res) => {
  res.render("contact", {message : contactContent});
});


app.get("/compose", (req, res) => {
  res.render("compose");
});


app.post("/compose", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content
  });
  
  blog.save(function(err){
    if(!err)
      res.redirect("/");
  });
});


app.get("/blog/:post", function(req, res) {
  Blog.findOne({_id : req.params.post}, function(err, foundBlog){
    res.render("post", p = foundBlog);
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
