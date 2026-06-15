import app from "./app.js"
import "./database.js"//esto no se si quitarlo
import { config } from "./config.js"

async function main() {
    app.listen(4000)
    console.log("server open on port 4000")
}

main()