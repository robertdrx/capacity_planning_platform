package com.robert.capacity_tool.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(name = "support_overhead", precision = 5, scale = 2)
    private BigDecimal supportOverhead;

    @Column(name = "team_lead", nullable = false)
    private String teamLead;

    @Column(name = "allocation")
    private String allocation;

    @Column(name = "duration")
    private String duration;

    @Column(name = "total_effort")
    private String totalEffort;

    @Column(name = "risk")
    private String risk;

    @ManyToMany
    @JoinTable(
            name = "team_persons",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id")
    )
    private Set<Person> persons = new HashSet<>();

    @JsonManagedReference
    @OneToMany(
            mappedBy = "team",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<TeamCapacity> capacities = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "teams")
    private Set<Epic> epics = new HashSet<>();

    // Constructors

    public Team() {
    }

    // Helper methods

    public void addPerson(Person person) {
        persons.add(person);
        person.getTeams().add(this);
    }

    public void removePerson(Person person) {
        persons.remove(person);
        person.getTeams().remove(this);
    }

    public void addCapacity(TeamCapacity capacity) {
        capacities.add(capacity);
        capacity.setTeam(this);
    }

    public void removeCapacity(TeamCapacity capacity) {
        capacities.remove(capacity);
        capacity.setTeam(null);
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public BigDecimal getSupportOverhead() {
        return supportOverhead;
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

    public Set<Person> getPersons() {
        return persons;
    }

    public List<TeamCapacity> getCapacities() {
        return capacities;
    }

    public Set<Epic> getEpics() {
        return epics;
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

    public void setSupportOverhead(BigDecimal supportOverhead) {
        this.supportOverhead = supportOverhead;
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

    public void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    public void setCapacities(List<TeamCapacity> capacities) {
        this.capacities = capacities;
    }

    public void setEpics(Set<Epic> epics) {
        this.epics = epics;
    }
}
