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

import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.ForexratesRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.ForexratesMapper;

/**
 * Service for executing complex queries for Forexrates entities in the database.
 * The main input is a {@link ForexratesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ForexratesDTO} or a {@link Page} of {@link ForexratesDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ForexratesQueryService extends QueryService<Forexrates> {

    private final Logger log = LoggerFactory.getLogger(ForexratesQueryService.class);

    private final ForexratesRepository forexratesRepository;

    private final ForexratesMapper forexratesMapper;

    public ForexratesQueryService(ForexratesRepository forexratesRepository, ForexratesMapper forexratesMapper) {
        this.forexratesRepository = forexratesRepository;
        this.forexratesMapper = forexratesMapper;
    }

    /**
     * Return a {@link List} of {@link ForexratesDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ForexratesDTO> findByCriteria(ForexratesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Forexrates> specification = createSpecification(criteria);
        return forexratesMapper.toDto(forexratesRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ForexratesDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ForexratesDTO> findByCriteria(ForexratesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Forexrates> specification = createSpecification(criteria);
        return forexratesRepository.findAll(specification, page)
            .map(forexratesMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ForexratesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Forexrates> specification = createSpecification(criteria);
        return forexratesRepository.count(specification);
    }

    /**
     * Function to convert ForexratesCriteria to a {@link Specification}
     */
    private Specification<Forexrates> createSpecification(ForexratesCriteria criteria) {
        Specification<Forexrates> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Forexrates_.id));
            }
            if (criteria.getRateDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRateDate(), Forexrates_.rateDate));
            }
            if (criteria.getStraighRate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStraighRate(), Forexrates_.straighRate));
            }
            if (criteria.getRateForCurrencyId() != null) {
                specification = specification.and(buildSpecification(criteria.getRateForCurrencyId(),
                    root -> root.join(Forexrates_.rateForCurrency, JoinType.LEFT).get(Currency_.id)));
            }
        }
        return specification;
    }
}
