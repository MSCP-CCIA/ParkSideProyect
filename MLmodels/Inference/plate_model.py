from ultralytics import YOLO
import os
from ultralytics import YOLO

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'models', 'best.onnx')

model = YOLO(MODEL_PATH, task='detect')


