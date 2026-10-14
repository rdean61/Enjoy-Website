package com.example.demo.validators;

import com.example.demo.entities.Review;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DeleteReviewValidator implements ConstraintValidator<ValidDeleteReview, Review> {
    @Override 
    public void initialize(ValidDeleteReview constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Review review, ConstraintValidatorContext constraintValidatorContext) {
        if(review.getDisplayStatus() == false) return true;
        else return false;
    }

}
