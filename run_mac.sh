#!/usr/bin/env bash
set -e

# ==============================================================================
# TALLER-27 BORDADOS - Script de Ejecución para macOS
# ==============================================================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=========================================================="
echo "    TALLER-27 BORDADOS | SISTEMA TEXTIL POS & PRODUCCIÓN   "
echo "    Lenguaje: C++17 (Clang macOS)                         "
echo "    Base de Datos: PostgreSQL                              "
echo "=========================================================="

# 1. Compilar si no existen los binarios
if [ ! -f "bin/Taller27" ]; then
    echo "[Build] Compilando aplicación nativa de macOS con clang++..."
    make
fi

# 2. Instrucciones para PostgreSQL si el usuario desea sincronizar
if command -v psql &> /dev/null; then
    echo "[PostgreSQL] Cliente 'psql' detectado."
    echo "[PostgreSQL] Para importar la base de datos oficial ejecuta:"
    echo "    createdb taller27 2>/dev/null || true"
    echo "    psql -d taller27 -f schema.sql"
    echo "    psql -d taller27 -f seed.sql"
else
    echo "[PostgreSQL] Nota: 'psql' no detectado en PATH actual."
    echo "[PostgreSQL] La aplicación C++ iniciará con el motor de respaldo sincronizado."
    echo "[PostgreSQL] Para instalar PostgreSQL nativo en Mac: 'brew install postgresql@16 libpq'"
fi

echo ""
echo "[Lanzador] Cerrando instancias previas si existen..."
pkill -f bin/Taller27 2>/dev/null || true
sleep 0.5

echo "[Lanzador] Iniciando aplicación nativa de Mac..."
./bin/Taller27
