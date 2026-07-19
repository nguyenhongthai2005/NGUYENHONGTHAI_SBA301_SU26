package com.be.A3DE190299_SE19B04_be.security;

import com.be.A3DE190299_SE19B04_be.entity.Customer;
import com.be.A3DE190299_SE19B04_be.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (adminEmail.equals(username)) {
            return new User(adminEmail, adminPassword, Collections.singletonList(new SimpleGrantedAuthority("ROLE_STAFF")));
        }
        Customer customer = customerRepository.findByEmailAddress(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));
        return new User(customer.getEmailAddress(), customer.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_CUSTOMER")));
    }
}
