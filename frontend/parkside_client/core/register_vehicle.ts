import {CreateVehicleRequest} from "../models/vehicle_models";
import axios, {AxiosResponse} from "axios";

export const registerVehicle = async (
  requestData: CreateVehicleRequest
): Promise<AxiosResponse> => {
  try {
      return await axios.post(
        'http://127.0.0.1:8000/api/v1/vehicle/register-vehicle/',
        requestData
    );
  } catch (error: any) {
    console.error('Error al registrar el vehículo en la API:', error);
    throw error;
  }
};