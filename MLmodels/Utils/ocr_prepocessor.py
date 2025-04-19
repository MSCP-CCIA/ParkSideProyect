import cv2
import numpy as np
def OCR_Preprocess(image_path: str) -> np.ndarray:
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    denoised = cv2.bilateralFilter(img, d=9, sigmaColor=75, sigmaSpace=75)
    std_dev = np.std(img)
    if std_dev < 59:
        contrasted = cv2.equalizeHist(denoised)
        return contrasted
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    contrast_enhanced = clahe.apply(denoised)
    return  contrast_enhanced
