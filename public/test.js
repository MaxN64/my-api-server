const API_URL = "https://my-api-server-production.up.railway.app/users"; // URL вашего API

// 📌 Получить всех пользователей (GET)
async function getUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        console.log("📋 Список пользователей:", users);
    } catch (error) {
        console.error("❌ Ошибка загрузки пользователей:", error);
    }
}

// ➕ Добавить нового пользователя (POST)
async function addUser(name, email) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
        const result = await response.json();
        console.log("✅ Пользователь добавлен:", result);
    } catch (error) {
        console.error("❌ Ошибка добавления пользователя:", error);
    }
}

// 🔄 Обновить пользователя (PUT)
async function updateUser(id, name, email) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
        const result = await response.json();
        console.log("🔄 Пользователь обновлён:", result);
    } catch (error) {
        console.error("❌ Ошибка обновления пользователя:", error);
    }
}

// 🛠 Частично обновить пользователя (PATCH)
async function patchUser(id, newData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });
        const result = await response.json();
        console.log("🛠 Данные пользователя обновлены:", result);
    } catch (error) {
        console.error("❌ Ошибка частичного обновления пользователя:", error);
    }
}

// ❌ Удалить пользователя (DELETE)
async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();
        console.log("❌ Пользователь удалён:", result);
    } catch (error) {
        console.error("❌ Ошибка удаления пользователя:", error);
    }
}

// 📌 ТЕСТИРОВАНИЕ API В КОНСОЛИ
console.log("🚀 API тестирование начато...");
getUsers(); // Получить всех пользователей
// addUser("Новый Пользователь", "new@example.com"); // Добавить нового
// updateUser(1, "Обновлённое Имя", "updated@example.com"); // Полное обновление
// patchUser(1, { name: "Частичное обновление имени" }); // Частичное обновление
// deleteUser(1); // Удалить пользователя с ID = 1
