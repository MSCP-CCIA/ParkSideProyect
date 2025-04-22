import requests

def simulate_vehicle_entry(image_path: str):
    url = "http://127.0.0.1:8000/extract-plate"
    with open(image_path, "rb") as img:
        files = {'file': (image_path, img, 'image/jpeg')}
        response = requests.post(url, files=files)
    if response.status_code == 200:
        print("Placa detectada:", response.json()["plate"])
    elif response.status_code == 422:
        print("No se reconoció la placa. Enviando alerta a /admin...")
    else:
        print("Error:", response.text)

if __name__ == "__main__":
    simulate_vehicle_entry(r"C:\Users\Asus\Downloads\placas-patentes-motos-colombia-1.jpg")
