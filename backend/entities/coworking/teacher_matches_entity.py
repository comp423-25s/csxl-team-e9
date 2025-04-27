from sqlalchemy import Integer, PrimaryKeyConstraint, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.coworking.gittogether import TeacherPairing
from ..entity_base import EntityBase
from typing import Self


class TeacherMatchEntity(EntityBase):
    __tablename__ = "teacher_matches"

    pid_one: Mapped[int] = mapped_column(Integer)
    pid_two: Mapped[int] = mapped_column(Integer)
    course: Mapped[String] = mapped_column(String(16))
    __table_args__ = (PrimaryKeyConstraint("pid_one", "course"),)

    @classmethod
    def from_model(cls, model: TeacherPairing) -> Self:

        return cls(
            pid_one=model.pidOne,
            pid_two=model.pidTwo,
            course=model.clas,
        )

    def to_model(self) -> TeacherPairing:

        return TeacherPairing(
            pidOne=self.pid_one,
            pidTwo=self.pid_two,
            clas=self.course,
        )

    def update(self, model: TeacherPairing):
        self.pid_one = model.pidOne
        self.pid_two = model.pidTwo
        self.course = model.clas
