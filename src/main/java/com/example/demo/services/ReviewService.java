package com.example.demo.services;

import com.example.demo.entities.Review;

import java.util.List;

public interface ReviewService {
    public List<Review> findAll();
    public Review findById(Long id);
    public void save (Review theMenuItem);
    public void deleteById(Long id);

    public List<Review> listAll(String keyword);
}