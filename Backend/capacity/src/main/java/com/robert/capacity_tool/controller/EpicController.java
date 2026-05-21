package com.robert.capacity_tool.controller;

import com.robert.capacity_tool.dto.EpicRequestDto;
import com.robert.capacity_tool.entity.Epic;
import com.robert.capacity_tool.entity.Initiative;
import com.robert.capacity_tool.service.EpicService;
import com.robert.capacity_tool.service.InitiativeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/initiatives")
public class EpicController {

    private final EpicService epicService;

    private final InitiativeService initiativeService;

    public EpicController(InitiativeService initiativeService, EpicService epicService) {
        this.initiativeService = initiativeService;
        this.epicService = epicService;
    }

    @PostMapping("/{initiativeId}/epics")
    @ResponseStatus(HttpStatus.CREATED)
    public Epic createEpic(
            @PathVariable Long initiativeId,
            @RequestBody EpicRequestDto request
    ) {

        return epicService.createEpic(
                initiativeId,
                request
        );
    }
}
