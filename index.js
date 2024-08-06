const mongoose = require("mongoose")
const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { adminProtected } = require("./middleware/protected")
require("dotenv").config()

const app = express()
app.use((express.static("build")))
app.use(express.json())
app.use(cookieParser())

app.use(cors(
    {
        credentials: true,
        origin: true
    }
))

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/admin", require("./routes/adminRoute"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "infdex.html"))
    // res.status(404).json({ message: "Page not found" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Server Error", error: err.message })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log(`Server running on port`))
})  