package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Civility;
import com.kirgiz.stocksndsalesmanagement.repository.CivilityRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.CivilityDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.CivilityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Civility.
 */
@Service
@Transactional
public class CivilityService {

    private final Logger log = LoggerFactory.getLogger(CivilityService.class);

    private final CivilityRepository civilityRepository;

    private final CivilityMapper civilityMapper;

    public CivilityService(CivilityRepository civilityRepository, CivilityMapper civilityMapper) {
        this.civilityRepository = civilityRepository;
        this.civilityMapper = civilityMapper;
    }

    /**
     * Save a civility.
     *
     * @param civilityDTO the entity to save
     * @return the persisted entity
     */
    public CivilityDTO save(CivilityDTO civilityDTO) {
        log.debug("Request to save Civility : {}", civilityDTO);
        Civility civility = civilityMapper.toEntity(civilityDTO);
        civility = civilityRepository.save(civility);
        return civilityMapper.toDto(civility);
    }

    /**
     * Get all the civilities.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CivilityDTO> findAll() {
        log.debug("Request to get all Civilities");
        return civilityRepository.findAll().stream()
            .map(civilityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one civility by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CivilityDTO findOne(Long id) {
        log.debug("Request to get Civility : {}", id);
        Civility civility = civilityRepository.findOne(id);
        return civilityMapper.toDto(civility);
    }

    /**
     * Delete the civility by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Civility : {}", id);
        civilityRepository.delete(id);
    }
}
