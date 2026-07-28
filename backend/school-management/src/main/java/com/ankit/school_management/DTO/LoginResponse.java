package com.ankit.school_management.dto;

public class LoginResponse {

    private String token;
    private long expiresIn;
    private String tokenType;
    private boolean firstLogin;

    public LoginResponse() {
    }

    public LoginResponse(
            String token,
            long expiresIn,
            String tokenType,
            boolean firstLogin) {

        this.token = token;
        this.expiresIn = expiresIn;
        this.tokenType = tokenType;
        this.firstLogin = firstLogin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
    }
}