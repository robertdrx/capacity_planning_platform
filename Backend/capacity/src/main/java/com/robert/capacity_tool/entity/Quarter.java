package com.robert.capacity_tool.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "quarters",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "year_id",
                                "quarter_number"
                        }
                )
        }
)
public class Quarter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_id", nullable = false)
    private Year year;

    @Column(name = "quarter_number", nullable = false)
    private Integer quarterNumber;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "total_working_days", nullable = false)
    private Integer totalWorkingDays;

    // Constructors

    public Quarter() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public Integer getQuarterNumber() {
        return quarterNumber;
    }

    public void setQuarterNumber(Integer quarterNumber) {
        this.quarterNumber = quarterNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getTotalWorkingDays() {
        return totalWorkingDays;
    }

    public void setTotalWorkingDays(Integer totalWorkingDays) {
        this.totalWorkingDays = totalWorkingDays;
    }

    public void setId(Long id) {
        this.id = id;
    }
}