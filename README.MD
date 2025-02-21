

# 🚀 Proyecto de Generación de Contenido con IA

Este proyecto permite la generación automatizada de contenido basado en palabras clave, categorías y parámetros específicos mediante inteligencia artificial.

---

## 📂 Estructura del Proyecto

```
IA-content-generator/
│── config/
│   ├── connect.js
│   ├── middlewares.js
│──src/
    │── controllers/
    │   ├── contentController.js
    │   ├── parameterController.js
    │   ├── userController.js
    │
    │── models/
    │   ├── contentModel.js
    │   ├── parameterModel.js
    │   ├── userModel.js
    │
    │── routes/
    │   ├── contentRoutes.js
    │   ├── parameterRoutes.js
    │   ├── userRoutes.js
    │
    │── schemas/
    │   ├── contentSchema.js
    │   ├── parameterSchema.js
    │   ├── userSchema.js
    │   ├── promptShema.js
    │
    │── utils/
    │   ├── auth.js 
    │   ├── generator.js
    │   ├── model.js
    │   ├── prompt.js
    │
    │── app.js
    │── .env
    │── package.json
    │── README.md
```
--- 

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js con Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Inteligencia Artificial**: Google Generative AI (Gemini API)
- **Middleware**: Morgan, Cors, Helmet

---

## 🔧 Configuración e Instalación

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno  
Crear un archivo `.env` en la raíz del proyecto y añadir lo siguiente:
```
PORT=5000
MONGO_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/dbname
JWT_TOKEN_SECRET=tu_secreto_jwt
GEMINI_API_KEY=tu_clave_de_api
```

### 4️⃣ Iniciar el Servidor
```bash
npm start
```
El servidor se ejecutará en `http://localhost:5000`.

---

## 🔗 Endpoints Principales

### 🔹 Usuarios (`/user`)
| Método | Endpoint             | Descripción                          | Autenticación |
|--------|----------------------|--------------------------------------|--------------|
| `GET`  | `/user/all`          | Obtener todos los usuarios          | ✅ Sí       |
| `GET`  | `/user/:id`          | Obtener un usuario por ID           | ✅ Sí       |
| `POST` | `/user/register`     | Registrar un nuevo usuario          | ❌ No       |
| `POST` | `/user/log`          | Iniciar sesión                      | ❌ No       |
| `PUT`  | `/user/update/:id`   | Actualizar usuario por ID           | ✅ Sí       |
| `DELETE` | `/user/delete/:id` | Eliminar usuario por ID             | ✅ Sí       |

---

### 🔹 Parámetros (`/parameter`)
| Método | Endpoint                  | Descripción                    | Autenticación |
|--------|---------------------------|--------------------------------|--------------|
| `GET`  | `/parameter/all`          | Obtener todos los parámetros   | ✅ Sí       |
| `GET`  | `/parameter/:id`          | Obtener un parámetro por ID    | ✅ Sí       |
| `POST` | `/parameter/create`       | Crear un nuevo parámetro       | ✅ Sí       |
| `PUT`  | `/parameter/update/:id`   | Actualizar parámetro por ID    | ✅ Sí       |
| `DELETE` | `/parameter/delete/:id` | Eliminar parámetro por ID      | ✅ Sí       |

---

### 🔹 Contenido (`/content`)
| Método | Endpoint                     | Descripción                               | Autenticación |
|--------|------------------------------|-------------------------------------------|--------------|
| `GET`  | `/content/all`               | Obtener todo el contenido generado       | ✅ Sí       |
| `GET`  | `/content/:id`               | Obtener contenido por ID                 | ✅ Sí       |
| `GET`  | `/content/user/:id`          | Obtener contenido por usuario            | ✅ Sí       |
| `POST` | `/content/create/:parameter_id` | Generar contenido con IA basado en parámetros | ✅ Sí       |

---

## 🔒 Seguridad y Middleware

- `morgan`: Para el registro de peticiones HTTP.
- `cors`: Para permitir solicitudes desde diferentes orígenes.
- `helmet`: Para mejorar la seguridad de la API.
- `jsonwebtoken`: Para autenticación con tokens JWT.

---

## 🤖 Generación de Contenido con IA

El proyecto usa **Google Generative AI (Gemini API)** para la generación de contenido.  
La lógica de generación se basa en:

- **`prompt.js`** → Estructura del prompt para la IA.
- **`generator.js`** → Lógica de generación de contenido.
- **`model.js`** → Configuración del modelo de IA.

Ejemplo de Prompt:
```js
const prompt = mainPrompt(keywords, category, length);
```

---

## 📌 Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza tus cambios y haz commit (`git commit -m "Agregada nueva funcionalidad"`).
4. Haz push a la rama (`git push origin feature-nueva`).
5. Abre un Pull Request.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

---

¡Listo! Con este `README.md`, tu documentación es clara, profesional y bien estructurada. 🚀