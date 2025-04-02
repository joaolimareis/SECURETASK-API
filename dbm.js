import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function Createdbm() {
    const dbm = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    });


    // Criar tabela de usuários
    await dbm.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );

    `    );
    // Criar tabela de tarefas

    await dbm.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
    )
    `);

    return dbm;

}