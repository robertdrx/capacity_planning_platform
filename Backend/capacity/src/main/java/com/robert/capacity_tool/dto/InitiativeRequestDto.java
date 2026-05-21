package com.robert.capacity_tool.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class InitiativeRequestDto {

    private String name;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private String owner;

    private String strategicObjective;

    private BigDecimal deliveryConfidence;

    private LocalDate predictedCompletion;

    // Getters and Setters

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
}
