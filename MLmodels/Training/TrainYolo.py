
from ultralytics import YOLO
import torch # Importa torch para verificar

def run_training():

    # Verificar si CUDA está disponible ANTES de entrenar
    if torch.cuda.is_available():
        print(f"GPU disponible: {torch.cuda.get_device_name(0)}")
        device_to_use = 0  # Usa la primera GPU (índice 0)
        # Alternativamente: device_to_use = 'cuda' o 'cuda:0'
    else:
        print("GPU no disponible, entrenando en CPU.")
        device_to_use = 'cpu'
    model = YOLO()  # Load your trained model
    model.train(data="../Data/plate_detection_colombia-1/data.yaml", epochs=150, imgsz=800,device=device_to_use)
    model.export(format='onnx',dynamic=True,opset=12)
# --- Bloque de protección OBLIGATORIO para multiprocessing en Windows ---
if __name__ == '__main__':

    run_training()