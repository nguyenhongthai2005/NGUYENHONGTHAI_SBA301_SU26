package com.be.A3DE190299_SE19B04_be.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "BookingDetail")
@IdClass(BookingDetailId.class)
public class BookingDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "BookingReservationID")
    private BookingReservation bookingReservation;

    @Id
    @ManyToOne
    @JoinColumn(name = "RoomID")
    private RoomInformation roomInformation;

    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal actualPrice;

    public BookingDetail() {}

    public BookingReservation getBookingReservation() { return bookingReservation; }
    public void setBookingReservation(BookingReservation bookingReservation) { this.bookingReservation = bookingReservation; }
    public RoomInformation getRoomInformation() { return roomInformation; }
    public void setRoomInformation(RoomInformation roomInformation) { this.roomInformation = roomInformation; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public BigDecimal getActualPrice() { return actualPrice; }
    public void setActualPrice(BigDecimal actualPrice) { this.actualPrice = actualPrice; }
}
