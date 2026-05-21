package com.robert.capacity_tool.service;

import com.robert.capacity_tool.dto.EpicRequestDto;
import com.robert.capacity_tool.entity.Epic;
import com.robert.capacity_tool.entity.Initiative;
import com.robert.capacity_tool.repository.EpicRepository;
import com.robert.capacity_tool.repository.InitiativeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EpicService {

    private final EpicRepository epicRepository;

    private final InitiativeRepository initiativeRepository;

    public EpicService(
            EpicRepository epicRepository,
            InitiativeRepository initiativeRepository
    ) {

        this.epicRepository = epicRepository;
        this.initiativeRepository = initiativeRepository;
    }

    public Epic createEpic(
            Long initiativeId,
            EpicRequestDto dto
    ) {

        Initiative initiative =
                initiativeRepository.findById(initiativeId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Initiative not found"
                                )
                        );

        Epic epic = new Epic();

        epic.setName(dto.getName());
        epic.setEffort(dto.getEffort());
        epic.setStatus(dto.getStatus());
        epic.setRequiredFte(dto.getRequiredFte());

        epic.setCreatedAt(LocalDateTime.now());
        epic.setUpdatedAt(LocalDateTime.now());

        // Attach epic to initiative
        initiative.addEpic(epic);

        // Save epic
        return epicRepository.save(epic);
    }
}
