package com.example.demo.controllers;

import com.example.demo.entities.MenuItem;
import com.example.demo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(origins = "http://localhost:4200")
public class MenuItemController {
    @Autowired
    private ApplicationContext context;

    @GetMapping 
    public ResponseEntity<?> getMenuItems(){
        MenuItemService repo = context.getBean(MenuItemServiceImpl.class);

        var response = repo.findAll();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/deleteMenuItem")
    public String deleteMenuItem(@Valid @RequestParam("id") int theId, Model theModel) {
        MenuItemService repo = context.getBean(MenuItemServiceImpl.class);
        MenuItem menuItem = repo.findById(theId);
        if(menuItem.getMenuOrder() > 0){
            repo.deleteById(theId);
            return "confirmationdeletemenuitem";
        } else {
            return "negativeerror";
        }
    }

    @PutMapping("/updateMenuItem/{id}")
    public ResponseEntity<?> updateMenuItem(@PathVariable int id, @Valid @RequestBody MenuItem updatedItem) {
        MenuItemService repo = context.getBean(MenuItemServiceImpl.class);

        MenuItem backendItem = repo.findById(id);

        if (backendItem == null) {
            return ResponseEntity.notFound().build();
        }

        backendItem.setMenuOrder(updatedItem.getMenuOrder());

        if (updatedItem.getItemTags() != null) {
            backendItem.setItemTags(updatedItem.getItemTags());
        }

        if (updatedItem.getRemoveDate() != null) {
            backendItem.setRemoveDate(updatedItem.getRemoveDate());
        }

        if (updatedItem.getAddDate() != null) {
            backendItem.setAddDate(updatedItem.getAddDate());
        }

        repo.save(backendItem);

        return ResponseEntity.ok(backendItem);
    }

}
