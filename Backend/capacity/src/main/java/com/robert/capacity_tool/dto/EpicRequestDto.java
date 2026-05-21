package com.robert.capacity_tool.dto;

import java.math.BigDecimal;

public class EpicRequestDto {

    private String name;

    private BigDecimal effort;

    private String status;

    private BigDecimal requiredFte;

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getEffort() {
        return effort;
    }

    public void setEffort(BigDecimal effort) {
        this.effort = effort;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getRequiredFte() {
        return requiredFte;
    }

    public void setRequiredFte(BigDecimal requiredFte) {
        this.requiredFte = requiredFte;
    }
}
