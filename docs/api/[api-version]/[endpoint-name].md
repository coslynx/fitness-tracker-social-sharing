from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from .. import database
from ..schemas import Goal
from ..models import Goal

router = APIRouter(
    prefix="/api/v1/goals",
    tags=["goals"],
)

@router.get("/", response_model=List[Goal])
async def get_all_goals(db: Session = Depends(database.get_db)):
    all_goals = db.query(Goal.model).all()
    return all_goals

@router.post("/", response_model=Goal)
async def create_goal(
    db: Session = Depends(database.get_db),
    goal_data: Goal = Depends(),
):
    new_goal = Goal.model(**goal_data.dict())
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

@router.put("/{id}", response_model=Goal)
async def update_goal(
    id: int,
    db: Session = Depends(database.get_db),
    goal_data: Goal = Depends(),
):
    goal_to_update = db.query(Goal.model).filter(Goal.model.id == id).first()
    if goal_to_update:
        goal_to_update.update(**goal_data.dict())
        db.commit()
        db.refresh(goal_to_update)
        return goal_to_update
    else:
        raise HTTPException(status_code=404, detail="Goal not found")

@router.delete("/{id}", response_model=JSONResponse)
async def delete_goal(id: int, db: Session = Depends(database.get_db)):
    goal_to_delete = db.query(Goal.model).filter(Goal.model.id == id).first()
    if goal_to_delete:
        db.delete(goal_to_delete)
        db.commit()
        return JSONResponse(content={"message": "Goal successfully deleted"}, status_code=204)
    else:
        raise HTTPException(status_code=404, detail="Goal not found")