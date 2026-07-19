package com.be.A3DE190299_SE19B04_be.controller;

import com.be.A3DE190299_SE19B04_be.entity.Customer;
import com.be.A3DE190299_SE19B04_be.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
        return customerRepository.findByEmailAddress(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        if(customerRepository.findByEmailAddress(customer.getEmailAddress()).isPresent()){
            return ResponseEntity.badRequest().body("Email already exists");
        }
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer customerDetails) {
        return customerRepository.findById(id).map(customer -> {
            customer.setCustomerFullName(customerDetails.getCustomerFullName());
            customer.setTelephone(customerDetails.getTelephone());
            customer.setCustomerBirthday(customerDetails.getCustomerBirthday());
            customer.setCustomerStatus(customerDetails.getCustomerStatus());
            customer.setPassword(customerDetails.getPassword());
            return ResponseEntity.ok(customerRepository.save(customer));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer id) {
        return customerRepository.findById(id).map(customer -> {
            customerRepository.delete(customer);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
