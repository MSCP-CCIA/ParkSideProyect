from ultralytics import YOLO
model = YOLO('../Models/best.onnx', task='detect')
