package com.be.A3DE190299_SE19B04_be.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "RoomInformation")
public class RoomInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomID;
    private String roomNumber;
    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    @ManyToOne
    @JoinColumn(name = "RoomTypeID")
    private RoomType roomType;
    private Byte roomStatus;
    private BigDecimal roomPricePerDay;

    public RoomInformation() {}

    public Integer getRoomID() { return roomID; }
    public void setRoomID(Integer roomID) { this.roomID = roomID; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getRoomDetailDescription() { return roomDetailDescription; }
    public void setRoomDetailDescription(String roomDetailDescription) { this.roomDetailDescription = roomDetailDescription; }
    public Integer getRoomMaxCapacity() { return roomMaxCapacity; }
    public void setRoomMaxCapacity(Integer roomMaxCapacity) { this.roomMaxCapacity = roomMaxCapacity; }
    public RoomType getRoomType() { return roomType; }
    public void setRoomType(RoomType roomType) { this.roomType = roomType; }
    public Byte getRoomStatus() { return roomStatus; }
    public void setRoomStatus(Byte roomStatus) { this.roomStatus = roomStatus; }
    public BigDecimal getRoomPricePerDay() { return roomPricePerDay; }
    public void setRoomPricePerDay(BigDecimal roomPricePerDay) { this.roomPricePerDay = roomPricePerDay; }
}
