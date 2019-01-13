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

import com.kirgiz.stocksndsalesmanagement.domain.Currency;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.CurrencyRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.CurrencyCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.CurrencyDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.CurrencyMapper;

/**
 * Service for executing complex queries for Currency entities in the database.
 * The main input is a {@link CurrencyCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CurrencyDTO} or a {@link Page} of {@link CurrencyDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CurrencyQueryService extends QueryService<Currency> {

    private final Logger log = LoggerFactory.getLogger(CurrencyQueryService.class);

    private final CurrencyRepository currencyRepository;

    private final CurrencyMapper currencyMapper;

    public CurrencyQueryService(CurrencyRepository currencyRepository, CurrencyMapper currencyMapper) {
        this.currencyRepository = currencyRepository;
        this.currencyMapper = currencyMapper;
    }

    /**
     * Return a {@link List} of {@link CurrencyDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CurrencyDTO> findByCriteria(CurrencyCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Currency> specification = createSpecification(criteria);
        return currencyMapper.toDto(currencyRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CurrencyDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CurrencyDTO> findByCriteria(CurrencyCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Currency> specification = createSpecification(criteria);
        return currencyRepository.findAll(specification, page)
            .map(currencyMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CurrencyCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Currency> specification = createSpecification(criteria);
        return currencyRepository.count(specification);
    }

    /**
     * Function to convert CurrencyCriteria to a {@link Specification}
     */
    private Specification<Currency> createSpecification(CurrencyCriteria criteria) {
        Specification<Currency> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Currency_.id));
            }
            if (criteria.getIsoCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getIsoCode(), Currency_.isoCode));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Currency_.name));
            }
            if (criteria.getCompanyBaseCurrencyId() != null) {
                specification = specification.and(buildSpecification(criteria.getCompanyBaseCurrencyId(),
                    root -> root.join(Currency_.companyBaseCurrencies, JoinType.LEFT).get(Company_.id)));
            }
            if (criteria.getCurrencyRateId() != null) {
                specification = specification.and(buildSpecification(criteria.getCurrencyRateId(),
                    root -> root.join(Currency_.currencyRates, JoinType.LEFT).get(Forexrates_.id)));
            }
            if (criteria.getCurrencyDashboardId() != null) {
                specification = specification.and(buildSpecification(criteria.getCurrencyDashboardId(),
                    root -> root.join(Currency_.currencyDashboards, JoinType.LEFT).get(Dashboard_.id)));
            }
            if (criteria.getLotBuyCurrencyId() != null) {
                specification = specification.and(buildSpecification(criteria.getLotBuyCurrencyId(),
                    root -> root.join(Currency_.lotBuyCurrencies, JoinType.LEFT).get(Lot_.id)));
            }
        }
        return specification;
    }
}
