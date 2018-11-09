package com.kirgiz.stocksndsalesmanagement.service;

import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import com.kirgiz.stocksndsalesmanagement.repository.LotRepository;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.LotMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Lot.
 */
@Service
@Transactional
public class LotService {

    private final Logger log = LoggerFactory.getLogger(LotService.class);

    private final LotRepository lotRepository;

    private final LotMapper lotMapper;

    public LotService(LotRepository lotRepository, LotMapper lotMapper) {
        this.lotRepository = lotRepository;
        this.lotMapper = lotMapper;
    }

    /**
     * Save a lot.
     *
     * @param lotDTO the entity to save
     * @return the persisted entity
     */
    public LotDTO save(LotDTO lotDTO) {
        log.debug("Request to save Lot : {}", lotDTO);
        Lot lot = lotMapper.toEntity(lotDTO);
        lot = lotRepository.save(lot);
        return lotMapper.toDto(lot);
    }

    /**
     * Get all the lots.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<LotDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Lots");
        return lotRepository.findAll(pageable)
            .map(lotMapper::toDto);
    }

    /**
     * Get one lot by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public LotDTO findOne(Long id) {
        log.debug("Request to get Lot : {}", id);
        Lot lot = lotRepository.findOne(id);
        return lotMapper.toDto(lot);
    }

    /**
     * Delete the lot by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Lot : {}", id);
        lotRepository.delete(id);
    }
}
