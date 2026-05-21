package com.robert.capacity_tool.dto;

public class TeamDto {

    private Long id;

    private String name;

    private String department;

    private String teamLead;

    private String allocation;

    private String duration;

    private String totalEffort;

    private String risk;

    public TeamDto() {
    }

    public TeamDto(
            Long id,
            String name,
            String department,
            String teamLead,
            String allocation,
            String duration,
            String totalEffort,
            String risk
    ) {

        this.id = id;
        this.name = name;
        this.department = department;
        this.teamLead = teamLead;
        this.allocation = allocation;
        this.duration = duration;
        this.totalEffort = totalEffort;
        this.risk = risk;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public String getTeamLead() {
        return teamLead;
    }

    public String getAllocation() {
        return allocation;
    }

    public String getDuration() {
        return duration;
    }

    public String getTotalEffort() {
        return totalEffort;
    }

    public String getRisk() {
        return risk;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setTeamLead(String teamLead) {
        this.teamLead = teamLead;
    }

    public void setAllocation(String allocation) {
        this.allocation = allocation;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setTotalEffort(String totalEffort) {
        this.totalEffort = totalEffort;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }
}
