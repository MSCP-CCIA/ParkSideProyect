from app.Inference.CharacterExtraction import characterExtraction
from app.Inference.PlateDetection import DetectPlate
import re
import os

def Service(img: str):
    route = DetectPlate(img)
    raw_plate = characterExtraction(route)
    os.remove(route)
    if raw_plate:
        cleaned = re.sub(r'[^A-Za-z0-9]', '', raw_plate).upper()

        if re.fullmatch(r'[A-Z]{3}\d{3}', cleaned):
            return cleaned

        if re.fullmatch(r'[A-Z]{3}\d{2}[A-Z]', cleaned):
            return cleaned

        letters = ''.join(filter(str.isalpha, cleaned))
        numbers = ''.join(filter(str.isdigit, cleaned))

        if len(letters) >= 3 and len(numbers) >= 3:
            plate = letters[:3] + numbers[:3]
            if re.fullmatch(r'[A-Z]{3}\d{3}', plate):
                return plate

        if len(letters) >= 4 and len(numbers) >= 2:
            plate = letters[:3] + numbers[:2] + letters[3]
            if re.fullmatch(r'[A-Z]{3}\d{2}[A-Z]', plate):
                return plate
    return None
