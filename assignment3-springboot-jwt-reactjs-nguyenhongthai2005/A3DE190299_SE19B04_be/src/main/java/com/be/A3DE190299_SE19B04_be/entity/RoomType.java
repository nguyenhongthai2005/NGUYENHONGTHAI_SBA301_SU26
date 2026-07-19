package com.be.A3DE190299_SE19B04_be.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "RoomType")
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomTypeID;
    private String roomTypeName;
    private String typeDescription;
    private String typeNote;

    public RoomType() {}

    public Integer getRoomTypeID() { return roomTypeID; }
    public void setRoomTypeID(Integer roomTypeID) { this.roomTypeID = roomTypeID; }
    public String getRoomTypeName() { return roomTypeName; }
    public void setRoomTypeName(String roomTypeName) { this.roomTypeName = roomTypeName; }
    public String getTypeDescription() { return typeDescription; }
    public void setTypeDescription(String typeDescription) { this.typeDescription = typeDescription; }
    public String getTypeNote() { return typeNote; }
    public void setTypeNote(String typeNote) { this.typeNote = typeNote; }
}
