package com.example.fintrack.controller;

import com.example.fintrack.entity.Income;
import com.example.fintrack.entity.User;
import com.example.fintrack.repository.IncomeRepository;
import com.example.fintrack.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/income")
public class IncomeController {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    public IncomeController(IncomeRepository incomeRepository, UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/history")
    public ResponseEntity<List<Income>> getIncomeHistory(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Income> incomes = incomeRepository.findByUser(user);
        return ResponseEntity.ok(incomes);
    }
}
