import { connection } from "../connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS labenusystem_turma (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        modulo ENUM('0', '1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '0'
    );

    CREATE TABLE IF NOT EXISTS labenusystem_docente (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255),
        FOREIGN KEY (turma_id) REFERENCES labenusystem_turma (id)
    );

    CREATE TABLE IF NOT EXISTS labenusystem_especialidade (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE DEFAULT 'JS'
    );

    CREATE TABLE IF NOT EXISTS labenusystem_docente_especialidade (
        id VARCHAR(255) PRIMARY KEY,
        docente_id VARCHAR(255) NOT NULL,
        especialidade_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (docente_id) REFERENCES labenusystem_docente (id),
        FOREIGN KEY (especialidade_id) REFERENCES labenusystem_especialidade (id)
    );

    CREATE TABLE IF NOT EXISTS labenusystem_estudante (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        data_nasc DATE NOT NULL,
        turma_id VARCHAR(255),
        FOREIGN KEY (turma_id) REFERENCES labenusystem_turma (id)
    );

    CREATE TABLE IF NOT EXISTS labenusystem_hobby (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS labenusystem_estudante_hobby (
        id VARCHAR(255) PRIMARY KEY,
        estudante_id VARCHAR(255) NOT NULL,
        hobby_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (estudante_id) REFERENCES labenusystem_estudante (id),
        FOREIGN KEY (hobby_id) REFERENCES labenusystem_hobby (id)
    );
`)
.then(() => { console.log("Tabelas criadas") })
.catch(printError)

// const insertUsers = () => connection("aula51_users")
//     .insert(users)
//     .then(() => { console.log("Usuários criados") })
//     .catch(printError)

// // const insertAddress = async () => {
// //     const newAddress = await getAddressInfo("16403073", 10, "Residência")
// //     await connection("aula51_addressUsers")
// //         .insert(newAddress)
// //         .then(() => { console.log("Endereço Criado") })
// //         .catch(printError)
// // }

const closeConnection = () => { connection.destroy() }

createTables()
    .then()
    .finally(closeConnection)
