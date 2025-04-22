from ultralytics import YOLO
model = YOLO(r'C:\Users\Asus\PycharmProjects\ParkSideProyect\MLmodels\Models\best.onnx', task='detect')
