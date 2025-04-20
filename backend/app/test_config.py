# script_de_prueba.py (en la raíz del proyecto)
import os

# Cambiar el directorio de trabajo a la carpeta 'core'
os.chdir("core")  # Ajusta la ruta si tu carpeta 'core' está en otra ubicación

from app.core.config import settings

# Ahora puedes usar 'settings'
print(f"Nombre del proyecto: {settings}")

# Opcional: Volver al directorio raíz después de la prueba
os.chdir("..")
os.chdir("..")