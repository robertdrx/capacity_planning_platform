package com.robert.capacity_tool.service;

import com.robert.capacity_tool.entity.Person;
import com.robert.capacity_tool.entity.Quarter;
import com.robert.capacity_tool.entity.Team;
import com.robert.capacity_tool.entity.TeamCapacity;
import com.robert.capacity_tool.repository.QuarterRepository;
import com.robert.capacity_tool.repository.TeamCapacityRepository;
import com.robert.capacity_tool.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class TeamCapacityService {

    private final TeamRepository teamRepository;

    private final QuarterRepository quarterRepository;

    private final TeamCapacityRepository teamCapacityRepository;

    public TeamCapacityService(
            TeamRepository teamRepository,
            QuarterRepository quarterRepository,
            TeamCapacityRepository teamCapacityRepository
    ) {

        this.teamRepository = teamRepository;
        this.quarterRepository = quarterRepository;
        this.teamCapacityRepository = teamCapacityRepository;
    }

    public TeamCapacity calculateCapacity(
            Long teamId,
            Integer year,
            Integer quarterNumber
    ) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() ->
                        new RuntimeException("Team not found")
                );

        Quarter quarter = quarterRepository
                .findByYearYearAndQuarterNumber(
                        year,
                        quarterNumber
                )
                .orElseThrow(() ->
                        new RuntimeException("Quarter not found")
                );

        BigDecimal totalWorkingDays =
                BigDecimal.valueOf(
                        quarter.getTotalWorkingDays()
                );

        BigDecimal totalEffectiveCapacity =
                BigDecimal.ZERO;

        for (Person person : team.getPersons()) {

            BigDecimal vacationDays =
                    BigDecimal.valueOf(
                            person.getVacationDays()
                    );

            BigDecimal personCapacity =
                    totalWorkingDays
                            .subtract(vacationDays)
                            .divide(
                                    totalWorkingDays,
                                    4,
                                    RoundingMode.HALF_UP
                            );

            totalEffectiveCapacity =
                    totalEffectiveCapacity.add(
                            personCapacity
                    );
        }

        TeamCapacity teamCapacity =
                teamCapacityRepository
                        .findByTeamIdAndYearAndQuarter(
                                teamId,
                                year,
                                quarterNumber
                        )
                        .orElse(new TeamCapacity());

        teamCapacity.setTeam(team);
        teamCapacity.setYear(year);
        teamCapacity.setQuarter(quarterNumber);

        teamCapacity.setEffectiveCapacity(
                totalEffectiveCapacity
                        .setScale(2, RoundingMode.HALF_UP)
        );

        return teamCapacityRepository.save(teamCapacity);
    }
}
