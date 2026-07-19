package com.be.A3DE190299_SE19B04_be.repository;

import com.be.A3DE190299_SE19B04_be.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingReservationRepository extends JpaRepository<BookingReservation, Integer> {
    List<BookingReservation> findByCustomerCustomerID(Integer customerId);
}
