// Определяем URL сервера
const BASE_URL = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost')
    ? 'http://127.0.0.1:3000'
    : 'https://my-api-server-production.up.railway.app';

// Функция загрузки списка пользователей
function getUsers() {
    fetch(`${BASE_URL}/users`)
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = ''; // Очищаем список
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteUser(${user.id})">❌ Удалить</button>
                    </td>
                `;
                usersList.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
}

// Функция добавления нового пользователя
function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getUsers(); // Обновляем список
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция удаления пользователя
function deleteUser(id) {
    if (!confirm('Вы уверены, что хотите удалить пользователя?')) return;

    fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getUsers(); // Обновляем список
        })
        .catch(error => console.error('Ошибка удаления:', error));
}

// Загружаем пользователей при загрузке страницы
getUsers();
