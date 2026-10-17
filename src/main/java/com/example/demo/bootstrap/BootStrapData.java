package com.example.demo.bootstrap;

import com.example.demo.dao.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component 
public class BootStrapData implements CommandLineRunner{
    private final MenuItemRepository menuItemRepository;
    private final ReviewRepository reviewRepository;

    public BootStrapData(MenuItemRepository menuItemRepository, ReviewRepository reviewRepository) {
        this.menuItemRepository = menuItemRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Started in Boot Strap.");
        System.out.println("Number of Menu Items: " + menuItemRepository.count());
        System.out.println(menuItemRepository.findAll());
        System.out.println("Number of Reviews: " + reviewRepository.count());
    }

}
