package com.example.demo.controllers;

import com.example.demo.entities.Review;
import com.example.demo.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = { 
    "http://localhost:4200",
    "https://www.enjoycheesecakes.com",
    "https://enjoycheesecakes.com"})
public class ReviewController {
    @Autowired
    private ApplicationContext context;

    @GetMapping 
    public ResponseEntity<?> getReviews(){
        ReviewService repo = context.getBean(ReviewServiceImpl.class);

        var response = repo.findAll();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteReview/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable("id") Long id) {
        ReviewService repo = context.getBean(ReviewServiceImpl.class);
        Review review = repo.findById(id);

        if(review != null) {
            repo.deleteById(id);
            return ResponseEntity.ok().body("Deleted Successfully");
        } else {
            return ResponseEntity.ok().body("Cannot Delete");
        }
    }

    @PutMapping("/updateReview/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @Valid @RequestBody Review updatedReview) {
        ReviewService repo = context.getBean(ReviewServiceImpl.class);

        Review backendReview = repo.findById(id);

        if (backendReview == null) {
            return ResponseEntity.notFound().build();
        }

        backendReview.setDisplayStatus(updatedReview.getDisplayStatus());

        repo.save(backendReview);

        return ResponseEntity.ok(backendReview);
    }

    @PostMapping("/createReview")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review newReview) {
        ReviewService repo = context.getBean(ReviewServiceImpl.class);

        newReview.setId(null);

        repo.save(newReview);

        return ResponseEntity.ok(newReview);
    }



}
