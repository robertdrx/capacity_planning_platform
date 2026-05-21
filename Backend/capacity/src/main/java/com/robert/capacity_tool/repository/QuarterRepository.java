package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Quarter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuarterRepository
        extends JpaRepository<Quarter, Long> {

    List<Quarter> findByYearId(Long yearId);

    List<Quarter> findByYearYear(Integer year);

    Optional<Quarter> findByYearYearAndQuarterNumber(
            Integer year,
            Integer quarterNumber
    );
}
