package com.robert.capacity_tool.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(
        name = "team_capacity",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "team_id",
                                "year",
                                "quarter"
                        }
                )
        }
)
public class TeamCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer quarter;

    @Column(name = "effective_capacity", precision = 10, scale = 2)
    private BigDecimal effectiveCapacity;

    // Constructors

    public TeamCapacity() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Team getTeam() {
        return team;
    }

    public Integer getYear() {
        return year;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public BigDecimal getEffectiveCapacity() {
        return effectiveCapacity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

    public void setEffectiveCapacity(BigDecimal effectiveCapacity) {
        this.effectiveCapacity = effectiveCapacity;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeamCapacity that = (TeamCapacity) o;

        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
