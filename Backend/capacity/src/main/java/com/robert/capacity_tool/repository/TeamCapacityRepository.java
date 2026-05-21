package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.TeamCapacity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamCapacityRepository
        extends JpaRepository<TeamCapacity, Long> {

    List<TeamCapacity> findByTeamId(Long teamId);

    List<TeamCapacity> findByYear(Integer year);

    List<TeamCapacity> findByYearAndQuarter(
            Integer year,
            Integer quarter
    );

    Optional<TeamCapacity> findByTeamIdAndYearAndQuarter(
            Long teamId,
            Integer year,
            Integer quarter
    );
}
