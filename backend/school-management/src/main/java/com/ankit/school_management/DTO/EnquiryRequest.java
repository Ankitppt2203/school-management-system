package com.ankit.school_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EnquiryRequest {
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Size(max = 150)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 30)
    private String phone;

    @Size(max = 100)
    private String interestedIn;

    @NotBlank(message = "Message is required")
    @Size(max = 2000)
    private String message;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getInterestedIn() { return interestedIn; }
    public void setInterestedIn(String interestedIn) { this.interestedIn = interestedIn; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
