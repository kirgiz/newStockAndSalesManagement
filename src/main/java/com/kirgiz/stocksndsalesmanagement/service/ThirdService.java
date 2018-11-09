package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Third;
import com.kirgiz.stocksndsalesmanagement.repository.ThirdRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.ThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.ThirdMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Third.
 */
@Service
@Transactional
public class ThirdService {

    private final Logger log = LoggerFactory.getLogger(ThirdService.class);

    private final ThirdRepository thirdRepository;

    private final ThirdMapper thirdMapper;

    public ThirdService(ThirdRepository thirdRepository, ThirdMapper thirdMapper) {
        this.thirdRepository = thirdRepository;
        this.thirdMapper = thirdMapper;
    }

    /**
     * Save a third.
     *
     * @param thirdDTO the entity to save
     * @return the persisted entity
     */
    public ThirdDTO save(ThirdDTO thirdDTO) {
        log.debug("Request to save Third : {}", thirdDTO);
        Third third = thirdMapper.toEntity(thirdDTO);
        third = thirdRepository.save(third);
        return thirdMapper.toDto(third);
    }

    /**
     * Get all the thirds.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ThirdDTO> findAll() {
        log.debug("Request to get all Thirds");
        return thirdRepository.findAllWithEagerRelationships().stream()
            .map(thirdMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one third by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ThirdDTO findOne(Long id) {
        log.debug("Request to get Third : {}", id);
        Third third = thirdRepository.findOneWithEagerRelationships(id);
        return thirdMapper.toDto(third);
    }

    /**
     * Delete the third by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Third : {}", id);
        thirdRepository.delete(id);
    }
}
