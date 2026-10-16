package com.example.demo.dao;

import com.example.demo.entities.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuItemRepository extends JpaRepository <MenuItem, Long> {
    @Query("SELECT m from MenuItem m WHERE m.itemName LIKE CONCAT('%', ?1, '%')")
    public List<MenuItem> search(String keyword);
}
