package com.lab04.orchidmanagement.repositories;

import com.lab04.orchidmanagement.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {

    List<Orchid> findByOrchidCategory(String orchidCategory);

    List<Orchid> findByOrchidNameContainingIgnoreCase(String orchidName);

    List<Orchid> findByIsNatural(Boolean isNatural);

    List<Orchid> findByIsAttractive(Boolean isAttractive);

    @Query("SELECT o FROM Orchid o WHERE " +
           "(:name IS NULL OR LOWER(o.orchidName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:category IS NULL OR o.orchidCategory = :category) AND " +
           "(:isNatural IS NULL OR o.isNatural = :isNatural)")
    List<Orchid> searchOrchids(@Param("name") String name, 
                               @Param("category") String category, 
                               @Param("isNatural") Boolean isNatural);

    @Query("SELECT DISTINCT o.orchidCategory FROM Orchid o WHERE o.orchidCategory IS NOT NULL")
    List<String> findDistinctCategories();
}
