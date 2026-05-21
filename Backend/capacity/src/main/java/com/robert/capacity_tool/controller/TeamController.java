package com.robert.capacity_tool.controller;

import com.robert.capacity_tool.dto.CreatePersonRequest;
import com.robert.capacity_tool.entity.Person;
import com.robert.capacity_tool.entity.Team;
import com.robert.capacity_tool.service.PersonService;
import com.robert.capacity_tool.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    private final PersonService personService;

    public TeamController(
            TeamService teamService,
            PersonService personService
    ) {

        this.teamService = teamService;
        this.personService = personService;
    }

    @GetMapping
    public List<Team> getAllTeams() {

        return teamService.getAllTeams();
    }

    @PostMapping("/{teamId}/persons")
    public ResponseEntity<Person> createPersonAndAddToTeam(
            @PathVariable Long teamId,
            @RequestBody CreatePersonRequest request
    ) {

        Person createdPerson = personService
                .createAndAttachToTeam(teamId, request);

        return ResponseEntity.ok(createdPerson);
    }
}
