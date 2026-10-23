package com.example.demo.services;

import com.example.demo.entities.MenuItem;

import java.util.List;

public interface MenuItemService {
    public List<MenuItem> findAll();
    public MenuItem findById(Long id);
    public void save (MenuItem theMenuItem);
    public void deleteById(Long id);

    public List<MenuItem> listAll(String keyword);
}
