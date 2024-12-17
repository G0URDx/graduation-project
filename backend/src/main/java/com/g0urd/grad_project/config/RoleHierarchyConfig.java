package com.g0urd.grad_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;

@Configuration
public class RoleHierarchyConfig {

    @SuppressWarnings("deprecation")
    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("""
                    ROLE_ADMIN > ROLE_MANAGER
                    ROLE_ADMIN > ROLE_SCHEDULER
                """);
        return roleHierarchy;
    }

}
