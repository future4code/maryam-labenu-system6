import { Docente } from "../types"
import { BaseDataBase } from "./BaseDataBase"


export class TeacherDataBase extends BaseDataBase {

    async create(docente: Docente) {
        await TeacherDataBase.connection('labenusystem_docente')
            .insert({
                id: docente.getId(),
                nome: docente.getNome(),
                email: docente.getEmail(),
                data_nasc: docente.getDataNascimento(),
                turma_id: docente.getTurmaId()
            })

        const especialidades = docente.getEspecialidades()

        const especialidadeId = (): string => {
            return (Date.now().toString())
        }
        const docenteEspecialidadeId = (): string => {
            return (Date.now().toString())
        }

        for (let espec of especialidades) {
            const id = especialidadeId()

            await TeacherDataBase.connection('labenusystem_especialidade')
                .insert({
                    id: id,
                    nome: espec
                })
            
            await TeacherDataBase.connection('labenusystem_docente_especialidade')
                .insert({
                    id: docenteEspecialidadeId(),
                    docente_id: docente.getId(),
                    especialidade_id: id
                })
        }
    }

    async getTeachers(): Promise<Docente[]> {

        const docentes: Docente[] = await TeacherDataBase.connection('labenusystem_docente')
            .select()

        return docentes
    }

    async changeTeacherFromClass(id: string, turma_id: string) {
        await TeacherDataBase.connection('labenusystem_docente')
        .update({
            turma_id: turma_id
        })
        .where("id", "=", id)
    }
}