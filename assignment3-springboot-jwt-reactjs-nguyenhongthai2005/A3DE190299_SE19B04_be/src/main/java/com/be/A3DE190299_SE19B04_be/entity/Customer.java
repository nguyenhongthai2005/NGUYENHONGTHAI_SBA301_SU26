package com.be.A3DE190299_SE19B04_be.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerID;
    private String customerFullName;
    private String telephone;
    @Column(unique = true)
    private String emailAddress;
    private LocalDate customerBirthday;
    private Byte customerStatus;
    private String password;

    public Customer() {}

    public Integer getCustomerID() { return customerID; }
    public void setCustomerID(Integer customerID) { this.customerID = customerID; }
    public String getCustomerFullName() { return customerFullName; }
    public void setCustomerFullName(String customerFullName) { this.customerFullName = customerFullName; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }
    public LocalDate getCustomerBirthday() { return customerBirthday; }
    public void setCustomerBirthday(LocalDate customerBirthday) { this.customerBirthday = customerBirthday; }
    public Byte getCustomerStatus() { return customerStatus; }
    public void setCustomerStatus(Byte customerStatus) { this.customerStatus = customerStatus; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
