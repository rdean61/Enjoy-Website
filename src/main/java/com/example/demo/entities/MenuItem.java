package com.example.demo.entities;

import com.example.demo.validators.ValidDeleteMenuItem;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@ValidDeleteMenuItem
@Table(name = "MenuItems")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String itemName;
    @Column(name = "AddDate", columnDefinition = "DATE")
    LocalDate addDate;
    @Column(name = "RemoveDate", columnDefinition = "DATE")
    LocalDate removeDate;
    String treatType;
    String itemTags;
    int menuOrder;

    public MenuItem() {
    }

    public MenuItem(String itemName, LocalDate addDate, LocalDate removeDate, String treatType, String itemTags, int menuOrder){
        this.itemName = itemName;
        this.addDate = addDate;
        this.removeDate = removeDate;
        this.treatType = treatType;
        this.itemTags = itemTags;
        this.menuOrder = menuOrder;
    }

    public MenuItem(long id, String itemName, LocalDate addDate, LocalDate removeDate, String treatType, int menuOrder, String itemTags){
        this.id = id;
        this.itemName = itemName;
        this.addDate = addDate;
        this.removeDate = removeDate;
        this.treatType = treatType;
        this.menuOrder = menuOrder;
        this.itemTags = itemTags;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public LocalDate getAddDate() {
        return addDate;
    }

    public void setAddDate(LocalDate addDate) {
        this.addDate = addDate;
    }

    public LocalDate getRemoveDate() {
        return removeDate;
    }

    public void setRemoveDate(LocalDate removeDate) {
        this.removeDate = removeDate;
    }

    public String getTreatType() {
        return treatType;
    }

    public void setTreatType(String treatType) {
        this.treatType = treatType;
    }

    public String getItemTags() {
        return itemTags;
    }

    public void setItemTags(String itemTags) {
        this.itemTags = itemTags;
    }

    public int getMenuOrder() {
        return menuOrder;
    }

    public void setMenuOrder(int menuOrder) {
        this.menuOrder = menuOrder;
    }

    public String toString() {
        return this.itemName;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MenuItem menuItem = (MenuItem) o;

        return id == menuItem.id;
    }

}
