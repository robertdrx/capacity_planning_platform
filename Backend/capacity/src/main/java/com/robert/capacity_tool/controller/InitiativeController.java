package com.robert.capacity_tool.controller;

import com.robert.capacity_tool.dto.InitiativeRequestDto;
import com.robert.capacity_tool.dto.TeamDto;
import com.robert.capacity_tool.entity.Initiative;
import com.robert.capacity_tool.service.InitiativeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/initiatives")
public class InitiativeController {

    private final InitiativeService initiativeService;

    public InitiativeController(InitiativeService initiativeService) {
        this.initiativeService = initiativeService;
    }

    @GetMapping
    public List<Initiative> getAllInitiatives() {
        return initiativeService.getAllInitiativesWithEpics();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Initiative createInitiative(
            @RequestBody InitiativeRequestDto request
    ) {
        return initiativeService.createInitiative(request);
    }

    @GetMapping("/{initiativeId}/teams")
    public ResponseEntity<List<TeamDto>>
    getTeamsForInitiative(
            @PathVariable Long initiativeId
    ) {

        List<TeamDto> teams =
                initiativeService
                        .getTeamsForInitiative(
                                initiativeId
                        );

        return ResponseEntity.ok(teams);
    }
}
