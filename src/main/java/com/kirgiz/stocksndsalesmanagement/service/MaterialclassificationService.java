package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.repository.MaterialclassificationRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialclassificationDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialclassificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Materialclassification.
 */
@Service
@Transactional
public class MaterialclassificationService {

    private final Logger log = LoggerFactory.getLogger(MaterialclassificationService.class);

    private final MaterialclassificationRepository materialclassificationRepository;

    private final MaterialclassificationMapper materialclassificationMapper;

    public MaterialclassificationService(MaterialclassificationRepository materialclassificationRepository, MaterialclassificationMapper materialclassificationMapper) {
        this.materialclassificationRepository = materialclassificationRepository;
        this.materialclassificationMapper = materialclassificationMapper;
    }

    /**
     * Save a materialclassification.
     *
     * @param materialclassificationDTO the entity to save
     * @return the persisted entity
     */
    public MaterialclassificationDTO save(MaterialclassificationDTO materialclassificationDTO) {
        log.debug("Request to save Materialclassification : {}", materialclassificationDTO);
        Materialclassification materialclassification = materialclassificationMapper.toEntity(materialclassificationDTO);
        materialclassification = materialclassificationRepository.save(materialclassification);
        return materialclassificationMapper.toDto(materialclassification);
    }

    /**
     * Get all the materialclassifications.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MaterialclassificationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Materialclassifications");
        return materialclassificationRepository.findAll(pageable)
            .map(materialclassificationMapper::toDto);
    }

    /**
     * Get one materialclassification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public MaterialclassificationDTO findOne(Long id) {
        log.debug("Request to get Materialclassification : {}", id);
        Materialclassification materialclassification = materialclassificationRepository.findOne(id);
        return materialclassificationMapper.toDto(materialclassification);
    }

    /**
     * Delete the materialclassification by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Materialclassification : {}", id);
        materialclassificationRepository.delete(id);
    }
}
