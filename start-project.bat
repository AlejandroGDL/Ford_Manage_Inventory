@echo off
echo Iniciando Ford Manage Inventory...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js no está instalado o no está en el PATH
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm no está instalado o no está en el PATH
    pause
    exit /b 1
)

echo Instalando dependencias del backend...
cd backend
if not exist node_modules (
    npm install
    if %errorlevel% neq 0 (
        echo Error al instalar dependencias del backend
        pause
        exit /b 1
    )
)

echo.
echo Instalando dependencias del frontend...
cd ..\frontend
if not exist node_modules (
    npm install
    if %errorlevel% neq 0 (
        echo Error al instalar dependencias del frontend
        pause
        exit /b 1
    )
)

echo.
echo Iniciando servicios...
cd ..

REM Crear archivo temporal para manejar procesos
echo. > temp_pids.txt

REM Iniciar backend en segundo plano
echo Iniciando backend en puerto 3000...
start /b cmd /c "cd backend && npm run dev > ../backend.log 2>&1"

REM Esperar un poco para que el backend inicie
timeout /t 3 /nobreak >nul

REM Iniciar frontend en segundo plano
echo Iniciando frontend en puerto 5173...
start /b cmd /c "cd frontend && npm run dev > ../frontend.log 2>&1"

REM Esperar un poco para que el frontend inicie
timeout /t 5 /nobreak >nul

REM Abrir navegador
echo Abriendo navegador...
start http://localhost:5173

echo.
echo ========================================
echo   Ford Manage Inventory iniciado!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener los servicios
echo.

REM Mantener la ventana abierta
pause
