package com.be.A3DE190299_SE19B04_be.repository;

import com.be.A3DE190299_SE19B04_be.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmailAddress(String emailAddress);
}
