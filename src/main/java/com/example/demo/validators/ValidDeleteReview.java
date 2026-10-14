package com.example.demo.validators;

import jakarta.validation.Payload;

public @interface ValidDeleteReview {
    String message() default "Review cannot be deleted if currently on display.";
    Class<?> [] groups() default {};
    Class<? extends Payload> [] payload() default {};

}
