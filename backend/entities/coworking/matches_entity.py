from sqlalchemy import Integer, PrimaryKeyConstraint, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.coworking.gittogether import InitialForm, Pairing
from ..entity_base import EntityBase
from typing import Self


class MatchEntity(EntityBase):
    __tablename__ = "matches"

    pid_one: Mapped[int] = mapped_column(Integer)
    pid_two: Mapped[int] = mapped_column(Integer)
    course: Mapped[String] = mapped_column(String(16))
    __table_args__ = (
        PrimaryKeyConstraint(
            "pid_one",
            "course",
            "pid_two",
        ),
    )

    @classmethod
    def from_model(cls, model: Pairing) -> Self:

        return cls(
            pid_one=model.pidOne,
            pid_two=model.pidTwo,
            course=model.clas,
        )

    def to_model(self) -> Pairing:

        return Pairing(
            pidOne=self.pid_one,
            pidTwo=self.pid_two,
            clas=self.course,
        )

    def update(self, model: Pairing):
        self.pid_one = model.pidOne
        self.pid_two = model.pidTwo
        self.course = model.clas
