package com.lab06.orchid_management.controllers;

import com.lab06.orchid_management.entities.Orchid;
import com.lab06.orchid_management.services.OrchidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orchids")
@RequiredArgsConstructor
public class OrchidController {

    private final OrchidService orchidService;

    @GetMapping
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable Integer id) {
        return ResponseEntity.ok(orchidService.getOrchidById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Orchid> createOrchid(@Valid @RequestBody Orchid orchid) {
        return new ResponseEntity<>(orchidService.createOrchid(orchid), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable Integer id, @Valid @RequestBody Orchid orchid) {
        return ResponseEntity.ok(orchidService.updateOrchid(id, orchid));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrchid(@PathVariable Integer id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }
}
