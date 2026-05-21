package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByName(String name);

    boolean existsByName(String name);

    List<Person> findByTeams_Id(Long teamId);

    @Query("SELECT p FROM Person p JOIN p.teams t WHERE t.id = :teamId")
    List<Person> findByTeamId(@Param("teamId") Long teamId);

}
