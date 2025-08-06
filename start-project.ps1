# Ford Manage Inventory - Script de inicio
# Este script inicia tanto el backend como el frontend del proyecto

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   Ford Manage Inventory Launcher    " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Función para verificar si un comando existe
function Test-Command($Command) {
    try {
        Get-Command $Command -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Verificar prerequisitos
Write-Host "Verificando prerequisitos..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Error: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ Error: npm no está instalado o no está en el PATH" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "✅ Node.js y npm están instalados" -ForegroundColor Green

# Obtener la ruta del directorio del script
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# Instalar dependencias del backend
Write-Host ""
Write-Host "📦 Verificando dependencias del backend..." -ForegroundColor Yellow
Set-Location "backend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias del backend..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias del backend" -ForegroundColor Red
        Read-Host "Presiona Enter para salir"
        exit 1
    }
} else {
    Write-Host "✅ Dependencias del backend ya están instaladas" -ForegroundColor Green
}

# Instalar dependencias del frontend
Set-Location ".."
Write-Host ""
Write-Host "📦 Verificando dependencias del frontend..." -ForegroundColor Yellow
Set-Location "frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias del frontend..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias del frontend" -ForegroundColor Red
        Read-Host "Presiona Enter para salir"
        exit 1
    }
} else {
    Write-Host "✅ Dependencias del frontend ya están instaladas" -ForegroundColor Green
}

Set-Location ".."

# Función para limpiar procesos al salir
function Stop-Services {
    Write-Host ""
    Write-Host "🛑 Deteniendo servicios..." -ForegroundColor Yellow
    
    # Detener procesos de Node.js que estén usando los puertos
    $backendProcesses = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue }
    $frontendProcesses = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | ForEach-Object { Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue }
    
    $backendProcesses + $frontendProcesses | Where-Object { $_.ProcessName -eq "node" } | ForEach-Object {
        Write-Host "Deteniendo proceso: $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Yellow
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}

# Registrar el manejador de salida
Register-EngineEvent PowerShell.Exiting -Action { Stop-Services }

# Manejar Ctrl+C
[Console]::CancelKeyPress += {
    param($sender, $e)
    $e.Cancel = $true
    Stop-Services
    exit 0
}

try {
    Write-Host ""
    Write-Host "🚀 Iniciando servicios..." -ForegroundColor Green
    Write-Host ""

    # Iniciar backend
    Write-Host "🔧 Iniciando backend en puerto 3000..." -ForegroundColor Cyan
    $backendJob = Start-Job -ScriptBlock {
        param($path)
        Set-Location "$path\backend"
        npm run dev
    } -ArgumentList $ScriptDir

    # Esperar un poco para que el backend inicie
    Start-Sleep -Seconds 3

    # Iniciar frontend
    Write-Host "🎨 Iniciando frontend en puerto 5173..." -ForegroundColor Cyan
    $frontendJob = Start-Job -ScriptBlock {
        param($path)
        Set-Location "$path\frontend"
        npm run dev
    } -ArgumentList $ScriptDir

    # Esperar un poco más para que ambos servicios inicien
    Start-Sleep -Seconds 5

    # Abrir navegador
    Write-Host "🌐 Abriendo navegador..." -ForegroundColor Magenta
    Start-Process "http://localhost:5173"

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   🎉 Ford Manage Inventory iniciado!   " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 URLs disponibles:" -ForegroundColor Yellow
    Write-Host "   Backend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 Logs:" -ForegroundColor Yellow
    Write-Host "   Para ver los logs del backend: Get-Job | Where-Object Name -like '*backend*' | Receive-Job -Keep" -ForegroundColor Gray
    Write-Host "   Para ver los logs del frontend: Get-Job | Where-Object Name -like '*frontend*' | Receive-Job -Keep" -ForegroundColor Gray
    Write-Host ""
    Write-Host "⚠️  Presiona Ctrl+C para detener todos los servicios" -ForegroundColor Red
    Write-Host ""

    # Mantener el script ejecutándose y mostrar logs
    while ($true) {
        # Mostrar logs del backend si hay nuevos
        $backendOutput = Receive-Job -Job $backendJob -Keep
        if ($backendOutput) {
            Write-Host "[BACKEND] $backendOutput" -ForegroundColor Blue
        }

        # Mostrar logs del frontend si hay nuevos
        $frontendOutput = Receive-Job -Job $frontendJob -Keep
        if ($frontendOutput) {
            Write-Host "[FRONTEND] $frontendOutput" -ForegroundColor Magenta
        }

        Start-Sleep -Seconds 1
    }
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    # Limpiar trabajos
    if ($backendJob) { Stop-Job -Job $backendJob -ErrorAction SilentlyContinue; Remove-Job -Job $backendJob -ErrorAction SilentlyContinue }
    if ($frontendJob) { Stop-Job -Job $frontendJob -ErrorAction SilentlyContinue; Remove-Job -Job $frontendJob -ErrorAction SilentlyContinue }
    Stop-Services
}
