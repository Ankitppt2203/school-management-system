package com.ankit.school_management.repository;

import com.ankit.school_management.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findAllByOrderBySubmittedAtDesc();
}
