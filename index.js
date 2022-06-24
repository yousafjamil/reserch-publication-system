const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const puppeteer = require('puppeteer');
const session=require('express-session');
const app = express();
const PORT = 9000

// app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(session({
    resave:false,
    secret:'some secret here',
    saveUninitialized:false
}))
app.set('view engine', 'ejs')
app.set('views', 'views');



app.get('/', (req, res) => {
    res.render('home')
})
app.get('/test',(req,res)=>{
    res.render('index')
})

app.get('/alldata', (req, res) => {
    var message = req.session.message;
    res.render('alldata',{message})
})
	
app.post("/test", async (req, res) =>  {

    // const url = "https://scholar.google.com/citations?hl=en&user=u-8o0hMAAAAJ";
    // const url = "https://scholar.google.com/citations?hl=en&user=0rWSQMkAAAAJ"

    // const url = "https://scholar.google.com/citations?hl=en&user=veTXfR8AAAAJ"
    const  url=req.body.url;
    const browser = await puppeteer.launch({
        headless:true,
        slowMo:10,
        devtools:false
    })
    
    const page =  await browser.newPage()
    await page.goto(url)
    await page.waitForTimeout(1000)
    await page.click('#gsc_bpf_more', {clickCount:4})
    await page.waitForTimeout(2000)
    await page.click('#gsc_bpf_more', {clickCount:4})
    await page.waitForTimeout(2000)
    await page.click('#gsc_bpf_more', {clickCount:4})
    await page.waitForTimeout(2000)
    await page.click('#gsc_bpf_more', {clickCount:4})
    await page.waitForTimeout(2000)
    // const links = await page.evaluate(()=> {
    //   return Array.from(document.querySelectorAll('.gsc_a_at')).map(x => x.textContent)
    
    // })
    
    
    const article = await page.evaluate(()=> {
      return Array.from(document.querySelectorAll('.gsc_a_tr')).map(x => x.textContent)
    })
    
     let aa = Array(
       article,
       article.length
    )
     
    //  await axios.get(url).then(resp  => {
    //         var html = resp.data;
    //         var content = cheerio.load(html)
    //         const counter = []
        
    //          content(".gsc_a_at", html).each(function(){
    //              var title = content(this).text()
    //              counter.push({
    //                  title
    //              })
    //          });  
          
            //  console.log(counter)
            // res.json(counter.length)
            // }).catch(err => console.log(err))
            // console.log(aa)
            req.session.message=aa;
            res.redirect('/test')
            // res.json(aa)
    
    });


// app.post("/test", (req, res) => {

//     // var url = "https://scholar.google.com/citations?hl=en&user=u-8o0hMAAAAJ";
//   const {url}=req.body;
// //    console.log(url)
//     axios.get(url).then(resp => {
//         var html = resp.data;
//         var content = cheerio.load(html)
//         const counter = []

//         //   let page = content("#gsc_bpf_more").children().children().last().children().;

//         content(".gsc_a_at", html).each(function () {
//             var title = content(this).text()

//             counter.push({
//                 title
//             })

//         });
//         req.session.message = counter.map((x)=>x.title)
//         res.redirect('/alldata')

//         console.log(counter)
//         // res.json(counter)
//     },
//     ).catch(err => console.log(err))
// });




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



