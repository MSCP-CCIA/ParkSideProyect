import easyocr

def characterExtraction(image: str):
    # Cargar el modelo OCR
    reader = easyocr.Reader(['en'])  # Idioma inglés (para números y letras estándar)

    # Extraer texto de la placa recortada
    text_result = reader.readtext(image)
    bbox, text, confidence = text_result[0]
    print(text)
    print(text_result)
    return text
characterExtraction(r'C:\Users\Asus\Downloads\placas-patentes-motos-colombia.jpg')