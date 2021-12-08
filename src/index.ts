import { Request, Response } from "express"
import app from "./app"


app.get("/", (req: Request, res: Response) => {
    res.send("Testando... Deu tudo certo!")
    console.log("configurações funcionando")
})