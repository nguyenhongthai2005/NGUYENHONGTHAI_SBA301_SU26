package com.be.A3DE190299_SE19B04_be.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "BookingReservation")
public class BookingReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingReservationID;
    private LocalDate bookingDate;
    private BigDecimal totalPrice;
    @ManyToOne
    @JoinColumn(name = "CustomerID")
    private Customer customer;
    private Byte bookingStatus;

    public BookingReservation() {}

    public Integer getBookingReservationID() { return bookingReservationID; }
    public void setBookingReservationID(Integer bookingReservationID) { this.bookingReservationID = bookingReservationID; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Byte getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(Byte bookingStatus) { this.bookingStatus = bookingStatus; }
}
