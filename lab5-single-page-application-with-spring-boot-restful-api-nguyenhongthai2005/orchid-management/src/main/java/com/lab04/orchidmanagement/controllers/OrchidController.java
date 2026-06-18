package com.lab04.orchidmanagement.controllers;

import com.lab04.orchidmanagement.dto.ApiResponse;
import com.lab04.orchidmanagement.exception.OrchidNotFoundException;
import com.lab04.orchidmanagement.pojos.Orchid;
import com.lab04.orchidmanagement.services.IOrchidService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
@CrossOrigin(origins = "http://localhost:5173")
public class OrchidController {

    private final IOrchidService orchidService;

    @Autowired
    public OrchidController(IOrchidService orchidService) {
        this.orchidService = orchidService;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<Orchid>>> getAllOrchids() {
        List<Orchid> orchids = orchidService.getAllOrchids();
        return ResponseEntity.ok(ApiResponse.success(orchids, "Get all orchids successfully"));
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse<Orchid>> createOrchid(@Valid @RequestBody Orchid orchid) {
        Orchid createdOrchid = orchidService.createOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(createdOrchid, "Create orchid successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Orchid>> getOrchidById(@PathVariable Integer id) {
        Orchid orchid = orchidService.getOrchidById(id)
                .orElseThrow(() -> new OrchidNotFoundException("Orchid not found with id: " + id));
        return ResponseEntity.ok(ApiResponse.success(orchid, "Get orchid successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Orchid>> updateOrchid(@PathVariable Integer id, @Valid @RequestBody Orchid orchidDetails) {
        Orchid updatedOrchid = orchidService.updateOrchid(id, orchidDetails);
        return ResponseEntity.ok(ApiResponse.success(updatedOrchid, "Update orchid successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOrchid(@PathVariable Integer id) {
        if (orchidService.getOrchidById(id).isEmpty()) {
            throw new OrchidNotFoundException("Orchid not found with id: " + id);
        }
        orchidService.deleteOrchid(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success(null, "Delete orchid successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Orchid>>> searchOrchids(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isNatural) {
        List<Orchid> orchids = orchidService.searchOrchids(name, category, isNatural);
        return ResponseEntity.ok(ApiResponse.success(orchids, "Search orchids successfully"));
    }

    @GetMapping("/paged")
    public ResponseEntity<ApiResponse<Page<Orchid>>> getPagedOrchids(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "orchidId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Page<Orchid> pagedOrchids = orchidService.getPagedOrchids(page, size, sortBy, direction);
        return ResponseEntity.ok(ApiResponse.success(pagedOrchids, "Get paged orchids successfully"));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = orchidService.getCategories();
        return ResponseEntity.ok(ApiResponse.success(categories, "Get categories successfully"));
    }
}
