package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository
        extends JpaRepository<Team, Long> {

    @Query("""
        SELECT DISTINCT t
        FROM Team t
        LEFT JOIN FETCH t.persons
        LEFT JOIN FETCH t.capacities
    """)
    List<Team> findAllWithPersonsAndCapacities();

    @Query("""
        SELECT DISTINCT t
        FROM Team t
        LEFT JOIN FETCH t.persons
    """)
    List<Team> findAllWithPersons();
}
