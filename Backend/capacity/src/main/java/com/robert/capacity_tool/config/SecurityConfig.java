package com.robert.capacity_tool.config;

import com.robert.capacity_tool.security.CustomUserDetailsService;
import com.robert.capacity_tool.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;



@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(
            JwtAuthFilter jwtAuthFilter,
            CustomUserDetailsService customUserDetailsService
    ) {

        this.jwtAuthFilter = jwtAuthFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * Main Spring Security configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CorsConfigurationSource corsConfigurationSource
    ) throws Exception {

        http

                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                // Stateless JWT authentication
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Route authorization
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public endpoints
                        .requestMatchers(
                                "/auth/**"
                        ).permitAll()

//                        .requestMatchers(
//                                "/api/**"
//                        ).permitAll()

                        // Admin endpoints
                        .requestMatchers(
                                "/admin/**"
                        ).hasRole("ADMIN")

                        // Manager endpoints
                        .requestMatchers(
                                "/manager/**"
                        ).hasAnyRole("ADMIN", "MANAGER")

                        // Everything else requires login
                        .anyRequest()
                        .authenticated()
                )

                // Authentication provider
                .authenticationProvider(authenticationProvider())

                // JWT filter
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder1() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication provider
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(
                customUserDetailsService
        );

        authProvider.setPasswordEncoder(
                passwordEncoder1()
        );

        return authProvider;
    }

    /**
     * Authentication manager
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }

}
