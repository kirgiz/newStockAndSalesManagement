package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import com.kirgiz.stocksndsalesmanagement.repository.ForexratesRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.ForexratesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Forexrates.
 */
@Service
@Transactional
public class ForexratesService {

    private final Logger log = LoggerFactory.getLogger(ForexratesService.class);

    private final ForexratesRepository forexratesRepository;

    private final ForexratesMapper forexratesMapper;

    public ForexratesService(ForexratesRepository forexratesRepository, ForexratesMapper forexratesMapper) {
        this.forexratesRepository = forexratesRepository;
        this.forexratesMapper = forexratesMapper;
    }

    /**
     * Save a forexrates.
     *
     * @param forexratesDTO the entity to save
     * @return the persisted entity
     */
    public ForexratesDTO save(ForexratesDTO forexratesDTO) {
        log.debug("Request to save Forexrates : {}", forexratesDTO);
        Forexrates forexrates = forexratesMapper.toEntity(forexratesDTO);
        forexrates = forexratesRepository.save(forexrates);
        return forexratesMapper.toDto(forexrates);
    }

    /**
     * Get all the forexrates.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ForexratesDTO> findAll() {
        log.debug("Request to get all Forexrates");
        return forexratesRepository.findAll().stream()
            .map(forexratesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one forexrates by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ForexratesDTO findOne(Long id) {
        log.debug("Request to get Forexrates : {}", id);
        Forexrates forexrates = forexratesRepository.findOne(id);
        return forexratesMapper.toDto(forexrates);
    }

    /**
     * Delete the forexrates by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Forexrates : {}", id);
        forexratesRepository.delete(id);
    }
}
