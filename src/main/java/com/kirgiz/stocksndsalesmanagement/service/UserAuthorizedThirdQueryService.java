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

import com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird;
import com.kirgiz.stocksndsalesmanagement.domain.*; // for static metamodels
import com.kirgiz.stocksndsalesmanagement.repository.UserAuthorizedThirdRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdCriteria;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.UserAuthorizedThirdMapper;

/**
 * Service for executing complex queries for UserAuthorizedThird entities in the database.
 * The main input is a {@link UserAuthorizedThirdCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link UserAuthorizedThirdDTO} or a {@link Page} of {@link UserAuthorizedThirdDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UserAuthorizedThirdQueryService extends QueryService<UserAuthorizedThird> {

    private final Logger log = LoggerFactory.getLogger(UserAuthorizedThirdQueryService.class);

    private final UserAuthorizedThirdRepository userAuthorizedThirdRepository;

    private final UserAuthorizedThirdMapper userAuthorizedThirdMapper;

    public UserAuthorizedThirdQueryService(UserAuthorizedThirdRepository userAuthorizedThirdRepository, UserAuthorizedThirdMapper userAuthorizedThirdMapper) {
        this.userAuthorizedThirdRepository = userAuthorizedThirdRepository;
        this.userAuthorizedThirdMapper = userAuthorizedThirdMapper;
    }

    /**
     * Return a {@link List} of {@link UserAuthorizedThirdDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<UserAuthorizedThirdDTO> findByCriteria(UserAuthorizedThirdCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<UserAuthorizedThird> specification = createSpecification(criteria);
        return userAuthorizedThirdMapper.toDto(userAuthorizedThirdRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link UserAuthorizedThirdDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<UserAuthorizedThirdDTO> findByCriteria(UserAuthorizedThirdCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<UserAuthorizedThird> specification = createSpecification(criteria);
        return userAuthorizedThirdRepository.findAll(specification, page)
            .map(userAuthorizedThirdMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UserAuthorizedThirdCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<UserAuthorizedThird> specification = createSpecification(criteria);
        return userAuthorizedThirdRepository.count(specification);
    }

    /**
     * Function to convert UserAuthorizedThirdCriteria to a {@link Specification}
     */
    private Specification<UserAuthorizedThird> createSpecification(UserAuthorizedThirdCriteria criteria) {
        Specification<UserAuthorizedThird> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), UserAuthorizedThird_.id));
            }
            if (criteria.getDefaultThird() != null) {
                specification = specification.and(buildSpecification(criteria.getDefaultThird(), UserAuthorizedThird_.defaultThird));
            }
            if (criteria.getDefaultDestination() != null) {
                specification = specification.and(buildSpecification(criteria.getDefaultDestination(), UserAuthorizedThird_.defaultDestination));
            }
            if (criteria.getUserAuthId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserAuthId(),
                    root -> root.join(UserAuthorizedThird_.userAuth, JoinType.LEFT).get(User_.id)));
            }
            if (criteria.getThirdAuthId() != null) {
                specification = specification.and(buildSpecification(criteria.getThirdAuthId(),
                    root -> root.join(UserAuthorizedThird_.thirdAuth, JoinType.LEFT).get(Third_.id)));
            }
        }
        return specification;
    }
}
