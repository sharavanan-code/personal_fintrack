package com.example.fintrack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController


public class UserController {
    @GetMapping("/home")
    public String getString(){
        return "Hello World";
    }
}
