package com.example.fintrack.repository;

import com.example.fintrack.entity.Expense;
import com.example.fintrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>{
    List<Expense> findByUser(User user);
}
