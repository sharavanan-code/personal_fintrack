package com.example.fintrack.entity;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "income")
public class Income {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private String description;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")

    private User user;

    @PrePersist
    public void setDefaultDate(){
        if(this.date == null){
            this.date = LocalDate.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
