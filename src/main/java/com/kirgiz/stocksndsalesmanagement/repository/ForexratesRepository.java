package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Forexrates entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ForexratesRepository extends JpaRepository<Forexrates, Long> {

}
