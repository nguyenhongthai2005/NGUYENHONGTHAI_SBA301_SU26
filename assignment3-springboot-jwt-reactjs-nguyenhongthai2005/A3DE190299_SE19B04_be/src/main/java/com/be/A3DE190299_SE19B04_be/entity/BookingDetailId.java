package com.be.A3DE190299_SE19B04_be.entity;

import java.io.Serializable;
import java.util.Objects;

public class BookingDetailId implements Serializable {
    private Integer bookingReservation;
    private Integer roomInformation;

    public BookingDetailId() {}

    public BookingDetailId(Integer bookingReservation, Integer roomInformation) {
        this.bookingReservation = bookingReservation;
        this.roomInformation = roomInformation;
    }

    public Integer getBookingReservation() { return bookingReservation; }
    public void setBookingReservation(Integer bookingReservation) { this.bookingReservation = bookingReservation; }
    public Integer getRoomInformation() { return roomInformation; }
    public void setRoomInformation(Integer roomInformation) { this.roomInformation = roomInformation; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingDetailId that = (BookingDetailId) o;
        return Objects.equals(bookingReservation, that.bookingReservation) &&
               Objects.equals(roomInformation, that.roomInformation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingReservation, roomInformation);
    }
}
