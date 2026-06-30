package com.lab06.orchid_management.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    String fullName,
    @Email String email,
    @Size(min = 8) String password
) {}
