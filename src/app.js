const displayData = document.querySelector("#feed")


fetch("http://127.0.0.1:9000/test")
.then(res => res.json())
.then(data => {
    // var dd = data[0].toString().include("Conference")
    // displayData.insertAdjacentHTML("beforeend", dd)
    var counter=0;
    for(var i=0;i<data[1];i++){
        if(data[0][i].toString().includes("Conference") == true){
            counter++
        }
    }

    var journal  = `<h1>Total Journal Papers: ${data[1] - counter}</h1>`
    var totalCounts  = `<h1> Total Paper:${data[1]}</h1>`
    var Conference  = `<h1>Total Conference Papers:${counter}</h1>`
     
    displayData.insertAdjacentHTML("beforeend", journal)

    displayData.insertAdjacentHTML("beforeend", Conference)

    displayData.insertAdjacentHTML("beforeend",totalCounts)


    // console.log(`data ${data}`)
    // data.forEach(e => {
    // var links  = `<h1>${e}</h1>`
    // displayData.insertAdjacentHTML("beforeend", links)
    // // console.log(`links : ${links.length}`)
    // });
})
.catch(err=> console.log(`errr ${err}`))

