package com.ankit.school_management.controller;

import com.ankit.school_management.dto.EnquiryRequest;
import com.ankit.school_management.dto.EnquiryResponse;
import com.ankit.school_management.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enquiries")
public class EnquiryController {
    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnquiryResponse create(@Valid @RequestBody EnquiryRequest request) {
        return enquiryService.create(request);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<EnquiryResponse> findAll() {
        return enquiryService.findAll();
    }
}
