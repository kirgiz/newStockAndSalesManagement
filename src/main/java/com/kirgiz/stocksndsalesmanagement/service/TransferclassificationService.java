package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Transferclassification;
import com.kirgiz.stocksndsalesmanagement.repository.TransferclassificationRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.TransferclassificationDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.TransferclassificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Transferclassification.
 */
@Service
@Transactional
public class TransferclassificationService {

    private final Logger log = LoggerFactory.getLogger(TransferclassificationService.class);

    private final TransferclassificationRepository transferclassificationRepository;

    private final TransferclassificationMapper transferclassificationMapper;

    public TransferclassificationService(TransferclassificationRepository transferclassificationRepository, TransferclassificationMapper transferclassificationMapper) {
        this.transferclassificationRepository = transferclassificationRepository;
        this.transferclassificationMapper = transferclassificationMapper;
    }

    /**
     * Save a transferclassification.
     *
     * @param transferclassificationDTO the entity to save
     * @return the persisted entity
     */
    public TransferclassificationDTO save(TransferclassificationDTO transferclassificationDTO) {
        log.debug("Request to save Transferclassification : {}", transferclassificationDTO);

        Transferclassification transferclassification = transferclassificationMapper.toEntity(transferclassificationDTO);
        transferclassification = transferclassificationRepository.save(transferclassification);
        return transferclassificationMapper.toDto(transferclassification);
    }

    /**
     * Get all the transferclassifications.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TransferclassificationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Transferclassifications");
        return transferclassificationRepository.findAll(pageable)
            .map(transferclassificationMapper::toDto);
    }


    /**
     * Get one transferclassification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TransferclassificationDTO> findOne(Long id) {
        log.debug("Request to get Transferclassification : {}", id);
        return transferclassificationRepository.findById(id)
            .map(transferclassificationMapper::toDto);
    }

    /**
     * Delete the transferclassification by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Transferclassification : {}", id);
        transferclassificationRepository.deleteById(id);
    }
}
