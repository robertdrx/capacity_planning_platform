package com.robert.capacity_tool.service;

import com.robert.capacity_tool.entity.Person;
import com.robert.capacity_tool.entity.Team;
import com.robert.capacity_tool.repository.PersonRepository;
import com.robert.capacity_tool.repository.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PersonTeamService {

    private final TeamRepository teamRepository;
    private final PersonRepository personRepository;

    public PersonTeamService(
            TeamRepository teamRepository,
            PersonRepository personRepository
    ) {
        this.teamRepository = teamRepository;
        this.personRepository = personRepository;
    }

    @Transactional
    public Person createPersonAndAttachToTeam(Long teamId, Person personRequest) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // 1. Save person first
        Person person = new Person();
        person.setName(personRequest.getName());
        person.setVacationDays(personRequest.getVacationDays());

        // 2. Attach relationship using helper methods
        team.addPerson(person);

        // 3. Persist both sides
        personRepository.save(person);
        teamRepository.save(team);

        return person;
    }
}
