package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Forexrates entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ForexratesRepository extends JpaRepository<Forexrates, Long>, JpaSpecificationExecutor<Forexrates> {

}
