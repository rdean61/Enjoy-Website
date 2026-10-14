package com.example.demo.validators;

import jakarta.validation.Payload;

public @interface ValidDeleteMenuItem {
    String message() default "Menu Item cannot be deleted if currently on the weekly menu.";
    Class<?> [] groups() default {};
    Class<? extends Payload> [] payload() default {};

}
