# Ford Manage Inventory - Script de desarrollo simple
param(
    [switch]$SkipInstall,
    [switch]$SkipBrowser
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Ford Manage Inventory - Modo Desarrollo" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio del proyecto
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

# Instalar dependencias si no se especifica lo contrario
if (-not $SkipInstall) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    
    # Backend
    Write-Host "   Backend..." -ForegroundColor Gray
    Set-Location "backend"
    npm install --silent
    
    # Frontend
    Write-Host "   Frontend..." -ForegroundColor Gray
    Set-Location "..\frontend"
    npm install --silent
    
    Set-Location ".."
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Iniciando servicios..." -ForegroundColor Yellow

# Crear archivos de log
New-Item -ItemType File -Path "backend.log" -Force | Out-Null
New-Item -ItemType File -Path "frontend.log" -Force | Out-Null

# Iniciar backend
Write-Host "   Backend (puerto 3000)..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectRoot\backend'; npm run dev" -WindowStyle Minimized

# Esperar un poco
Start-Sleep -Seconds 2

# Iniciar frontend
Write-Host "   Frontend (puerto 5173)..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectRoot\frontend'; npm run dev" -WindowStyle Minimized

# Esperar que los servicios inicien
Start-Sleep -Seconds 3

if (-not $SkipBrowser) {
    Write-Host "🌐 Abriendo navegador..." -ForegroundColor Magenta
    Start-Process "http://localhost:5173"
}

Write-Host ""
Write-Host "✅ Proyecto iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "URLs:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Para detener los servicios, cierra las ventanas de PowerShell que se abrieron." -ForegroundColor Gray
