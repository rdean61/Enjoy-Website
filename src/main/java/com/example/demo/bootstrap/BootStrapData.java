package com.example.demo.bootstrap;

import com.example.demo.dao.*;
import com.example.demo.entities.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;


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

        if(reviewRepository.count() == 0){
        Review placeholderReview = new Review();
        placeholderReview.setReviewContent("This bakery is such a little gem. I took my son to pick out mini cheesecakes for his birthday. Every single flavor was delicious and perfect. The owner was so pleasant to chat with. We are not from the area but I highly recommend this shop and will definitely be returning on future trips to VA Beach!");
        placeholderReview.setRating(5);
        placeholderReview.setName("Katriina Bell");
        placeholderReview.setReviewDate(LocalDate.now());
        placeholderReview.setDisplayStatus(true);
        reviewRepository.save(placeholderReview);
        }

        if(menuItemRepository.count() == 0){
        MenuItem placeholderMenuitem = new MenuItem();
        placeholderMenuitem.setItemName("Classic");
        placeholderMenuitem.setAddDate(LocalDate.now());
        placeholderMenuitem.setRemoveDate(LocalDate.now());
        placeholderMenuitem.setMenuOrder(0);
        placeholderMenuitem.setTreatType("mini");
        placeholderMenuitem.setItemTags("SAMPLE TEXT");
        menuItemRepository.save(placeholderMenuitem);
        }  

        System.out.println("Number of Menu Items: " + menuItemRepository.count());
        System.out.println(menuItemRepository.findAll());
        System.out.println("Number of Reviews: " + reviewRepository.count());
    }

}
