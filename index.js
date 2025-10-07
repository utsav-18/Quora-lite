const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

//Backend Data replica

    let posts = [
    {
        id: uuidv4(),
        username : "Utsav",
        content : "How do I structure a RESTful API in Node.js for better scalability and maintainability?"
    },
    {
        id: uuidv4(),
        username : "Anshu",
        content : "What are the key differences between cloud computing models: IaaS, PaaS, and SaaS?"
    },
    {
        id: uuidv4(),
        username : "Utsav Srivastava",
        content : "How can I use GSAP and ScrollMagic together to create smooth scroll-based animations?"
    },
];



app.get("/posts" , (req,res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new" , (req,res) => {
    res.render("new.ejs")
});

app.post("/posts", (req,res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id: uuidv4(),username ,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id" , (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");

});

app.get("/posts/:id/edit" ,(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id!==p.id);
    res.redirect("/posts");

});

app.listen(port , () =>{
    console.log("http://localhost:8080/posts");
}); 

