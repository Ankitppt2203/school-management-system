package com.ankit.school_management.controller;

import com.ankit.school_management.dto.ErrorResponse;
import com.ankit.school_management.dto.LoginRequest;
import com.ankit.school_management.dto.LoginResponse;
import com.ankit.school_management.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ankit.school_management.dto.ChangePasswordRequest;
import org.springframework.security.core.Authentication;
import com.ankit.school_management.dto.ResetPasswordRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            LoginResponse response = authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            ErrorResponse error = new ErrorResponse(
                    e.getMessage(),
                    401);

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(error);

        } catch (Exception e) {

            ErrorResponse error = new ErrorResponse(
                    "Internal server error",
                    500);

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }
    
    @PutMapping("/admin/users/{id}/reset-password")
public ResponseEntity<?> resetPassword(
        @PathVariable Long id,
        @RequestBody ResetPasswordRequest request) {

    try {

        authService.resetPassword(id, request);

        return ResponseEntity.ok("Password reset successfully.");

    } catch (RuntimeException e) {

        ErrorResponse error = new ErrorResponse(
                e.getMessage(),
                400);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);

    } catch (Exception e) {

        ErrorResponse error = new ErrorResponse(
                "Internal server error",
                500);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }
}

    @PostMapping("/change-password")
public ResponseEntity<?> changePassword(
        Authentication authentication,
        @RequestBody ChangePasswordRequest request) {

    try {

        authService.changePassword(
                authentication.getName(),
                request);

        return ResponseEntity.ok("Password changed successfully.");

    } catch (RuntimeException e) {

        ErrorResponse error = new ErrorResponse(
                e.getMessage(),
                400);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

    } catch (Exception e) {

        ErrorResponse error = new ErrorResponse(
                "Internal server error",
                500);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
}