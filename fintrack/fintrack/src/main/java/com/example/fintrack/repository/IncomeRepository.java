package com.example.fintrack.repository;

import com.example.fintrack.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fintrack.entity.User;

import java.util.List;


public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUser(User user);
}
