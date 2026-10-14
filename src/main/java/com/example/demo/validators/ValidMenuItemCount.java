package com.example.demo.validators;

import jakarta.validation.Payload;

public @interface ValidMenuItemCount {
    String message() default "The weekly menu is already full for this treat. Please remove an item before adding another.";
    Class<?> [] groups() default {};
    Class<? extends Payload> [] payload() default {};

}
