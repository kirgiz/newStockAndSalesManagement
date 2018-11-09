package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.Materialhistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Materialhistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialhistoryRepository extends JpaRepository<Materialhistory, Long> {

    @Query(value = "select distinct materialhistory from Materialhistory materialhistory left join fetch materialhistory.itemTransfereds",
        countQuery = "select count(distinct materialhistory) from Materialhistory materialhistory")
    Page<Materialhistory> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct materialhistory from Materialhistory materialhistory left join fetch materialhistory.itemTransfereds")
    List<Materialhistory> findAllWithEagerRelationships();

    @Query("select materialhistory from Materialhistory materialhistory left join fetch materialhistory.itemTransfereds where materialhistory.id =:id")
    Optional<Materialhistory> findOneWithEagerRelationships(@Param("id") Long id);

}
