package com.example.demo.controllers;

import com.example.demo.entities.MenuItem;
import com.example.demo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

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

    @DeleteMapping("/deleteMenuItem/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable("id") Long id) {
        try {
            MenuItemService repo = context.getBean(MenuItemServiceImpl.class);
            MenuItem menuItem = repo.findById(id);

            if(menuItem != null) {
                repo.deleteById(id);
                return ResponseEntity.ok().body("Deleted Successfully");
            } else {
                return ResponseEntity.ok().body("Cannot be deleted.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/updateMenuItem/{id}")
    public ResponseEntity<?> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItem updatedItem) {
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

    @PostMapping("/createMenuItem")
    public ResponseEntity<?> createMenuItem(@Valid @RequestBody MenuItem newMenuItem) {
        MenuItemService repo = context.getBean(MenuItemServiceImpl.class);

        newMenuItem.setId(null);

        repo.save(newMenuItem);

        return ResponseEntity.ok(newMenuItem);
    }

}
