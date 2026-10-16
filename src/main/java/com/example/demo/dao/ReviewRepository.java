package com.example.demo.dao;

import com.example.demo.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository <Review, Long> {
    @Query("SELECT r from Review r WHERE r.reviewContent LIKE CONCAT('%', ?1, '%')")
    public List<Review> search(String keyword);

}
