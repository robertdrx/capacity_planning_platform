package com.robert.capacity_tool.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "initiatives")
public class Initiative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    private String owner;

    @Column(name = "strategic_objective")
    private String strategicObjective;

    @Column(name = "delivery_confidence", precision = 5, scale = 2)
    private BigDecimal deliveryConfidence;

    @Column(name = "predicted_completion")
    private LocalDate predictedCompletion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "initiative",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Epic> epics = new ArrayList<>();

    // Constructors

    public Initiative() {
    }

    // Helper methods

    public void addEpic(Epic epic) {
        epics.add(epic);
        epic.setInitiative(this);
    }

    public void removeEpic(Epic epic) {
        epics.remove(epic);
        epic.setInitiative(null);
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getStrategicObjective() {
        return strategicObjective;
    }

    public void setStrategicObjective(String strategicObjective) {
        this.strategicObjective = strategicObjective;
    }

    public BigDecimal getDeliveryConfidence() {
        return deliveryConfidence;
    }

    public void setDeliveryConfidence(BigDecimal deliveryConfidence) {
        this.deliveryConfidence = deliveryConfidence;
    }

    public LocalDate getPredictedCompletion() {
        return predictedCompletion;
    }

    public void setPredictedCompletion(LocalDate predictedCompletion) {
        this.predictedCompletion = predictedCompletion;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Epic> getEpics() {
        return epics;
    }

    public void setEpics(List<Epic> epics) {
        this.epics = epics;
    }
}
