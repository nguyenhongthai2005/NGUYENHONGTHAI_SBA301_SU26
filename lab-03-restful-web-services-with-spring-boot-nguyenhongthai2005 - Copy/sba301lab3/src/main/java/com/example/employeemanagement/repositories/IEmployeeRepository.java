package com.example.employeemanagement.repositories;

import com.example.employeemanagement.pojos.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(String empId);
    Employee create(Employee employee);
    Employee delete(int id);
    List<Employee> searchEmployees(String keyword);
}
