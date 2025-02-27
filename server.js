const express = require('express');  // Подключаем Express.js
const fs = require('fs');  // Работа с файлами
const cors = require('cors');  // Разрешаем запросы с других доменов
const path = require('path'); // Подключаем path

const app = express();
const PORT = process.env.PORT || 3000;

// 📌 Раздаём статические файлы из папки "public"
app.use(express.static(path.join(__dirname, 'public')));

// 📌 Отдаём index.html при заходе на главную страницу "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 📌 Функции для работы с "базой данных" (db.json)
const loadUsers = () => JSON.parse(fs.readFileSync('db.json', 'utf8'));
const saveUsers = (users) => fs.writeFileSync('db.json', JSON.stringify(users, null, 2));

// ✅ Получить всех пользователей (GET /users)
app.get('/users', (req, res) => {
    res.json(loadUsers());
});

// ✅ Получить одного пользователя (GET /users/:id)
app.get('/users/:id', (req, res) => {
    const users = loadUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: "Пользователь не найден" });
});

// ✅ Добавить нового пользователя (POST /users)
app.post('/users', (req, res) => {
    const users = loadUsers();
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    saveUsers(users);
    res.json({ message: "Пользователь добавлен", user: newUser });
});

// ✅ Обновить данные пользователя (PUT /users/:id)
app.put('/users/:id', (req, res) => {
    let users = loadUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Пользователь не найден" });

    users[index] = { id: parseInt(req.params.id), ...req.body };
    saveUsers(users);
    res.json({ message: "Пользователь обновлён", user: users[index] });
});

// ✅ Частично обновить пользователя (PATCH /users/:id)
app.patch('/users/:id', (req, res) => {
    let users = loadUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Пользователь не найден" });

    users[index] = { ...users[index], ...req.body };
    saveUsers(users);
    res.json({ message: "Данные пользователя обновлены", user: users[index] });
});

// ✅ Удалить пользователя (DELETE /users/:id)
app.delete('/users/:id', (req, res) => {
    let users = loadUsers();
    const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (users.length === newUsers.length) return res.status(404).json({ error: "Пользователь не найден" });

    saveUsers(newUsers);
    res.json({ message: "Пользователь удалён" });
});

// ✅ Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});

