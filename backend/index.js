const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = []; // base de datos temporal

app.post('/register', async (req, res) => {
    const { nombre, email, role, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ message: 'Campos incompletos' });

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ message: 'Usuario ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, nombre, email, role, passwordHash: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'mi_secreto', { expiresIn: '1h' });
    res.json({ token });
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));