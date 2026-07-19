package com.be.A3DE190299_SE19B04_be.controller;

import com.be.A3DE190299_SE19B04_be.entity.RoomInformation;
import com.be.A3DE190299_SE19B04_be.repository.RoomInformationRepository;
import com.be.A3DE190299_SE19B04_be.repository.BookingDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomInformationRepository roomRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @GetMapping
    public List<RoomInformation> getAllRooms() {
        return roomRepository.findAll();
    }

    @PostMapping
    public RoomInformation createRoom(@RequestBody RoomInformation room) {
        return roomRepository.save(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomInformation> updateRoom(@PathVariable Integer id, @RequestBody RoomInformation details) {
        return roomRepository.findById(id).map(room -> {
            room.setRoomNumber(details.getRoomNumber());
            room.setRoomDetailDescription(details.getRoomDetailDescription());
            room.setRoomMaxCapacity(details.getRoomMaxCapacity());
            room.setRoomStatus(details.getRoomStatus());
            room.setRoomPricePerDay(details.getRoomPricePerDay());
            room.setRoomType(details.getRoomType());
            return ResponseEntity.ok(roomRepository.save(room));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Integer id) {
        return roomRepository.findById(id).map(room -> {
            boolean hasBooking = !bookingDetailRepository.findByRoomInformationRoomID(id).isEmpty();
            if (hasBooking) {
                room.setRoomStatus((byte) 0);
                roomRepository.save(room);
            } else {
                roomRepository.delete(room);
            }
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
