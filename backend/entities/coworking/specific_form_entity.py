from sqlalchemy import Integer, PrimaryKeyConstraint, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.coworking.gittogether import FormResponse
from ..entity_base import EntityBase
from typing import Self


class SpecificFormEntity(EntityBase):
    __tablename__ = "specificform"

    value: Mapped[String] = mapped_column(String(1000))
    pid: Mapped[int] = mapped_column(Integer)
    contact_information: Mapped[String] = mapped_column(String(64))
    clas: Mapped[String] = mapped_column(String(16))
    first_name: Mapped[String] = mapped_column(String(16))

    __table_args__ = (PrimaryKeyConstraint("pid", "clas"),)

    @classmethod
    def from_model(cls, model: FormResponse) -> Self:

        return cls(
            value=model.value,
            pid=model.pid,
            contact_information=model.contact_info,
            clas=model.clas,
            first_name=model.first_name,
        )

    def to_model(self) -> FormResponse:

        return FormResponse(
            value=self.value,
            pid=self.pid,
            contact_info=self.contact_information,
            clas=self.clas,
            first_name=self.first_name,
        )

    def update(self, model: FormResponse) -> FormResponse:
        self.value = model.value
        self.pid = model.pid
        self.contact_information = model.contact_info
        self.clas = model.clas
        self.first_name = model.first_name
