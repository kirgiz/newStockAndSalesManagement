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

import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.MaterialclassificationRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialclassificationCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialclassificationDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialclassificationMapper;

/**
 * Service for executing complex queries for Materialclassification entities in the database.
 * The main input is a {@link MaterialclassificationCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MaterialclassificationDTO} or a {@link Page} of {@link MaterialclassificationDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MaterialclassificationQueryService extends QueryService<Materialclassification> {

    private final Logger log = LoggerFactory.getLogger(MaterialclassificationQueryService.class);

    private final MaterialclassificationRepository materialclassificationRepository;

    private final MaterialclassificationMapper materialclassificationMapper;

    public MaterialclassificationQueryService(MaterialclassificationRepository materialclassificationRepository, MaterialclassificationMapper materialclassificationMapper) {
        this.materialclassificationRepository = materialclassificationRepository;
        this.materialclassificationMapper = materialclassificationMapper;
    }

    /**
     * Return a {@link List} of {@link MaterialclassificationDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MaterialclassificationDTO> findByCriteria(MaterialclassificationCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Materialclassification> specification = createSpecification(criteria);
        return materialclassificationMapper.toDto(materialclassificationRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MaterialclassificationDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MaterialclassificationDTO> findByCriteria(MaterialclassificationCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Materialclassification> specification = createSpecification(criteria);
        return materialclassificationRepository.findAll(specification, page)
            .map(materialclassificationMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(MaterialclassificationCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Materialclassification> specification = createSpecification(criteria);
        return materialclassificationRepository.count(specification);
    }

    /**
     * Function to convert MaterialclassificationCriteria to a {@link Specification}
     */
    private Specification<Materialclassification> createSpecification(MaterialclassificationCriteria criteria) {
        Specification<Materialclassification> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Materialclassification_.id));
            }
            if (criteria.getCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCode(), Materialclassification_.code));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Materialclassification_.name));
            }
            if (criteria.getComments() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComments(), Materialclassification_.comments));
            }
            if (criteria.getMaterialCategoryId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialCategoryId(),
                    root -> root.join(Materialclassification_.materialCategories, JoinType.LEFT).get(Material_.id)));
            }
            if (criteria.getMaterialCatId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialCatId(),
                    root -> root.join(Materialclassification_.materialCats, JoinType.LEFT).get(Material_.id)));
            }
            if (criteria.getMaterialCategoryDashboardId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialCategoryDashboardId(),
                    root -> root.join(Materialclassification_.materialCategoryDashboards, JoinType.LEFT).get(Dashboard_.id)));
            }
        }
        return specification;
    }
}
