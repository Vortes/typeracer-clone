const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get("/api", (req, res) => {
    res.send({"data":"Hello world"})
})

app.listen(port, ()=> {
    console.log("listening on port 3000")
})