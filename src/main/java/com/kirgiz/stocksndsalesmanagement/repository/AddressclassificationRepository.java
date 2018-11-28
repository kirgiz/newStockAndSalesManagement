package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Addressclassification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Addressclassification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressclassificationRepository extends JpaRepository<Addressclassification, Long> {

}
