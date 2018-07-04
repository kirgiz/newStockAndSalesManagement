package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Thirdclassification;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Thirdclassification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdclassificationRepository extends JpaRepository<Thirdclassification, Long> {

}
