package com.example.employeemanagement.services;

import com.example.employeemanagement.pojos.Employee;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(String empId);
    Employee createEmployee(Employee employee);
    Employee updateEmployee(String empId, Employee updatedEmployee);
    Employee deleteEmployee(int id);
    List<Employee> searchEmployees(String keyword);
    Page<Employee> getEmployeesWithPaging(int page, int size, String sortBy);
}
