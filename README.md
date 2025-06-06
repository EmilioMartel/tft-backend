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
│   .env.template      # Plantilla con valores listos para evaluación
│   package.json       # Dependencias y scripts
│   tsconfig.json      # Configuración TypeScript
│   README.md          # Documentación
│
└───📂 src
    ├───📂 application
    │   └───📂 use-cases
    │       └───📂 graph         # Casos de uso relacionados con grafos
    │           usecase.ts
    │
    ├───📂 config
    │       envs.ts              # Variables de entorno centralizadas
    │
    ├───📂 domain
    │   └───📂 entities          # Entidades del grafo
    ├───📂 infrastructure
    │   └───📂 services
    │           file.service.ts   # servicio para leer y generar ficheros
    │
    └───📂 presentation
        ├───📂 bandage          # Controlador y rutas para integración con Bandage
        └───📂 graph            # Controlador y rutas para visualización de grafos
            controller.ts
            routes.ts
```

---

## **⚡ Instalación y Configuración**  

### **1️⃣ Requisitos Previos**  
- [Node.js](https://nodejs.org/) (Versión recomendada: **22+**)  
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) instalado  

### **2️⃣ Clonar el Repositorio**  
```bash
git clone https://github.com/EmilioMartel/tft-backend.git
cd tft-backend
```

### **3️⃣ Instalar Dependencias**  
```bash
npm install
```

### **4️⃣ Configurar Variables de Entorno**  
Renombra el archivo `.env.template` a `.env` para habilitar la configuración del entorno:

```bash
mv .env.template .env
```

Este archivo ya contiene los valores necesarios para el despliegue y funcionamiento del backend. No es necesario realizar modificaciones adicionales. Esta configuración ha sido preparada específicamente para facilitar la replicación del proyecto durante la evaluación del TFT.

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
| GET    | `api/graph/`         | Obtiene la estructura del grafo  |
| POST   | `api/graph/upload`   | Carga el .gfa  |
| GET    | `api/graph/parsed-gfa`         | modela el gfa para tipar su contenido   |
| GET    | `api/bandage/info`         | Obtiene información del grafo  |
| GET    | `api/bandage/layout`         | Genera el .layout a partir del .gfa  |


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
