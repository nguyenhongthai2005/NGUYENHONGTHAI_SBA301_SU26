package com.be.A3DE190299_SE19B04_be.config;

import com.be.A3DE190299_SE19B04_be.entity.RoomInformation;
import com.be.A3DE190299_SE19B04_be.entity.RoomType;
import com.be.A3DE190299_SE19B04_be.repository.RoomInformationRepository;
import com.be.A3DE190299_SE19B04_be.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInit {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomInformationRepository roomInformationRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (roomTypeRepository.count() == 0) {
                RoomType type1 = new RoomType();
                type1.setRoomTypeName("Standard");
                type1.setTypeDescription("Basic room with standard amenities");
                type1.setTypeNote("No view");
                roomTypeRepository.save(type1);

                RoomType type2 = new RoomType();
                type2.setRoomTypeName("VIP");
                type2.setTypeDescription("Luxury room with great view");
                type2.setTypeNote("Free breakfast");
                roomTypeRepository.save(type2);

                RoomInformation room1 = new RoomInformation();
                room1.setRoomNumber("101");
                room1.setRoomDetailDescription("Standard room on 1st floor");
                room1.setRoomMaxCapacity(2);
                room1.setRoomType(type1);
                room1.setRoomStatus((byte) 1);
                room1.setRoomPricePerDay(new BigDecimal("50.00"));
                roomInformationRepository.save(room1);

                RoomInformation room2 = new RoomInformation();
                room2.setRoomNumber("201");
                room2.setRoomDetailDescription("VIP room on 2nd floor");
                room2.setRoomMaxCapacity(4);
                room2.setRoomType(type2);
                room2.setRoomStatus((byte) 1);
                room2.setRoomPricePerDay(new BigDecimal("150.00"));
                roomInformationRepository.save(room2);
            }
        };
    }
}
