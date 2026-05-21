package com.robert.capacity_tool.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "persons")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "vacation_days", nullable = false)
    private Integer vacationDays;

    @JsonIgnore
    @ManyToMany(mappedBy = "persons")
    private List<Team> teams = new ArrayList<>();

    // Constructors

    public Person() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getVacationDays() {
        return vacationDays;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setVacationDays(Integer vacationDays) {
        this.vacationDays = vacationDays;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Person person = (Person) o;

        return id != null && id.equals(person.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
