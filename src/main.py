from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from .sim import Simulation
from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError, PyJWTError
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

secret_key = "wh219hfeqklvh0i17y3opikrgn"

app = FastAPI()

# OAuth2PasswordBearer is a class for handling JWT tokens in the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = [
    "http://localhost",
    "http://localhost:8000",
    "https://trajweb.moonstripe.com",
    "https://moonstripe-traj-frontend.deno.dev/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def hello_world():
    return {"hello": "world"}

@app.get("/api/sim_parameters")
async def request_sim_params(
    fuel_masses: Annotated[list[float], Query()], 
    dry_masses: Annotated[list[float], Query()], 
    ISPs: Annotated[list[float], Query()],
    thrusts: Annotated[list[float], Query()],
    payload: float,
    missile_diameter: float,
    nozzle_area: float,
    nosecone: str,
    length_div_diameter: float,
    reentry_diameter: float,
    estimated_range: float,
    burnout_angle: float
    ):

    new_sim = Simulation()
    new_sim.numstages = len(fuel_masses)
    for stage in range(0, new_sim.numstages):
        new_sim.fuelmass.append(fuel_masses[stage])
        dry_mass = dry_masses[stage]
        new_sim.m0.append(dry_mass + fuel_masses[stage])
        new_sim.fuelfraction.append(new_sim.fuelmass[stage]/new_sim.m0[stage])
        new_sim.Isp0.append(ISPs[stage])
        new_sim.thrust0.append(thrusts[stage]*9.81)
        new_sim.dMdt.append(new_sim.thrust0[stage]/(new_sim.Isp0[stage]*9.81))
    new_sim.payload = payload
    new_sim.missilediam = missile_diameter
    new_sim.nozzlearea = nozzle_area
    new_sim.Nosecone = nosecone
    new_sim.LdivD = length_div_diameter
    new_sim.rvdiam = reentry_diameter
    new_sim.est_range = estimated_range
    new_sim.burnout_angle = burnout_angle

    results = new_sim.integrate("Minimum Energy")


    return {
        "results": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)