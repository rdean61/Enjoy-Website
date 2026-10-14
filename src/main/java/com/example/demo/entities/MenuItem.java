package com.example.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "MenuItems")
public abstract class MenuItem {
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

    public MenuItem(String itemName, LocalDate addDate, LocalDate removeDate, String treatType, String itemTags){
        this.itemName = itemName;
        this.addDate = addDate;
        this.removeDate = removeDate;
        this.treatType = treatType;
        this.itemTags = itemTags;
    }

    public MenuItem(long id, String itemName, LocalDate addDate, LocalDate removeDate, String treatType, String itemTags){
        this.id = id;
        this.itemName = itemName;
        this.addDate = addDate;
        this.removeDate = removeDate;
        this.treatType = treatType;
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
