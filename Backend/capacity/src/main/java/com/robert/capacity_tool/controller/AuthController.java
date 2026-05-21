package com.robert.capacity_tool.controller;

import com.robert.capacity_tool.dto.AuthResponse;
import com.robert.capacity_tool.dto.LoginRequest;
import com.robert.capacity_tool.dto.RegisterRequest;
import com.robert.capacity_tool.dto.UserDto;
import com.robert.capacity_tool.entity.Role;
import com.robert.capacity_tool.entity.User;
import com.robert.capacity_tool.repository.RoleRepository;
import com.robert.capacity_tool.repository.UserRepository;
import com.robert.capacity_tool.security.CustomUserDetailsService;
import com.robert.capacity_tool.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService userDetailsService;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder1;

    public AuthController(
            AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService,
            JwtService jwtService,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder1
    ) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder1 = passwordEncoder1;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {

        // Check if username exists
        if (userRepository.existsByUsername(
                request.getUsername()
        )) {

            return "Username already exists";
        }

        // Check if email exists
        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            return "Email already exists";
        }

        // Find ROLE_USER
        Role userRole = roleRepository
                .findByName("ROLE_USER")
                .orElseThrow(() ->
                        new RuntimeException("Role not found")
                );

        // Create user
        User user = new User();

        user.setUsername(request.getUsername());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder1.encode(
                        request.getPassword()
                )
        );

        user.setRoles(Set.of(userRole));

        // Save user
        userRepository.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService
                .loadUserByUsername(
                        request.getUsername()
                );

        String token = jwtService.generateToken(userDetails);

        // Load actual User entity
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        // Extract role names
        List<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .toList();

        // Build DTO
        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                roles
        );

        return new AuthResponse(token, userDto);
    }
}
