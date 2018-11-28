package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird;
import com.kirgiz.stocksndsalesmanagement.repository.UserAuthorizedThirdRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.UserAuthorizedThirdMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing UserAuthorizedThird.
 */
@Service
@Transactional
public class UserAuthorizedThirdService {

    private final Logger log = LoggerFactory.getLogger(UserAuthorizedThirdService.class);

    private final UserAuthorizedThirdRepository userAuthorizedThirdRepository;

    private final UserAuthorizedThirdMapper userAuthorizedThirdMapper;

    public UserAuthorizedThirdService(UserAuthorizedThirdRepository userAuthorizedThirdRepository, UserAuthorizedThirdMapper userAuthorizedThirdMapper) {
        this.userAuthorizedThirdRepository = userAuthorizedThirdRepository;
        this.userAuthorizedThirdMapper = userAuthorizedThirdMapper;
    }

    /**
     * Save a userAuthorizedThird.
     *
     * @param userAuthorizedThirdDTO the entity to save
     * @return the persisted entity
     */
    public UserAuthorizedThirdDTO save(UserAuthorizedThirdDTO userAuthorizedThirdDTO) {
        log.debug("Request to save UserAuthorizedThird : {}", userAuthorizedThirdDTO);

        UserAuthorizedThird userAuthorizedThird = userAuthorizedThirdMapper.toEntity(userAuthorizedThirdDTO);
        userAuthorizedThird = userAuthorizedThirdRepository.save(userAuthorizedThird);
        return userAuthorizedThirdMapper.toDto(userAuthorizedThird);
    }

    /**
     * Get all the userAuthorizedThirds.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserAuthorizedThirdDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserAuthorizedThirds");
        return userAuthorizedThirdRepository.findAll(pageable)
            .map(userAuthorizedThirdMapper::toDto);
    }


    /**
     * Get one userAuthorizedThird by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserAuthorizedThirdDTO> findOne(Long id) {
        log.debug("Request to get UserAuthorizedThird : {}", id);
        return userAuthorizedThirdRepository.findById(id)
            .map(userAuthorizedThirdMapper::toDto);
    }

    /**
     * Delete the userAuthorizedThird by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserAuthorizedThird : {}", id);
        userAuthorizedThirdRepository.deleteById(id);
    }
}
