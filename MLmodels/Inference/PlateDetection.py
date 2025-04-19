import cv2
from MLmodels.Inference.plate_model import model

def DetectPlate(route : str):
    image = cv2.imread(route)
    results = model(image,imgsz=800)
    plate_images = []
    for result in results:
        boxes = result.boxes.cpu().numpy()
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            plate_roi = image[y1:y2, x1:x2]
            plate_images.append(plate_roi)
    ruta = 'temp_detected_plate.jpg'
    if plate_images:
        cv2.imwrite(ruta, plate_images[0])
    return ruta
