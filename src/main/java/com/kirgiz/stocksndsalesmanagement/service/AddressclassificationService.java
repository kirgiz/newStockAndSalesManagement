package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Addressclassification;
import com.kirgiz.stocksndsalesmanagement.repository.AddressclassificationRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.AddressclassificationDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.AddressclassificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Addressclassification.
 */
@Service
@Transactional
public class AddressclassificationService {

    private final Logger log = LoggerFactory.getLogger(AddressclassificationService.class);

    private final AddressclassificationRepository addressclassificationRepository;

    private final AddressclassificationMapper addressclassificationMapper;

    public AddressclassificationService(AddressclassificationRepository addressclassificationRepository, AddressclassificationMapper addressclassificationMapper) {
        this.addressclassificationRepository = addressclassificationRepository;
        this.addressclassificationMapper = addressclassificationMapper;
    }

    /**
     * Save a addressclassification.
     *
     * @param addressclassificationDTO the entity to save
     * @return the persisted entity
     */
    public AddressclassificationDTO save(AddressclassificationDTO addressclassificationDTO) {
        log.debug("Request to save Addressclassification : {}", addressclassificationDTO);

        Addressclassification addressclassification = addressclassificationMapper.toEntity(addressclassificationDTO);
        addressclassification = addressclassificationRepository.save(addressclassification);
        return addressclassificationMapper.toDto(addressclassification);
    }

    /**
     * Get all the addressclassifications.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AddressclassificationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Addressclassifications");
        return addressclassificationRepository.findAll(pageable)
            .map(addressclassificationMapper::toDto);
    }


    /**
     * Get one addressclassification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<AddressclassificationDTO> findOne(Long id) {
        log.debug("Request to get Addressclassification : {}", id);
        return addressclassificationRepository.findById(id)
            .map(addressclassificationMapper::toDto);
    }

    /**
     * Delete the addressclassification by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Addressclassification : {}", id);
        addressclassificationRepository.deleteById(id);
    }
}
