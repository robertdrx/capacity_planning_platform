package com.robert.capacity_tool.controller;

import com.robert.capacity_tool.entity.TeamCapacity;
import com.robert.capacity_tool.service.TeamCapacityService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
public class TeamCapacityController {

    private final TeamCapacityService teamCapacityService;

    public TeamCapacityController(
            TeamCapacityService teamCapacityService
    ) {

        this.teamCapacityService = teamCapacityService;
    }

    @PostMapping("/{teamId}/capacity/calculate")
    public TeamCapacity calculateCapacity(
            @PathVariable Long teamId,
            @RequestParam Integer year,
            @RequestParam Integer quarter
    ) {

        return teamCapacityService.calculateCapacity(
                teamId,
                year,
                quarter
        );
    }
}
