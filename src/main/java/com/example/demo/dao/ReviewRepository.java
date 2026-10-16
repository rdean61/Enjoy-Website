package com.example.demo.dao;

import com.example.demo.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository <Review, Long> {
    public List<Review> search(String keyword);

}
