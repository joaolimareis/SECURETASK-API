import express from 'express'
import { Createdbm } from './dbm.js'
const server = express()
server.use(express.json())
let dbm 
//Rotas
// Rota de registro de usuário
server.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await dbm.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso!' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
    }
});
// Rota que lista todos os usuarios
server.get('/users', async (req, res) => {
    try {
        const users = await dbm.all('SELECT * FROM users')
        res.json(users);
    }    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }

})

// Rota que lista usuario pelo id
server.get('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await dbm.get('SELECT * FROM users WHERE id = ?', [id])
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que atualiza usuario pelo id
server.put('/user/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    try {
        await dbm.run('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id])
        res.json({ message: 'User updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que deleta usuario pelo id
server.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        await dbm.run('DELETE FROM users WHERE id = ?', [id])
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota de registro de tarefa
server.post('/task', async (req, res) => {
    const { user_id, title, description } = req.body
    try {
        await dbm.run(`INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)`, [user_id, title, description])
        res.status(201).json({ message: 'Task created successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que lista todas as tarefas
server.get('/task', async (req, res) => {
    try {
        const tasks = await dbm.all('SELECT * FROM tasks')
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que lista tarefa pelo id
server.get('/task/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await dbm.get('SELECT * FROM tasks WHERE id = ?', [id])
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que atualiza tarefa pelo id
server.put('/task/:id', async (req, res) => {
    const { id } = req.params
    const { user_id, title, description } = req.body
    try {
        await dbm.run('UPDATE tasks SET user_id = ?, title = ?, description = ? WHERE id = ?', [user_id, title, description, id])
        res.json({ message: 'Task updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
// Rota que deleta tarefa pelo id
server.delete('/task/:id', async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body
    try {
        await dbm.run('DELETE FROM tasks WHERE id = ?', [id])
        res.json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }})


server.listen(3000, async () => {
    dbm = await Createdbm();
    console.log('Server is running on http://localhost:3000')

})