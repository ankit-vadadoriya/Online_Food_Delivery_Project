package com.example.response;

import com.example.model.USER_ROLL;

import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;

    private String message;

    private USER_ROLL role;

}
