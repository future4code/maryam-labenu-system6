import { Request, Response } from "express"
import app from "./app"
import { createClass } from "./endpoints/createClass"
import { createStudent } from "./endpoints/createStudent"
import { createTeacher } from "./endpoints/createTeacher"


app.get("/", (req: Request, res: Response) => {
    res.send("Testando... Deu tudo certo!")
    console.log("configurações funcionando")
})

app.post("/turmas", createClass)
app.post("/estudantes", createStudent)
app.post("/docentes", createTeacher)