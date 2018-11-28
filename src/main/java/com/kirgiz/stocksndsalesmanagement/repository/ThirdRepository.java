package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Third;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Third entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdRepository extends JpaRepository<Third, Long> {

    @Query(value = "select distinct third from Third third left join fetch third.addressthirds",
        countQuery = "select count(distinct third) from Third third")
    Page<Third> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct third from Third third left join fetch third.addressthirds")
    List<Third> findAllWithEagerRelationships();

    @Query("select third from Third third left join fetch third.addressthirds where third.id =:id")
    Optional<Third> findOneWithEagerRelationships(@Param("id") Long id);

}
