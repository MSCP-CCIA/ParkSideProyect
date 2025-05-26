from fastapi import APIRouter
from app.crud.parkingCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/parking", tags=["parkingManage"])

# ------------------------- Employee Actions ------------------------- #

@router.post("/get-parking", response_model=SearchParkingResponse)
def get_vehicle(session: SessionDep, json: SearchParkingRequest) -> SearchParkingResponse:
    try:
        parking = get_parking(session=session, json=json)
        if not parking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parqueadero no encontrado"
            )
        return SearchParkingResponse(
            name=parking.name,
            address=parking.address,
            enterprise=parking.enterprise,
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar el parqueadero"
        )