package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
