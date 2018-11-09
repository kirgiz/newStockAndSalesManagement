package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Materialclassification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialclassificationRepository extends JpaRepository<Materialclassification, Long> {

}
