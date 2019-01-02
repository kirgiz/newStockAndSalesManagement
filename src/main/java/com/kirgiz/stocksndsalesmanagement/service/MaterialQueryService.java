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

import com.kirgiz.stocksndsalesmanagement.domain.Material;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.MaterialRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialMapper;

/**
 * Service for executing complex queries for Material entities in the database.
 * The main input is a {@link MaterialCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MaterialDTO} or a {@link Page} of {@link MaterialDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MaterialQueryService extends QueryService<Material> {

    private final Logger log = LoggerFactory.getLogger(MaterialQueryService.class);

    private final MaterialRepository materialRepository;

    private final MaterialMapper materialMapper;

    public MaterialQueryService(MaterialRepository materialRepository, MaterialMapper materialMapper) {
        this.materialRepository = materialRepository;
        this.materialMapper = materialMapper;
    }

    /**
     * Return a {@link List} of {@link MaterialDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MaterialDTO> findByCriteria(MaterialCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Material> specification = createSpecification(criteria);
        return materialMapper.toDto(materialRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MaterialDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MaterialDTO> findByCriteria(MaterialCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Material> specification = createSpecification(criteria);
        return materialRepository.findAll(specification, page)
            .map(materialMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(MaterialCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Material> specification = createSpecification(criteria);
        return materialRepository.count(specification);
    }

    /**
     * Function to convert MaterialCriteria to a {@link Specification}
     */
    private Specification<Material> createSpecification(MaterialCriteria criteria) {
        Specification<Material> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Material_.id));
            }
            if (criteria.getCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCode(), Material_.code));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Material_.description));
            }
            if (criteria.getCreationDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCreationDate(), Material_.creationDate));
            }
            if (criteria.getComments() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComments(), Material_.comments));
            }
            if (criteria.getCurrentLocation() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCurrentLocation(), Material_.currentLocation));
            }
            if (criteria.getMaterialTypeDefId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialTypeDefId(),
                    root -> root.join(Material_.materialTypeDef, JoinType.LEFT).get(Materialclassification_.id)));
            }
            if (criteria.getLotIdentifierId() != null) {
                specification = specification.and(buildSpecification(criteria.getLotIdentifierId(),
                    root -> root.join(Material_.lotIdentifier, JoinType.LEFT).get(Lot_.id)));
            }
            if (criteria.getMaterialTypeCatId() != null) {
                specification = specification.and(buildSpecification(criteria.getMaterialTypeCatId(),
                    root -> root.join(Material_.materialTypeCat, JoinType.LEFT).get(Materialclassification_.id)));
            }
        }
        return specification;
    }
}
