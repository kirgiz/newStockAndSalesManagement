package com.kirgiz.stocksndsalesmanagement.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.LotRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.LotMapper;

/**
 * Service for executing complex queries for Lot entities in the database.
 * The main input is a {@link LotCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LotDTO} or a {@link Page} of {@link LotDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class LotQueryService extends QueryService<Lot> {

    private final Logger log = LoggerFactory.getLogger(LotQueryService.class);

    private final LotRepository lotRepository;

    private final LotMapper lotMapper;

    public LotQueryService(LotRepository lotRepository, LotMapper lotMapper) {
        this.lotRepository = lotRepository;
        this.lotMapper = lotMapper;
    }

    /**
     * Return a {@link List} of {@link LotDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LotDTO> findByCriteria(LotCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Lot> specification = createSpecification(criteria);
        return lotMapper.toDto(lotRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LotDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LotDTO> findByCriteria(LotCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Lot> specification = createSpecification(criteria);
        return lotRepository.findAll(specification, page)
            .map(lotMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LotCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Lot> specification = createSpecification(criteria);
        return lotRepository.count(specification);
    }

    /**
     * Function to convert LotCriteria to a {@link Specification}
     */
    private Specification<Lot> createSpecification(LotCriteria criteria) {
        Specification<Lot> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Lot_.id));
            }
            if (criteria.getCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCode(), Lot_.code));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Lot_.description));
            }
            if (criteria.getCreationDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCreationDate(), Lot_.creationDate));
            }
            if (criteria.getNumberOfItems() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumberOfItems(), Lot_.numberOfItems));
            }
            if (criteria.getComments() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComments(), Lot_.comments));
            }
            if (criteria.getUnitBuyPrice() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getUnitBuyPrice(), Lot_.unitBuyPrice));
            }
            if (criteria.getItemsGenerated() != null) {
                specification = specification.and(buildSpecification(criteria.getItemsGenerated(), Lot_.itemsGenerated));
            }
            if (criteria.getMaterialLotId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialLotId(),
                    root -> root.join(Lot_.materialLots, JoinType.LEFT).get(Material_.id)));
            }
            if (criteria.getBuycurrencylotId() != null) {
                specification = specification.and(buildSpecification(criteria.getBuycurrencylotId(),
                    root -> root.join(Lot_.buycurrencylot, JoinType.LEFT).get(Currency_.id)));
            }
            if (criteria.getMaterialclassificationId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialclassificationId(),
                    root -> root.join(Lot_.materialclassification, JoinType.LEFT).get(Materialclassification_.id)));
            }
        }
        return specification;
    }
}
