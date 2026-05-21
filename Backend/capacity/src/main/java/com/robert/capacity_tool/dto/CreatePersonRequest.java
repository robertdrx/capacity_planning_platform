package com.robert.capacity_tool.dto;

public class CreatePersonRequest {

    private String name;

    private Integer vacationDays;

    public String getName() {
        return name;
    }

    public Integer getVacationDays() {
        return vacationDays;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setVacationDays(Integer vacationDays) {
        this.vacationDays = vacationDays;
    }
}
