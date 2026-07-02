package com.example.employeemanagement.pojos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class Employee {

    @NotBlank(message = "Employee ID cannot be empty")
    private String empId;

    @NotBlank(message = "Employee Name cannot be empty")
    private String name;

    private String designation;

    @Min(value = 0, message = "Salary cannot be negative")
    private double salary;

    public Employee() {
    }

    public Employee(String empId, String name, String designation, double salary) {
        this.empId = empId;
        this.name = name;
        this.designation = designation;
        this.salary = salary;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId='" + empId + '\'' +
                ", name='" + name + '\'' +
                ", designation='" + designation + '\'' +
                ", salary=" + salary +
                '}';
    }
}
