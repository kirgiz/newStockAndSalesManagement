package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LotRepository extends JpaRepository<Lot, Long>, JpaSpecificationExecutor<Lot> {

}
