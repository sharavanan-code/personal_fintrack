package com.example.fintrack.controller;


import com.example.fintrack.entity.Expense;
import com.example.fintrack.entity.Income;
import com.example.fintrack.entity.User;
import com.example.fintrack.repository.ExpenseRepository;
import com.example.fintrack.repository.IncomeRepository;
import com.example.fintrack.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/finance")
public class FinanceController{

    private final IncomeRepository incomeRepo;
    private final ExpenseRepository expenseRepo;
    private final UserRepository userRepo;

    public FinanceController(IncomeRepository incomeRepo, ExpenseRepository expenseRepo, UserRepository userRepo){
        this.incomeRepo = incomeRepo;
        this.expenseRepo = expenseRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/income")
    public ResponseEntity<?> addIncome(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Income income){
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        income.setUser(user);
        return ResponseEntity.ok(incomeRepo.save(income));

    }

    @PostMapping("/expense")
    public ResponseEntity<?> addExpense(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Expense expense){
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        expense.setUser(user);
        return ResponseEntity.ok(expenseRepo.save(expense));
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary(@AuthenticationPrincipal UserDetails userDetails){
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        double totalIncome = incomeRepo.findByUser(user).stream().mapToDouble(Income:: getAmount).sum();
        double totalExpense = expenseRepo.findByUser(user).stream().mapToDouble(Expense::getAmount).sum();
        double balance = totalIncome - totalExpense;

        return ResponseEntity.ok(
                String.format("Income: %.2f, Expense: %.2f, Balance: %.2f", totalIncome, totalExpense, balance)
        );
    }

}
