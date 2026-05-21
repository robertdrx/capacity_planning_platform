package com.robert.capacity_tool.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;


        // No token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);

            return;
        }

        // Extract token
        jwt = authHeader.substring(7);

        // Extract username
        username = jwtService.extractUsername(jwt);

        System.out.println("Auth header: " + authHeader);
        System.out.println("JWT: " + jwt);
        System.out.println("Username: " + username);

        // Authenticate only if not already authenticated
        if (
                username != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null
        ) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            // Validate token
            if (jwtService.isTokenValid(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // VERY IMPORTANT
                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }
        }

        System.out.println(
                SecurityContextHolder.getContext().getAuthentication()
        );

        filterChain.doFilter(request, response);
    }
}
