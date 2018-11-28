package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Thirdclassification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Thirdclassification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdclassificationRepository extends JpaRepository<Thirdclassification, Long> {

}
