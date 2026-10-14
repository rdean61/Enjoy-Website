package com.example.demo.validators;

import com.example.demo.entities.MenuItem;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DeleteMenuItemValidator implements ConstraintValidator<ValidDeleteMenuItem, MenuItem> {
    @Override 
    public void initialize(ValidDeleteMenuItem constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override 
    public boolean isValid(MenuItem menuItem, ConstraintValidatorContext constraintValidatorContext) {
        if(menuItem.getMenuOrder() < 0) return true;
        else return false;
    }
}
