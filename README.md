# **TFT Backend - Visualización de Grafos para Ensamblaje de Genomas**  

📌 **Versión**: 1.0.0  
🖥 **Tecnologías**: Node.js, Express, TypeScript  
📜 **Licencia**: ISC  

---

## **📌 Descripción del Proyecto**  
Este proyecto implementa un backend para la **visualización de grafos en procesos de ensamblaje de novo de genomas**, parte del **Trabajo de Fin de Título (TFT01)** en colaboración con el **Instituto Tecnológico de Canarias (ITC)**.  

El backend recibe estructuras de grafos y genera una **organización visual óptima**, facilitando la integración con un frontend basado en **Angular y D3.js**.  

---

## **📂 Estructura del Proyecto**  
```
📂 tft-backend
│   .env               # Variables de entorno
│   .gitignore         # Ignorar archivos innecesarios en Git
│   package-lock.json  # Control de versiones de dependencias
│   package.json       # Dependencias y scripts de ejecución
│   README.md          # Documentación del proyecto
│   tsconfig.json      # Configuración de TypeScript
│
├───📂 files
│       test.layout    # Archivo de prueba para el procesamiento de grafos
│
└───📂 src
    │   app.ts         # Punto de entrada principal
    │
    ├───📂 config
    │       envs.ts    # Configuración de variables de entorno
    │
    └───📂 presentation
        │   routes.ts  # Definición de rutas principales
        │   server.ts  # Configuración del servidor Express
        │
        └───📂 graph
                controller.ts  # Controlador para la gestión de grafos
                routes.ts      # Rutas específicas para el módulo de grafos
```

---

## **⚡ Instalación y Configuración**  

### **1️⃣ Requisitos Previos**  
- [Node.js](https://nodejs.org/) (Versión recomendada: **22+**)  
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) instalado  

### **2️⃣ Clonar el Repositorio**  
```bash
git clone https://github.com/usuario/tft-backend.git
cd tft-backend
```

### **3️⃣ Instalar Dependencias**  
```bash
npm install
```

### **4️⃣ Configurar Variables de Entorno**  
Crea un archivo **`.env`** en la raíz del proyecto y añade las siguientes variables:  
```ini
PORT=3000
NODE_ENV=development
```

---

## **🚀 Modos de Ejecución**  

### **🔹 Desarrollo (Hot Reload)**
Ejecuta el backend con recarga automática en cada cambio:  
```bash
npm run dev
```

### **🔹 Compilación a Producción**
Compila el código TypeScript en la carpeta `dist`:  
```bash
npm run build
```

### **🔹 Producción**
Ejecuta la aplicación compilada:  
```bash
npm run start
```

---

## **📌 API Endpoints**  

| Método | Endpoint          | Descripción                        |
|--------|------------------|----------------------------------|
| GET    | `/graph`         | Obtiene la estructura del grafo  |

**Ejemplo de respuesta `/graph`**:  
```json
{
  "nodes": [
    { "id": "A", "x": 100, "y": 150 },
    { "id": "B", "x": 200, "y": 250 }
  ],
  "links": [
    { "source": "A", "target": "B" }
  ]
}
```

---

## **📌 Tecnologías Usadas**  

### **🔹 Backend**
- **Node.js** + **Express** 🚀  
- **TypeScript** ✅  
- **Dotenv** (gestión de variables de entorno)  
- **Cors** (manejo de CORS)  

### **🔹 Herramientas de Desarrollo**
- **ts-node-dev** (recarga automática en desarrollo)  
- **rimraf** (limpieza de archivos en compilación)  


---

## **🛠 Troubleshooting & Debugging**
Si algo no funciona como esperas:  

1. **Verifica las dependencias**  
   ```bash
   npm install
   ```

2. **Asegúrate de que el puerto está libre**  
   ```bash
   lsof -i :3000
   ```

3. **Revisa los logs del servidor**  
   ```bash
   npm run dev
   ```

---

## **📌 Información Adicional**
📘 **Trabajo de Fin de Título (TFT01)**  
Este proyecto forma parte del **TFT01** en colaboración con el **Instituto Tecnológico de Canarias (ITC)**.  
Más información:  
- [📄 Documento TFT01](https://drive.google.com/file/d/1emKnprueySC8kMen3JYUOPBANlWkGwCl/view?usp=sharing)  
- [🔬 Instituto Tecnológico de Canarias](https://www.itccanarias.org/)  

---

## **👨‍💻 Autor y Contribuciones**
📌 **Autor**: Emilio Martel Díaz  
🔗 **Colaboradores**: ITC, Universidad de Las Palmas de Gran Canaria (ULPGC)  

