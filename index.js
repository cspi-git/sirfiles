"use strict";

// Dependencies
const compression = require("compression")
const serveIndex = require("serve-index")
const express = require("express")
const path = require("path")

// Variables
const web = express()
const port = process.env.PORT || 8080

/// Configurations
//*r Express
web.use(compression({ chunkSize: 65536 }))
web.use(express.static(path.join(__dirname, "public")))
web.use("/files", express.static(path.join(__dirname, "files")), serveIndex(path.join(__dirname, "files"), { stylesheet: path.join(__dirname, "custom.css"), icons: true }))

// Main
web.use("", (req, res, next)=>{
	if(req.path.match(".html")) return res.redirect("/")

	next()
})

web.use("*", (req, res)=>res.redirect("/"))
web.listen(port, ()=>console.log(`Server is running. Port: ${port}`))