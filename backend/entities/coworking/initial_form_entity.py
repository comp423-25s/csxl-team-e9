from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship, Session

from backend.models.coworking.gittogether import InitialForm
from ..entity_base import EntityBase
from typing import Self


class InitialFormEnity(EntityBase):
    __tablename__ = "initialform"

    one: Mapped[int] = mapped_column(Integer)
    two: Mapped[int] = mapped_column(Integer)
    three: Mapped[int] = mapped_column(Integer)
    four: Mapped[int] = mapped_column(Integer)
    five: Mapped[int] = mapped_column(Integer)
    pid: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    @classmethod
    def from_model(cls, model: InitialForm) -> Self:

        return cls(
            one=model.one,
            two=model.two,
            three=model.three,
            four=model.four,
            five=model.five,
            pid=model.pid,
        )

    @classmethod
    def to_model(self) -> InitialForm:

        return InitialForm(
            one=self.one, two=self.two, three=self.three, four=self.four, five=self.five
        )
