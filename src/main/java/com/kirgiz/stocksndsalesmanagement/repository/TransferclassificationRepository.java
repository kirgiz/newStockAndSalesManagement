package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Transferclassification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Transferclassification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferclassificationRepository extends JpaRepository<Transferclassification, Long> {

}
