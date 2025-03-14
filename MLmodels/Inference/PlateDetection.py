from ultralytics import YOLO
import cv2
import matplotlib.pyplot as plt
import json

def DetectPlate(route : str):
    model = YOLO('../Models/plateDetection.onnx')
    image = cv2.imread(route)
    # Realizar inferencia
    results = model(image)

    # Procesar resultados
    plate_images = []  # Lista para guardar las imágenes recortadas de placas
    plate_data = []  # Lista para guardar la info de detección

    for result in results:
        boxes = result.boxes.cpu().numpy()  # Obtener bounding boxes

        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Coordenadas de la placa
            conf = box.conf[0]  # Confianza de la detección

            # Recortar la región de la placa
            plate_roi = image[y1:y2, x1:x2]

            # Guardar información
            plate_images.append(plate_roi)
            plate_data.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2, "conf": float(conf)})

    # Mostrar la placa detectada (solo si hay detecciones)
    if plate_images:
        cv2.imshow("Placa Detectada", plate_images[0])  # Mostrar la primera placa
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # Guardar la primera placa detectada (para pruebas)
    if plate_images:
        cv2.imwrite("placa_detectada.jpg", plate_images[0])

    # Guardar en un JSON para pasarlo a OCR
    import json
    with open("deteccion_placa.json", "w") as f:
        json.dump(plate_data, f)
