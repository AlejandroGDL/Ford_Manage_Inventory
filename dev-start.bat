REM Script simple para desarrollo - Ford Manage Inventory
@echo off
title Ford Manage Inventory - Launcher

echo.
echo =====================================
echo   Ford Manage Inventory - Dev Mode
echo =====================================
echo.

echo Instalando dependencias...
cd backend
call npm install
cd ..\frontend  
call npm install
cd ..

echo.
echo Iniciando servicios...
echo.

REM Iniciar backend
echo Iniciando backend...
start "Backend - Puerto 3000" cmd /k "cd backend && npm run dev"

REM Esperar un poco
timeout /t 2 /nobreak >nul

REM Iniciar frontend
echo Iniciando frontend...
start "Frontend - Puerto 5173" cmd /k "cd frontend && npm run dev"

REM Esperar que inicien los servicios
timeout /t 5 /nobreak >nul

REM Abrir navegador
echo Abriendo navegador...
start http://localhost:5173

echo.
echo ========================================
echo   Proyecto iniciado correctamente!
echo ========================================
echo.
echo URLs disponibles:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo.
echo Para detener los servicios, cierra las ventanas que se abrieron.
echo.
pause
