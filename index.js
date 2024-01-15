// 1- لتسهيل الباك اندexpress اكواد جافا سكربت ولكنها تستخدم اطار

// 2-  لازم استدعي الدالة ركويرnode_modules لستخدام مكتبة من 
const express = require("express")
const mongoose = require("mongoose")

//لتلبية الطلبات ويعمل استجابة للعميلnode.js هنا انشاءت ويب سيرفر تبع 
const app = express()

//اذا بجيب شي من ملف اخر استخم ريكوير
const Article = require("./models/Article")

mongoose.connect("mongodb+srv://afnan2000:afnan4488@cluster0.cib7qao.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("connectinf successfly")
    }).catch((error) => {
        console.log("error with connecting with DB", error)
    })

//استخدمت يوز على شين اقدر استخدم البودي براميتر
app.use(express.json())

app.get("/hello", (req, res) => {
    res.send("hello")
})

app.get("/hi", (req, res) => {
    res.send("you visited hi")
})

app.get("/", (req, res) => {
    res.send("hello in node js project")
})

app.put("/test", (req, res) => {
    res.send(" test")
})

app.post("/addComment", (req, res) => {
    res.send("post request on add comment")
})

app.delete("/testingDelete", (req, res) => {
    res.send("visting delete request")
})

app.get("/numbers", (req, res) => {
    let numbers = ""
    for (let i = 0; i <= 100; i++) {

        numbers += i + " - "
    }
    // res.send(`the numbers are : ${numbers}`)
    // res.send(__dirname + "/views/index.html")
    // res.sendFile(__dirname + "/views/numbers.html")

    res.render("numbers.ejs", {
        name: "Aleen",
        numbers: numbers,
    })


})

app.get("/findSummation/:num1/:num2", (req, res) => {
    const num1 = req.params.num1
    const num2 = req.params.num2

    total = Number(num1) + Number(num2)

    res.send(`the total is: ${total}`)

})

// using body parameters 
app.get("/sayHello", (req, res) => {
    console.log(req.body)

    res.send(`Hello, ${req.body.name}`)

})

// return json respone rether than text
app.get("/resJson", (req, res) => {

    res.json({
        name: req.body.name,
        age: req.query.age,
        language: "Arabic"
    })

})


//using query paramerters
app.get("/age", (req, res) => {
    console.log(req.query)

    res.send(`Your age is, ${req.query.age}`)

})


//Articles endpoints
//Saving articles
app.post("/articles", async (req, res) => {

    const newArticle = new Article()

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody

    newArticle.title = artTitle
    newArticle.body = artBody
    newArticle.numberOfLikes = 0
    await newArticle.save() // saved in DB

    res.json(newArticle)
})


// Reading articles
app.get("/articles", async (req, res) => {
    //fetch all articles 
    const articles = await Article.find()
    console.log("the articles are:", articles)

    res.json(articles)
})

//Specific id article
app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId

    try {
        const article = await Article.findById(id)
        res.json(article)
        return
    } catch (error) {
        console.log("error while reaading article of id", id)
        return res.send("error")
    }

})

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId

    try {
        const article = await Article.findByIdAndDelete(id)
        res.json(article)
        return
    } catch (error) {
        console.log("error while reaading article of id", id)
        return res.send("error")
    }

})

//Diplay all articles
app.get("/showArticles", async (req, res) => {
    const articles = await Article.find() // find return all articles

    //build html page not json 
    res.render("articles.ejs", {
        allArticles: articles,
    })

})

// run the server
app.listen(3000, () => {
    console.log("l am listening in port 3000")
})