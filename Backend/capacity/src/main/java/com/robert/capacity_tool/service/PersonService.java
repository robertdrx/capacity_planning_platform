package com.robert.capacity_tool.service;

import com.robert.capacity_tool.dto.CreatePersonRequest;
import com.robert.capacity_tool.entity.Person;
import com.robert.capacity_tool.entity.Team;
import com.robert.capacity_tool.repository.PersonRepository;
import com.robert.capacity_tool.repository.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private final TeamRepository teamRepository;
    private final PersonRepository personRepository;

    public PersonService(
            TeamRepository teamRepository,
            PersonRepository personRepository
    ) {
        this.teamRepository = teamRepository;
        this.personRepository = personRepository;
    }

    @Transactional
    public Person createAndAttachToTeam(Long teamId, CreatePersonRequest request) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        Person person = new Person();
        person.setName(request.getName());
        person.setVacationDays(request.getVacationDays());

        // Save person first
        personRepository.save(person);

        // Attach relationship (important: uses helper method)
        team.addPerson(person);

        // Save team to persist join table
        teamRepository.save(team);

        return person;
    }
}
