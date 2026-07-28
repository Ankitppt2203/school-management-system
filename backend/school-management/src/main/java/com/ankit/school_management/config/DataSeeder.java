package com.ankit.school_management.config;

import com.ankit.school_management.entity.Role;
import com.ankit.school_management.entity.User;
import com.ankit.school_management.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    @Profile("dev")
    CommandLineRunner seedDevelopmentUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.admin-password}") String adminPassword,
            @Value("${app.seed.teacher-password}") String teacherPassword,
            @Value("${app.seed.student-password}") String studentPassword,
            @Value("${app.seed.parent-password}") String parentPassword) {

        return args -> {
            seedUser(userRepository, passwordEncoder, "admin", adminPassword, Role.ADMIN);
            seedUser(userRepository, passwordEncoder, "teacher", teacherPassword, Role.TEACHER);
            seedUser(userRepository, passwordEncoder, "student", studentPassword, Role.STUDENT);
            seedUser(userRepository, passwordEncoder, "parent", parentPassword, Role.PARENT);
        };
    }

    private void seedUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String username,
            String password,
            Role role) {

        if (userRepository.findByUsername(username).isEmpty()) {
            userRepository.save(
                    new User(
                            username,
                            passwordEncoder.encode(password),
                            role));
        }
    }
}
