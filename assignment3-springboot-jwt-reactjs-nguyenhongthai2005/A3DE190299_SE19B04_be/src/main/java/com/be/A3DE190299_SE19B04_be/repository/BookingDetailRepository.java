package com.be.A3DE190299_SE19B04_be.repository;

import com.be.A3DE190299_SE19B04_be.entity.BookingDetail;
import com.be.A3DE190299_SE19B04_be.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {
    List<BookingDetail> findByRoomInformationRoomID(Integer roomId);
    List<BookingDetail> findByBookingReservationBookingReservationID(Integer bookingId);
}
