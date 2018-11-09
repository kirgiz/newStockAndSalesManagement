package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Civility;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Civility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CivilityRepository extends JpaRepository<Civility, Long> {

}
