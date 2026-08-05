package com.ankit.school_management.service;

import com.ankit.school_management.dto.EnquiryRequest;
import com.ankit.school_management.dto.EnquiryResponse;
import com.ankit.school_management.entity.Enquiry;
import com.ankit.school_management.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EnquiryService {
    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public EnquiryResponse create(EnquiryRequest request) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(request.getName().trim());
        enquiry.setEmail(request.getEmail().trim());
        enquiry.setPhone(request.getPhone().trim());
        enquiry.setInterestedIn(request.getInterestedIn() == null ? null : request.getInterestedIn().trim());
        enquiry.setMessage(request.getMessage().trim());
        return toResponse(enquiryRepository.save(enquiry));
    }

    @Transactional(readOnly = true)
    public List<EnquiryResponse> findAll() {
        return enquiryRepository.findAllByOrderBySubmittedAtDesc().stream().map(this::toResponse).toList();
    }

    private EnquiryResponse toResponse(Enquiry enquiry) {
        return new EnquiryResponse(enquiry.getId(), enquiry.getName(), enquiry.getEmail(), enquiry.getPhone(),
                enquiry.getInterestedIn(), enquiry.getMessage(), enquiry.getSubmittedAt());
    }
}
