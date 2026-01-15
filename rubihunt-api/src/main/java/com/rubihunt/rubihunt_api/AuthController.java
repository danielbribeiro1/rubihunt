package com.rubihunt.rubihunt_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    // Defina sua senha de Admin aqui
    private static final String SENHA_MESTRA = "rubihunt123"; 

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        if (SENHA_MESTRA.equals(request.getPassword())) {
            // Retorna 200 OK se a senha bater
            return ResponseEntity.ok("Login Aprovado");
        } else {
            // Retorna 401 Unauthorized se errar
            return ResponseEntity.status(401).body("Senha Incorreta");
        }
    }
}