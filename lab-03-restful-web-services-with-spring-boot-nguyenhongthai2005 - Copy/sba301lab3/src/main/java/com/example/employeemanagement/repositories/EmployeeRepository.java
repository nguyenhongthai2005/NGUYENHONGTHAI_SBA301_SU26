package com.example.employeemanagement.repositories;

import com.example.employeemanagement.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private List<Employee> employees = new ArrayList<>();

    public EmployeeRepository() {
        employees.add(new Employee("EMP001", "Alice Smith", "Software Engineer", 80000));
        employees.add(new Employee("EMP002", "Bob Johnson", "Project Manager", 95000));
        employees.add(new Employee("EMP003", "Charlie Davis", "QA Tester", 60000));
        employees.add(new Employee("EMP004", "Diana Evans", "Business Analyst", 75000));
        employees.add(new Employee("EMP005", "Evan Wright", "DevOps Engineer", 85000));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

    @Override
    public Employee getEmployeeById(String empId) {
        for (Employee emp : employees) {
            if (emp.getEmpId().equals(empId)) {
                return emp;
            }
        }
        return null;
    }

    @Override
    public Employee create(Employee employee) {
        employees.add(employee);
        return employee;
    }

    @Override
    public Employee delete(int id) {
        if (id >= 0 && id < employees.size()) {
            return employees.remove(id);
        }
        return null;
    }

    @Override
    public List<Employee> searchEmployees(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return new ArrayList<>();
        }
        String lowerKeyword = keyword.toLowerCase();
        return employees.stream()
                .filter(e -> (e.getName() != null && e.getName().toLowerCase().contains(lowerKeyword)) ||
                             (e.getDesignation() != null && e.getDesignation().toLowerCase().contains(lowerKeyword)))
                .collect(Collectors.toList());
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        List<Employee> sortedList = new ArrayList<>(employees);
        if (sort.isSorted()) {
            sortedList.sort(getComparator(sort));
        }
        return sortedList;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> sortedList = new ArrayList<>(employees);

        if (pageable.getSort().isSorted()) {
            sortedList.sort(getComparator(pageable.getSort()));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), sortedList.size());
        
        List<Employee> pageContent;
        if (start >= sortedList.size()) {
            pageContent = new ArrayList<>();
        } else {
            pageContent = sortedList.subList(start, end);
        }

        return new PageImpl<>(pageContent, pageable, sortedList.size());
    }

    private Comparator<Employee> getComparator(Sort sort) {
        return (e1, e2) -> {
            for (Sort.Order order : sort) {
                int comparison = 0;
                String property = order.getProperty();
                
                if ("empId".equalsIgnoreCase(property) && e1.getEmpId() != null && e2.getEmpId() != null) {
                    comparison = e1.getEmpId().compareToIgnoreCase(e2.getEmpId());
                } else if ("name".equalsIgnoreCase(property) && e1.getName() != null && e2.getName() != null) {
                    comparison = e1.getName().compareToIgnoreCase(e2.getName());
                } else if ("designation".equalsIgnoreCase(property) && e1.getDesignation() != null && e2.getDesignation() != null) {
                    comparison = e1.getDesignation().compareToIgnoreCase(e2.getDesignation());
                } else if ("salary".equalsIgnoreCase(property)) {
                    comparison = Double.compare(e1.getSalary(), e2.getSalary());
                }

                if (comparison != 0) {
                    return order.isAscending() ? comparison : -comparison;
                }
            }
            return 0;
        };
    }
}
