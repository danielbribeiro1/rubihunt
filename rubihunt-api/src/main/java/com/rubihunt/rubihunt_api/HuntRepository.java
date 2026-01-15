package com.rubihunt.rubihunt_api;

import org.springframework.data.jpa.repository.JpaRepository;

// Ao estender JpaRepository, ganhamos de graça métodos como .save() e .findAll()
public interface HuntRepository extends JpaRepository<Hunt, Long> {
}
