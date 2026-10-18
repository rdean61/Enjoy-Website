package com.example.demo.controllers;

import com.example.demo.entities.Review;
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
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:4200")
public class ReviewController {
    @Autowired
    private ApplicationContext context;

    @GetMapping 
    public ResponseEntity<Map<String, String>> getReviews(){
        Map<String, String> response = new HashMap<>();
        response.put("message", "API connected to spring");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/deleteReview")
    public String deleteReview(@Valid @RequestParam("id") int theId, Model theModel) {
        ReviewService repo = context.getBean(ReviewServiceImpl.class);
        Review review = repo.findById(theId);
        if(review.getDisplayStatus() == false) {
            repo.deleteById(theId);
            return "confirmdeletereview";
        } else {
            return "negativeerror";
        }
    }

}
