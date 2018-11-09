package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Materialhistory;
import com.kirgiz.stocksndsalesmanagement.repository.MaterialhistoryRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialhistoryDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialhistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Materialhistory.
 */
@Service
@Transactional
public class MaterialhistoryService {

    private final Logger log = LoggerFactory.getLogger(MaterialhistoryService.class);

    private final MaterialhistoryRepository materialhistoryRepository;

    private final MaterialhistoryMapper materialhistoryMapper;

    public MaterialhistoryService(MaterialhistoryRepository materialhistoryRepository, MaterialhistoryMapper materialhistoryMapper) {
        this.materialhistoryRepository = materialhistoryRepository;
        this.materialhistoryMapper = materialhistoryMapper;
    }

    /**
     * Save a materialhistory.
     *
     * @param materialhistoryDTO the entity to save
     * @return the persisted entity
     */
    public MaterialhistoryDTO save(MaterialhistoryDTO materialhistoryDTO) {
        log.debug("Request to save Materialhistory : {}", materialhistoryDTO);

        Materialhistory materialhistory = materialhistoryMapper.toEntity(materialhistoryDTO);
        materialhistory = materialhistoryRepository.save(materialhistory);
        return materialhistoryMapper.toDto(materialhistory);
    }

    /**
     * Get all the materialhistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MaterialhistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Materialhistories");
        return materialhistoryRepository.findAll(pageable)
            .map(materialhistoryMapper::toDto);
    }

    /**
     * Get all the Materialhistory with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<MaterialhistoryDTO> findAllWithEagerRelationships(Pageable pageable) {
        return materialhistoryRepository.findAllWithEagerRelationships(pageable).map(materialhistoryMapper::toDto);
    }
    

    /**
     * Get one materialhistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<MaterialhistoryDTO> findOne(Long id) {
        log.debug("Request to get Materialhistory : {}", id);
        return materialhistoryRepository.findOneWithEagerRelationships(id)
            .map(materialhistoryMapper::toDto);
    }

    /**
     * Delete the materialhistory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Materialhistory : {}", id);
        materialhistoryRepository.deleteById(id);
    }
}
