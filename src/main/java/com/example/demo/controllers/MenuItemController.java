package com.example.demo.controllers;

import com.example.demo.entities.MenuItem;
import com.example.demo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(origins = "https://localhost:4200")
public class MenuItemController {
    @Autowired
    private ApplicationContext context;

    @GetMapping("/deleteMenuItem")
    public String deletePart(@Valid @RequestParam("id") int theId, Model theModel) {
        MenuItemService repo = context.getBean(MenuItemServiceImpl.class);
        MenuItem menuItem = repo.findById(theId);
        if(menuItem.getMenuOrder() > 0){
            repo.deleteById(theId);
            return "confirmationdeletemenuitem";
        } else {
            return "negativeerror";
        }
    }

}
