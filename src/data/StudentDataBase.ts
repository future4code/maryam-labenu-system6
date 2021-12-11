import { Estudante } from "../types";
import { BaseDataBase } from "./BaseDataBase";


export class StudentDataBase extends BaseDataBase {

    async create(estudante: Estudante) {
        await StudentDataBase.connection('labenusystem_estudante')
            .insert({
                id: estudante.getId(),
                nome: estudante.getNome(),
                email: estudante.getEmail(),
                data_nasc: estudante.getDataNascimento(),
                turma_id: estudante.getTurmaId()
            })

        const hobbies = estudante.getHobbies()

        const hobbyId = (): string => {
            return (Date.now().toString())
        }
        const estudanteHobbyId = (): string => {
            return (Date.now().toString())
        }

        for (let hobby of hobbies) {
            const id = hobbyId()

            await StudentDataBase.connection('labenusystem_hobby')
                .insert({
                    id: id,
                    nome: hobby
                })
            
            await StudentDataBase.connection('labenusystem_estudante_hobby')
                .insert({
                    id: estudanteHobbyId(),
                    estudante_id: estudante.getId(),
                    hobby_id: id
                })
        }
    }

    async getStudentByName(nome: string): Promise<Estudante[]> {

        const estudante: Estudante[] = await StudentDataBase.connection('labenusystem_estudante')
            .where("nome", "LIKE", `%${nome}%`)

        return estudante
    }

    async changeStudentFromClass(nome: string, turma_id: string) {
        await StudentDataBase.connection('labenusystem_estudante')
        .update({
            turma_id: turma_id
        })
        .where("nome", "=", nome)
    }
}