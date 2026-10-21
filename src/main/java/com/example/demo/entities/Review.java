package com.example.demo.entities;

import com.example.demo.validators.ValidDeleteReview;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@Entity
@ValidDeleteReview
@Table(name = "Reviews")
public class Review {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(columnDefinition = "text")
    String reviewContent;
    @Min(value = 0, message = "Rating cannot be less than 0 stars.")
    @Max(value = 5, message = "Rating cannot be higher than 5 stars.")
    int rating;
    String name;
    LocalDate reviewDate;
    boolean displayStatus;
    String email;

    public Review() {
    }

    public Review(String reviewContent, int rating, String name, LocalDate reviewDate, boolean displayStatus) {
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.name = name;
        this.reviewDate = reviewDate;
        this.displayStatus = displayStatus;
    }

    public Review(String reviewContent, int rating, String name, LocalDate reviewDate, boolean displayStatus, String email) {
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.name = name;
        this.reviewDate = reviewDate;
        this.displayStatus = displayStatus;
        this.email = email;
    }

    public Review(Long id, String reviewContent, int rating, String name, LocalDate reviewDate, boolean displayStatus) {
        this.id = id;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.name = name;
        this.reviewDate = reviewDate;
        this.displayStatus = displayStatus;
    }

    public Review(Long id, String reviewContent, int rating, String name, LocalDate reviewDate, boolean displayStatus, String email) {
        this.id = id;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.name = name;
        this.reviewDate = reviewDate;
        this.displayStatus = displayStatus;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewContent() {
        return reviewContent;
    }

    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getDisplayStatus() {
        return displayStatus;
    }

    public void setDisplayStatus(boolean displayStatus) {
        this.displayStatus = displayStatus;
    }

    public String toString() {
        return this.name;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Review review = (Review) o;

        return id == review.id;
    }

}
