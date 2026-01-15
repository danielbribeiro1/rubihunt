package com.rubihunt.rubihunt_api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapeia a URL "http://localhost:8080/images/..." para a pasta "uploads/" no seu projeto
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/");
    }
}