package com.robert.capacity_tool.repository;

import com.robert.capacity_tool.entity.Epic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpicRepository
        extends JpaRepository<Epic, Long> {
}
