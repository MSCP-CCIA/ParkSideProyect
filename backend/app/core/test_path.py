# Abrir el archivo en modo lectura
with open('../../../.env', 'r') as archivo:
    contenido = archivo.read()
    print(contenido)
