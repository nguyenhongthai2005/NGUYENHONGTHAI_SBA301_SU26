package com.lab06.orchid_management.configurations;

import com.lab06.orchid_management.entities.Role;
import com.lab06.orchid_management.entities.User;
import com.lab06.orchid_management.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            User admin = User.builder()
                    .fullName("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Đã tạo tài khoản ADMIN mặc định: admin@gmail.com / 123456");
        }

        if (userRepository.findByEmail("user@gmail.com").isEmpty()) {
            User user = User.builder()
                    .fullName("User")
                    .email("user@gmail.com")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            System.out.println("Đã tạo tài khoản USER mặc định: user@gmail.com / 123456");
        }
    }
}
