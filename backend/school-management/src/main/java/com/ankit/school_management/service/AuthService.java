package com.ankit.school_management.service;

import com.ankit.school_management.dto.ChangePasswordRequest;
import com.ankit.school_management.dto.LoginRequest;
import com.ankit.school_management.dto.LoginResponse;
import com.ankit.school_management.entity.User;
import com.ankit.school_management.repository.UserRepository;
import com.ankit.school_management.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ankit.school_management.dto.ResetPasswordRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name());

        long expiresIn = jwtService.getExpirationTimeInSeconds();

        return new LoginResponse(
                token,
                expiresIn,
                "Bearer",
                user.isFirstLogin()
        );
    }

    public void changePassword(
            String username,
            ChangePasswordRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setFirstLogin(false);

        userRepository.save(user);
    }

    public void resetPassword(
        Long userId,
        ResetPasswordRequest request) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setPassword(
            passwordEncoder.encode(request.getNewPassword()));

    user.setFirstLogin(true);
    user.setAccountLocked(false);
    user.setFailedLoginAttempts(0);
    user.setEnabled(true);

    userRepository.save(user);
}
}