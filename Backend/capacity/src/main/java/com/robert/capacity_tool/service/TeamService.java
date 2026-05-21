package com.robert.capacity_tool.service;

import com.robert.capacity_tool.entity.Team;
import com.robert.capacity_tool.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(
            TeamRepository teamRepository
    ) {

        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {

        return teamRepository
                .findAllWithPersons();
    }
}
