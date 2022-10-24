const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((request, response)=>{
    let filePath = path.join(__dirname, "public", request.url === "/" || request.url == "/home" ? "index.html" : request.url)
    let imagePath = path.join(__dirname, "image", request.url === "/" || request.url == "/home" ? "index.html" : request.url)
    let empthPath = path.join(__dirname, "public", "404.html")
    const getContentType = (filePath)=>{
        let extname = path.extname(filePath)
        if(extname === ".js"){
            return "text/javascript"
        } else if(extname === ".css"){
            return "text/css"
        } else if(extname === ".png"){
            return "image/png"
        } else if(extname === ".jpg"){
            return "image/jpg"
        } 
    }
    let contentType = getContentType(filePath) || "404.html"

    fs.readFile(filePath, "utf-8", (err, content)=>{
        if (err){
            if(err.code === "ENOENT"){
                fs.readFile(empthPath, "utf-8", (err, content)=>{
                    response.writeHead(200, {"Content-Type": contentType})
                    response.end(content)
                })
            } else{
                response.writeHead(500)
                response.end("A server error occurred")
            }
        } else {
            response.writeHead(200, {"Content-Type": contentType})
            response.end(content)
        }
    })
})

const port = 3000

server.listen(port, ()=>{
    console.log("Server is running")
})