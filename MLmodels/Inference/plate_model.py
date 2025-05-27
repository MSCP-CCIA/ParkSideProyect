import os
from ultralytics import YOLO

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'Models', 'best.onnx')

model = YOLO(MODEL_PATH, task='detect')


