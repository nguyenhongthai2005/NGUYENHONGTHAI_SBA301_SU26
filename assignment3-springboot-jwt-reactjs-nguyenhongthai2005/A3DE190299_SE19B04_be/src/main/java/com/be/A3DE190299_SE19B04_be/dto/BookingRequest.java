package com.be.A3DE190299_SE19B04_be.dto;

import java.util.List;

public class BookingRequest {
    private Integer customerId;
    private List<Integer> roomIds;

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public List<Integer> getRoomIds() { return roomIds; }
    public void setRoomIds(List<Integer> roomIds) { this.roomIds = roomIds; }
}
