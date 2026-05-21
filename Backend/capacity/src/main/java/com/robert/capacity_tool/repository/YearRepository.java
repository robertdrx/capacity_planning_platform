package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Year;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface YearRepository
        extends JpaRepository<Year, Long> {

    Optional<Year> findByYear(Integer year);
}