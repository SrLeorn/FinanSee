@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8080
  py -m http.server 8080
  exit /b
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8080
  python -m http.server 8080
  exit /b
)
echo Python nao foi encontrado no PATH.
echo Voce ainda pode publicar a pasta diretamente no GitHub Pages para testar o PWA por HTTPS.
pause
