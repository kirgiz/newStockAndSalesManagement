package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Lot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LotRepository extends JpaRepository<Lot, Long> {

}
