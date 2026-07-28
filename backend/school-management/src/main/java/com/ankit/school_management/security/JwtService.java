package com.ankit.school_management.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

        private static final long EXPIRATION_TIME_MS = 1000 * 60 * 60; // 1 hour in milliseconds

        private static final long EXPIRATION_TIME_SECONDS = EXPIRATION_TIME_MS / 1000; // 3600 seconds

        private final SecretKey key;

        public JwtService(@Value("${jwt.secret}") String secret) {
                if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
                        throw new IllegalStateException("jwt.secret must contain at least 32 bytes");
                }
                this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }

        public String generateToken(
                        String username,
                        String role) {

                return Jwts.builder()
                                .setSubject(username)
                                .claim("role", role)
                                .setIssuedAt(new Date())
                                .setExpiration(
                                                new Date(
                                                                System.currentTimeMillis()
                                                                                + EXPIRATION_TIME_MS))
                                .signWith(
                                                key,
                                                SignatureAlgorithm.HS256)
                                .compact();
        }

        public long getExpirationTimeInSeconds() {
                return EXPIRATION_TIME_SECONDS;
        }

        public String extractUsername(
                        String token) {

                return Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(token)
                                .getBody()
                                .getSubject();
        }

        public String extractRole(
                        String token) {

                return Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(token)
                                .getBody()
                                .get("role", String.class);
        }

        public boolean isTokenValid(
                        String token,
                        String username) {

                try {
                        return extractUsername(token)
                                        .equals(username);
                } catch (Exception e) {
                        return false;
                }
        }
}
