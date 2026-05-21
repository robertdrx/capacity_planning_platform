package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Initiative;
import com.robert.capacity_tool.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InitiativeRepository extends JpaRepository<Initiative, Long> {

    @Query("""
        SELECT DISTINCT i
        FROM Initiative i
        LEFT JOIN FETCH i.epics
    """)
    List<Initiative> findAllWithEpics();

    @Query("""
    SELECT DISTINCT t
    FROM Initiative i
    JOIN i.epics e
    JOIN e.teams t
    WHERE i.id = :initiativeId
""")
    List<Team> findTeamsByInitiativeId(
            @Param("initiativeId")
            Long initiativeId
    );
}
