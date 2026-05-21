package com.robert.capacity_tool.service;

import com.robert.capacity_tool.dto.InitiativeRequestDto;
import com.robert.capacity_tool.dto.TeamDto;
import com.robert.capacity_tool.entity.Initiative;
import com.robert.capacity_tool.repository.InitiativeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class InitiativeService {

    private final InitiativeRepository initiativeRepository;

    public InitiativeService(InitiativeRepository initiativeRepository) {
        this.initiativeRepository = initiativeRepository;
    }

    public List<Initiative> getAllInitiativesWithEpics() {
        return initiativeRepository.findAllWithEpics();
    }

    public Initiative createInitiative(InitiativeRequestDto dto) {

        Initiative initiative = new Initiative();

        initiative.setName(dto.getName());
        initiative.setDescription(dto.getDescription());
        initiative.setStartDate(dto.getStartDate());
        initiative.setEndDate(dto.getEndDate());
        initiative.setOwner(dto.getOwner());
        initiative.setStrategicObjective(dto.getStrategicObjective());
        initiative.setDeliveryConfidence(dto.getDeliveryConfidence());
        initiative.setPredictedCompletion(dto.getPredictedCompletion());

        initiative.setCreatedAt(LocalDateTime.now());
        initiative.setUpdatedAt(LocalDateTime.now());

        return initiativeRepository.save(initiative);
    }

    public List<TeamDto> getTeamsForInitiative(
            Long initiativeId
    ) {

        return initiativeRepository
                .findTeamsByInitiativeId(
                        initiativeId
                )
                .stream()
                .map(team -> new TeamDto(
                        team.getId(),
                        team.getName(),
                        team.getDepartment(),
                        team.getTeamLead(),
                        team.getAllocation(),
                        team.getDuration(),
                        team.getTotalEffort(),
                        team.getRisk()

                ))
                .toList();
    }
}
