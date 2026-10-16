package com.example.demo.controllers;

import com.example.demo.entities.Review;
import com.example.demo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "https://localhost:4200")
public class ReviewController {
    @Autowired
    private ApplicationContext context;

    @GetMapping("/deleteReview")
    public String deleteReview(@Valid @RequestParam("id") in theId, Model theModel) {
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
