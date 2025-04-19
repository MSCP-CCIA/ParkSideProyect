import easyocr
from MLmodels.Utils.ocr_prepocessor import OCR_Preprocess
def characterExtraction(image: str):
    clean_img= OCR_Preprocess(image)
    reader = easyocr.Reader(['en'])
    text_result = reader.readtext(clean_img)
    if text_result:
        bbox, text, confidence = text_result[0]
        if confidence > 0.3:
            return text
        else:
            print("Plate Text Wasn't Recognized")
            return None
    else:
        print('No text found')
        return None
