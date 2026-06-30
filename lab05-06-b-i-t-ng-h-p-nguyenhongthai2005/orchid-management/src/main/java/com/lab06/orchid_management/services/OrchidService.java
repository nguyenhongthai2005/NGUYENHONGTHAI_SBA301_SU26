package com.lab06.orchid_management.services;

import com.lab06.orchid_management.entities.Orchid;
import com.lab06.orchid_management.repositories.IOrchidRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrchidService {
    private final IOrchidRepository orchidRepository;

    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    public Orchid getOrchidById(Integer id) {
        return orchidRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy Orchid"));
    }

    public Orchid createOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    public Orchid updateOrchid(Integer id, Orchid orchidDetails) {
        Orchid orchid = getOrchidById(id);
        orchid.setOrchidName(orchidDetails.getOrchidName());
        orchid.setIsNatural(orchidDetails.getIsNatural());
        orchid.setOrchidDescription(orchidDetails.getOrchidDescription());
        orchid.setOrchidCategory(orchidDetails.getOrchidCategory());
        orchid.setIsAttractive(orchidDetails.getIsAttractive());
        orchid.setOrchidURL(orchidDetails.getOrchidURL());
        return orchidRepository.save(orchid);
    }

    public void deleteOrchid(Integer id) {
        Orchid orchid = getOrchidById(id);
        orchidRepository.delete(orchid);
    }
}
