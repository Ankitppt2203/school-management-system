package com.ankit.school_management.dto;

import java.time.LocalDateTime;

public record EnquiryResponse(Long id, String name, String email, String phone,
                              String interestedIn, String message, LocalDateTime submittedAt) { }
