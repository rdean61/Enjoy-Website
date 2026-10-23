package com.example.demo.services;

import com.example.demo.entities.Review;
import com.example.demo.dao.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ReviewServiceImpl implements ReviewService{
    private ReviewRepository reviewRepository;

    @Autowired 
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override 
    public List<Review> findAll() {
        return (List<Review>) reviewRepository.findAll();
    }

    public List<Review> listAll(String keyword) {
        if(keyword != null){
            return reviewRepository.search(keyword);
        }
        return (List<Review>) reviewRepository.findAll();
    }

    @Override 
    public Review findById(Long id) {
        Long longId = (long)id;
        Optional<Review> result = reviewRepository.findById(longId);

        Review theReview = null;

        if (result.isPresent()) {
            theReview = result.get();
        } else {
            throw new RuntimeException("Review with ID " + id + " not found.");
        }

        return theReview;
    }

    @Override 
    public void save(Review theReview) {
        reviewRepository.save(theReview);
    }

    @Override 
    public void deleteById(Long id) {
        Long longId = (long)id;
        reviewRepository.deleteById(longId);
    }
}
