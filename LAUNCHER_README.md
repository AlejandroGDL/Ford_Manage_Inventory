# 🚀 Ford Manage Inventory - Scripts de Ejecución

Este proyecto incluye varios scripts para facilitar la ejecución del sistema completo (frontend + backend).

## 📋 Prerequisitos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Windows** (PowerShell o Command Prompt)

## 🎯 Scripts Disponibles

### 1. **dev-start.bat** (Recomendado para desarrollo)

```batch
dev-start.bat
```

- ✅ **Más simple y rápido**
- ✅ Instala dependencias automáticamente
- ✅ Abre ventanas separadas para backend y frontend
- ✅ Abre el navegador automáticamente
- ✅ Fácil de detener (solo cerrar ventanas)

### 2. **dev-start.ps1** (PowerShell avanzado)

```powershell
.\dev-start.ps1
```

**Opciones disponibles:**

```powershell
# Saltar instalación de dependencias
.\dev-start.ps1 -SkipInstall

# No abrir navegador automáticamente
.\dev-start.ps1 -SkipBrowser

# Combinar opciones
.\dev-start.ps1 -SkipInstall -SkipBrowser
```

### 3. **start-project.ps1** (Completo con monitoreo)

```powershell
.\start-project.ps1
```

- ✅ Verificación completa de prerequisitos
- ✅ Manejo avanzado de procesos
- ✅ Logs en tiempo real
- ✅ Limpieza automática al salir
- ⚠️ Más complejo, para usuarios avanzados

### 4. **start-project.bat** (Compatibilidad total)

```batch
start-project.bat
```

- ✅ Compatible con cualquier versión de Windows
- ✅ No requiere PowerShell
- ✅ Manejo básico de errores

## 🌐 URLs del Proyecto

Una vez iniciado el proyecto, tendrás acceso a:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🛠 Uso Recomendado

### Para desarrollo diario:

```batch
dev-start.bat
```

### Para desarrollo con opciones personalizadas:

```powershell
.\dev-start.ps1 -SkipInstall
```

### Para producción o debugging avanzado:

```powershell
.\start-project.ps1
```

## 🚨 Solución de Problemas

### Error: "Node.js no está instalado"

1. Descarga Node.js desde: https://nodejs.org/
2. Instala la versión LTS
3. Reinicia la terminal

### Error: "npm no está instalado"

- npm viene incluido con Node.js
- Verifica la instalación: `npm --version`

### Error: "Puerto ya en uso"

1. Cierra todas las ventanas de Node.js/terminal
2. Ejecuta: `taskkill /f /im node.exe`
3. Vuelve a ejecutar el script

### Los servicios no se detienen

```batch
# Forzar cierre de procesos Node.js
taskkill /f /im node.exe
```

### PowerShell: "Execution policy"

```powershell
# Permitir ejecución temporal
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📁 Estructura del Proyecto

```
Ford_Manage_Inventory/
├── backend/           # API del servidor (Puerto 3000)
├── frontend/          # Aplicación React (Puerto 5173)
├── dev-start.bat      # ⭐ Script recomendado
├── dev-start.ps1      # Script PowerShell con opciones
├── start-project.bat  # Script básico compatible
└── start-project.ps1  # Script avanzado con monitoreo
```

## 🎨 Características

- ✅ **Instalación automática** de dependencias
- ✅ **Inicio simultáneo** de frontend y backend
- ✅ **Apertura automática** del navegador
- ✅ **Detección de errores** en la instalación
- ✅ **Múltiples opciones** según necesidades
- ✅ **Compatible** con Windows PowerShell y CMD

---

**¡Listo para desarrollar! 🎉**

Ejecuta cualquiera de los scripts y comienza a trabajar en tu proyecto Ford Manage Inventory.
