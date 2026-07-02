package com.example.employeemanagement.controllers;

import com.example.employeemanagement.pojos.Employee;
import com.example.employeemanagement.services.IEmployeeService;
import com.example.employeemanagement.payloads.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.example.employeemanagement.exceptions.EmployeeNotFoundException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee API", description = "Operations related to employees")
public class EmployeeController {

    private final IEmployeeService employeeService;

    @Autowired
    public EmployeeController(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Operation(summary = "Get all employees", description = "Retrieve a paginated list of all employees")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Employee>>> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "empId") String sortBy) {
        Page<Employee> employeePage = employeeService.getEmployeesWithPaging(page, size, sortBy);
        return ResponseEntity.ok(new ApiResponse<>(true, "Successfully fetched employees", employeePage));
    }

    @Operation(summary = "Get employee by ID", description = "Retrieve an employee by their ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved employee")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Employee not found")
    @GetMapping("/{empId}")
    public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable String empId) {
        Employee employee = employeeService.getEmployeeById(empId);
        if (employee != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Successfully fetched employee", employee));
        }
        throw new EmployeeNotFoundException("Employee not found with id: " + empId);
    }

    @Operation(summary = "Create a new employee", description = "Add a new employee to the system")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Employee created successfully")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input data")
    @PostMapping
    public ResponseEntity<ApiResponse<Employee>> createEmployee(@Valid @RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Employee created successfully", createdEmployee));
    }

    @Operation(summary = "Update an employee", description = "Update an existing employee's details")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee updated successfully")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Employee not found")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input data")
    @PutMapping("/{empId}")
    public ResponseEntity<ApiResponse<Employee>> updateEmployee(@PathVariable String empId, @Valid @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(empId, employee);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Employee updated successfully", updatedEmployee));
        }
        throw new EmployeeNotFoundException("Employee not found with id: " + empId);
    }

    @Operation(summary = "Delete an employee", description = "Remove an employee by their index ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Employee deleted successfully")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Employee not found")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> deleteEmployee(@PathVariable int id) {
        Employee deletedEmployee = employeeService.deleteEmployee(id);
        if (deletedEmployee != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Employee deleted successfully", deletedEmployee));
        }
        throw new EmployeeNotFoundException("Employee not found at index: " + id);
    }

    @Operation(summary = "Search employees", description = "Search employees by name or designation")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved search results")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Employee>>> searchEmployees(@RequestParam String keyword) {
        List<Employee> result = employeeService.searchEmployees(keyword);
        return ResponseEntity.ok(new ApiResponse<>(true, "Search successful", result));
    }
}
