package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Thirdclassification;
import com.kirgiz.stocksndsalesmanagement.repository.ThirdclassificationRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.ThirdclassificationDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.ThirdclassificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Thirdclassification.
 */
@Service
@Transactional
public class ThirdclassificationService {

    private final Logger log = LoggerFactory.getLogger(ThirdclassificationService.class);

    private final ThirdclassificationRepository thirdclassificationRepository;

    private final ThirdclassificationMapper thirdclassificationMapper;

    public ThirdclassificationService(ThirdclassificationRepository thirdclassificationRepository, ThirdclassificationMapper thirdclassificationMapper) {
        this.thirdclassificationRepository = thirdclassificationRepository;
        this.thirdclassificationMapper = thirdclassificationMapper;
    }

    /**
     * Save a thirdclassification.
     *
     * @param thirdclassificationDTO the entity to save
     * @return the persisted entity
     */
    public ThirdclassificationDTO save(ThirdclassificationDTO thirdclassificationDTO) {
        log.debug("Request to save Thirdclassification : {}", thirdclassificationDTO);
        Thirdclassification thirdclassification = thirdclassificationMapper.toEntity(thirdclassificationDTO);
        thirdclassification = thirdclassificationRepository.save(thirdclassification);
        return thirdclassificationMapper.toDto(thirdclassification);
    }

    /**
     * Get all the thirdclassifications.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ThirdclassificationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Thirdclassifications");
        return thirdclassificationRepository.findAll(pageable)
            .map(thirdclassificationMapper::toDto);
    }

    /**
     * Get one thirdclassification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ThirdclassificationDTO findOne(Long id) {
        log.debug("Request to get Thirdclassification : {}", id);
        Thirdclassification thirdclassification = thirdclassificationRepository.findOne(id);
        return thirdclassificationMapper.toDto(thirdclassification);
    }

    /**
     * Delete the thirdclassification by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Thirdclassification : {}", id);
        thirdclassificationRepository.delete(id);
    }
}
