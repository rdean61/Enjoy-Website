package com.example.demo.services;

import com.example.demo.entities.MenuItem;
import com.example.demo.dao.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl implements MenuItemService {
    private MenuItemRepository menuItemRepository;

    @Autowired 
    public MenuItemServiceImpl(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public List<MenuItem> findAll() {
        return (List<MenuItem>) menuItemRepository.findAll();
    }

    public List<MenuItem> listAll(String keyword) {
        if(keyword != null) {
            return menuItemRepository.search(keyword);
        }
        return (List<MenuItem>) menuItemRepository.findAll();
    }

    @Override 
    public MenuItem findById(int theId) {
        Long longId = (long)theId;
        Optional<MenuItem> result = menuItemRepository.findById(longId);

        MenuItem theMenuItem = null;

        if(result.isPresent()) {
            theMenuItem = result.get();
        } else {
            throw new RuntimeException("MenuItem id "+ theId + " not found.");
        }

        return theMenuItem;
    }

    @Override
    public void save(MenuItem theMenuItem) {
        menuItemRepository.save(theMenuItem);
    }

    @Override 
    public void deleteById(int theId) {
        Long longId = (long)theId;
        menuItemRepository.deleteById(longId);
    }

}
