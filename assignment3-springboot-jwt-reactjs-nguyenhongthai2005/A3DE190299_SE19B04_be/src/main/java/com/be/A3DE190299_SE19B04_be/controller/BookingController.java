package com.be.A3DE190299_SE19B04_be.controller;

import com.be.A3DE190299_SE19B04_be.entity.*;
import com.be.A3DE190299_SE19B04_be.repository.*;
import com.be.A3DE190299_SE19B04_be.dto.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingReservationRepository bookingRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private RoomInformationRepository roomRepository;

    @GetMapping
    public List<BookingReservation> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public List<BookingReservation> getBookingsByCustomer(@PathVariable Integer customerId) {
        return bookingRepository.findByCustomerCustomerID(customerId);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        if (customer == null) return ResponseEntity.badRequest().body("Customer not found");

        BookingReservation booking = new BookingReservation();
        booking.setCustomer(customer);
        booking.setBookingDate(LocalDate.now());
        booking.setBookingStatus((byte) 1);
        BigDecimal total = BigDecimal.ZERO;
        
        booking = bookingRepository.save(booking);

        for(Integer roomId : request.getRoomIds()){
            RoomInformation room = roomRepository.findById(roomId).orElse(null);
            if(room != null){
                BookingDetail detail = new BookingDetail();
                detail.setBookingReservation(booking);
                detail.setRoomInformation(room);
                detail.setStartDate(LocalDate.now());
                detail.setEndDate(LocalDate.now().plusDays(1));
                detail.setActualPrice(room.getRoomPricePerDay());
                bookingDetailRepository.save(detail);
                total = total.add(room.getRoomPricePerDay());
            }
        }
        booking.setTotalPrice(total);
        return ResponseEntity.ok(bookingRepository.save(booking));
    }
}
