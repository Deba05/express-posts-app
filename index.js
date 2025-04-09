 const express=require("express");
 const app= express();
 const path = require("path");
 const { v4: uuidv4 } = require('uuid');
 const methodOverride=require("method-override");
 const multer = require("multer");

// Set storage destination
 const upload = multer({ dest: "public/uploads/" });

 uuidv4();


 app.use(express.urlencoded({extended: true}));
 app.use(methodOverride("_method"));
 app.set("views",path.join(__dirname,"/views"));
 app.set("view engine","ejs");
 app.use(express.static(path.join(__dirname,"/public")));

 let posts=[
    {    
        id:uuidv4(),
        username: "Debaditya Dasgupta",
        content:"Loves travelling places"

    },
    {    
        id:uuidv4(),
        username: "Arun Kumar",
        content:"Loves riding bikes"  
    },
    {
        id:uuidv4(),
        username: "Shiv Nandan Kumar",
        content:"Plays games"
    }
 ];

  app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
   });
   
   app.get("/posts/:id", (req, res) => {
      let { id } = req.params;
      console.log(id);
      let post = posts.find((p) => id == p.id);
      
      if (!post) {
         return res.status(404).send("Post not found"); 
      }
   
      res.render("show.ejs", { post }); 
   });
   app.get("/posts/new",(req,res)=>{
      res.render("new.ejs");
   });
   app.patch("/posts/:id", (req, res) => {
      console.log("Received Data:", req.body); // Debugging line
      let { id } = req.params;
      let newContent = req.body.content;
      let post = posts.find((p) => id == p.id);
  
      if (!post) {
          return res.status(404).send("Post not found");
      }
  
      post.content = newContent; // Update the content
      console.log("Updated Content:", newContent);
  
      res.redirect("/posts");
  });
  
   
 

 app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
 });
 app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
 });
 app.post("/posts",upload.single("image"), (req, res) => {
   let { username, content } = req.body;
   console.log(req.body)
   let id = uuidv4();
   let imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Generate a new UUID for the post
   posts.push({id, username, content, image: imagePath });
 
   res.redirect("/posts"); // Redirect to the posts list
 });
 app.get("/posts/:id/edit",(req,res)=>{
   let { id } = req.params;
   let post = posts.find((p) => id == p.id);
   res.render("edit.ejs",{post});
   
})

app.delete("/posts/:id",(req,res)=>{
   let { id } = req.params;
   // let post = posts.find((p) => id == p.id);
   posts = posts.filter((p) => p.id !== id);
   // res.send("del req working");
   res.redirect("/posts");
})


 let port=8080;
 app.listen(port,()=>{
    console.log(`app listening on port ${port}`);

 });





 

