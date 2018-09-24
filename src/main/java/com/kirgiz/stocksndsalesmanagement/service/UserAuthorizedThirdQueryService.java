package com.kirgiz.stocksndsalesmanagement.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
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
 * The main input is a {@link UserAuthorizedThirdCriteria} which get's converted to {@link Specifications},
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
        final Specifications<UserAuthorizedThird> specification = createSpecification(criteria);
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
        final Specifications<UserAuthorizedThird> specification = createSpecification(criteria);
        final Page<UserAuthorizedThird> result = userAuthorizedThirdRepository.findAll(specification, page);
        return result.map(userAuthorizedThirdMapper::toDto);
    }

    /**
     * Function to convert UserAuthorizedThirdCriteria to a {@link Specifications}
     */
    private Specifications<UserAuthorizedThird> createSpecification(UserAuthorizedThirdCriteria criteria) {
        Specifications<UserAuthorizedThird> specification = Specifications.where(null);
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
                specification = specification.and(buildReferringEntitySpecification(criteria.getUserAuthId(), UserAuthorizedThird_.userAuth, User_.id));
            }
            if (criteria.getThirdAuthId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getThirdAuthId(), UserAuthorizedThird_.thirdAuth, Third_.id));
            }
        }
        return specification;
    }

}
