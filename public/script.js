// Функция загрузки списка пользователей
function getUsers() {
    fetch('/users')
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

    fetch('/users', {
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

    fetch(`/users/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getUsers(); // Обновляем список
        })
        .catch(error => console.error('Ошибка удаления:', error));
}

// Загружаем пользователей при загрузке страницы
getUsers();
