package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.service.TransferclassificationService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.PaginationUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.TransferclassificationDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Transferclassification.
 */
@RestController
@RequestMapping("/api")
public class TransferclassificationResource {

    private final Logger log = LoggerFactory.getLogger(TransferclassificationResource.class);

    private static final String ENTITY_NAME = "transferclassification";

    private final TransferclassificationService transferclassificationService;

    public TransferclassificationResource(TransferclassificationService transferclassificationService) {
        this.transferclassificationService = transferclassificationService;
    }

    /**
     * POST  /transferclassifications : Create a new transferclassification.
     *
     * @param transferclassificationDTO the transferclassificationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transferclassificationDTO, or with status 400 (Bad Request) if the transferclassification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transferclassifications")
    @Timed
    public ResponseEntity<TransferclassificationDTO> createTransferclassification(@Valid @RequestBody TransferclassificationDTO transferclassificationDTO) throws URISyntaxException {
        log.debug("REST request to save Transferclassification : {}", transferclassificationDTO);
        if (transferclassificationDTO.getId() != null) {
            throw new BadRequestAlertException("A new transferclassification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransferclassificationDTO result = transferclassificationService.save(transferclassificationDTO);
        return ResponseEntity.created(new URI("/api/transferclassifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transferclassifications : Updates an existing transferclassification.
     *
     * @param transferclassificationDTO the transferclassificationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transferclassificationDTO,
     * or with status 400 (Bad Request) if the transferclassificationDTO is not valid,
     * or with status 500 (Internal Server Error) if the transferclassificationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transferclassifications")
    @Timed
    public ResponseEntity<TransferclassificationDTO> updateTransferclassification(@Valid @RequestBody TransferclassificationDTO transferclassificationDTO) throws URISyntaxException {
        log.debug("REST request to update Transferclassification : {}", transferclassificationDTO);
        if (transferclassificationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransferclassificationDTO result = transferclassificationService.save(transferclassificationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transferclassificationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transferclassifications : get all the transferclassifications.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transferclassifications in body
     */
    @GetMapping("/transferclassifications")
    @Timed
    public ResponseEntity<List<TransferclassificationDTO>> getAllTransferclassifications(Pageable pageable) {
        log.debug("REST request to get a page of Transferclassifications");
        Page<TransferclassificationDTO> page = transferclassificationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transferclassifications");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /transferclassifications/:id : get the "id" transferclassification.
     *
     * @param id the id of the transferclassificationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transferclassificationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transferclassifications/{id}")
    @Timed
    public ResponseEntity<TransferclassificationDTO> getTransferclassification(@PathVariable Long id) {
        log.debug("REST request to get Transferclassification : {}", id);
        Optional<TransferclassificationDTO> transferclassificationDTO = transferclassificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transferclassificationDTO);
    }

    /**
     * DELETE  /transferclassifications/:id : delete the "id" transferclassification.
     *
     * @param id the id of the transferclassificationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transferclassifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransferclassification(@PathVariable Long id) {
        log.debug("REST request to delete Transferclassification : {}", id);
        transferclassificationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
