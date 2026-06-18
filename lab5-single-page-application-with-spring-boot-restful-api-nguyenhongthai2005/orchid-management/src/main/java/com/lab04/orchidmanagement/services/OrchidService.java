package com.lab04.orchidmanagement.services;

import com.lab04.orchidmanagement.pojos.Orchid;
import com.lab04.orchidmanagement.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository orchidRepository;

    @Autowired
    public OrchidService(IOrchidRepository orchidRepository) {
        this.orchidRepository = orchidRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Optional<Orchid> getOrchidById(Integer id) {
        return orchidRepository.findById(id);
    }

    @Override
    public Orchid createOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(Integer id, Orchid orchidDetails) {
        Orchid existingOrchid = orchidRepository.findById(id)
                .orElseThrow(() -> new com.lab04.orchidmanagement.exception.OrchidNotFoundException("Orchid not found with id: " + id));
        
        existingOrchid.setOrchidName(orchidDetails.getOrchidName());
        existingOrchid.setIsNatural(orchidDetails.getIsNatural());
        existingOrchid.setOrchidDescription(orchidDetails.getOrchidDescription());
        existingOrchid.setOrchidCategory(orchidDetails.getOrchidCategory());
        existingOrchid.setIsAttractive(orchidDetails.getIsAttractive());
        existingOrchid.setOrchidURL(orchidDetails.getOrchidURL());
        
        return orchidRepository.save(existingOrchid);
    }

    @Override
    public void deleteOrchid(Integer id) {
        if (orchidRepository.existsById(id)) {
            orchidRepository.deleteById(id);
        }
    }

    @Override
    public List<Orchid> searchOrchids(String name, String category, Boolean isNatural) {
        return orchidRepository.searchOrchids(name, category, isNatural);
    }

    @Override
    public Page<Orchid> getPagedOrchids(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return orchidRepository.findAll(pageable);
    }

    @Override
    public List<String> getCategories() {
        return orchidRepository.findDistinctCategories();
    }
}
