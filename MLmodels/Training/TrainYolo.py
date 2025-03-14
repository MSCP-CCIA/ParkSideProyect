from ultralytics import YOLO
model = YOLO('../Models/Charcter-LP.pt')  # Load your trained model
model.train(data="../Data/plate_detection_colombia-1/data.yaml", epochs=100, imgsz=640)
model.export(format='onnx', dynamic=True, opset=12)