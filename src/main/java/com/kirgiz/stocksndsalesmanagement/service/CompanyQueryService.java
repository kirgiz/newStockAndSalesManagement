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

import com.kirgiz.stocksndsalesmanagement.domain.Company;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.CompanyRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.CompanyCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.CompanyDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.CompanyMapper;

/**
 * Service for executing complex queries for Company entities in the database.
 * The main input is a {@link CompanyCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CompanyDTO} or a {@link Page} of {@link CompanyDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CompanyQueryService extends QueryService<Company> {

    private final Logger log = LoggerFactory.getLogger(CompanyQueryService.class);

    private final CompanyRepository companyRepository;

    private final CompanyMapper companyMapper;

    public CompanyQueryService(CompanyRepository companyRepository, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
    }

    /**
     * Return a {@link List} of {@link CompanyDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CompanyDTO> findByCriteria(CompanyCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Company> specification = createSpecification(criteria);
        return companyMapper.toDto(companyRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CompanyDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CompanyDTO> findByCriteria(CompanyCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Company> specification = createSpecification(criteria);
        return companyRepository.findAll(specification, page)
            .map(companyMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CompanyCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Company> specification = createSpecification(criteria);
        return companyRepository.count(specification);
    }

    /**
     * Function to convert CompanyCriteria to a {@link Specification}
     */
    private Specification<Company> createSpecification(CompanyCriteria criteria) {
        Specification<Company> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Company_.id));
            }
            if (criteria.getCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCode(), Company_.code));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Company_.name));
            }
            if (criteria.getComments() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComments(), Company_.comments));
            }
            if (criteria.getBaseCurrencyId() != null) {
                specification = specification.and(buildSpecification(criteria.getBaseCurrencyId(),
                    root -> root.join(Company_.baseCurrency, JoinType.LEFT).get(Currency_.id)));
            }
        }
        return specification;
    }
}
