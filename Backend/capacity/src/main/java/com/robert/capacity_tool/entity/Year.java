package com.robert.capacity_tool.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "years")
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer year;

    @OneToMany(
            mappedBy = "year",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Quarter> quarters = new ArrayList<>();

    // Constructors

    public Year() {
    }

    // Helper methods

    public void addQuarter(Quarter quarter) {
        quarters.add(quarter);
        quarter.setYear(this);
    }

    public void removeQuarter(Quarter quarter) {
        quarters.remove(quarter);
        quarter.setYear(null);
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Quarter> getQuarters() {
        return quarters;
    }

    public void setQuarters(List<Quarter> quarters) {
        this.quarters = quarters;
    }
}
