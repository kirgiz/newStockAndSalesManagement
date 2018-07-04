package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.service.ThirdclassificationService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.PaginationUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.ThirdclassificationDTO;
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
 * REST controller for managing Thirdclassification.
 */
@RestController
@RequestMapping("/api")
public class ThirdclassificationResource {

    private final Logger log = LoggerFactory.getLogger(ThirdclassificationResource.class);

    private static final String ENTITY_NAME = "thirdclassification";

    private final ThirdclassificationService thirdclassificationService;

    public ThirdclassificationResource(ThirdclassificationService thirdclassificationService) {
        this.thirdclassificationService = thirdclassificationService;
    }

    /**
     * POST  /thirdclassifications : Create a new thirdclassification.
     *
     * @param thirdclassificationDTO the thirdclassificationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thirdclassificationDTO, or with status 400 (Bad Request) if the thirdclassification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/thirdclassifications")
    @Timed
    public ResponseEntity<ThirdclassificationDTO> createThirdclassification(@Valid @RequestBody ThirdclassificationDTO thirdclassificationDTO) throws URISyntaxException {
        log.debug("REST request to save Thirdclassification : {}", thirdclassificationDTO);
        if (thirdclassificationDTO.getId() != null) {
            throw new BadRequestAlertException("A new thirdclassification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThirdclassificationDTO result = thirdclassificationService.save(thirdclassificationDTO);
        return ResponseEntity.created(new URI("/api/thirdclassifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /thirdclassifications : Updates an existing thirdclassification.
     *
     * @param thirdclassificationDTO the thirdclassificationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thirdclassificationDTO,
     * or with status 400 (Bad Request) if the thirdclassificationDTO is not valid,
     * or with status 500 (Internal Server Error) if the thirdclassificationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/thirdclassifications")
    @Timed
    public ResponseEntity<ThirdclassificationDTO> updateThirdclassification(@Valid @RequestBody ThirdclassificationDTO thirdclassificationDTO) throws URISyntaxException {
        log.debug("REST request to update Thirdclassification : {}", thirdclassificationDTO);
        if (thirdclassificationDTO.getId() == null) {
            return createThirdclassification(thirdclassificationDTO);
        }
        ThirdclassificationDTO result = thirdclassificationService.save(thirdclassificationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thirdclassificationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /thirdclassifications : get all the thirdclassifications.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of thirdclassifications in body
     */
    @GetMapping("/thirdclassifications")
    @Timed
    public ResponseEntity<List<ThirdclassificationDTO>> getAllThirdclassifications(Pageable pageable) {
        log.debug("REST request to get a page of Thirdclassifications");
        Page<ThirdclassificationDTO> page = thirdclassificationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/thirdclassifications");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /thirdclassifications/:id : get the "id" thirdclassification.
     *
     * @param id the id of the thirdclassificationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thirdclassificationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/thirdclassifications/{id}")
    @Timed
    public ResponseEntity<ThirdclassificationDTO> getThirdclassification(@PathVariable Long id) {
        log.debug("REST request to get Thirdclassification : {}", id);
        ThirdclassificationDTO thirdclassificationDTO = thirdclassificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(thirdclassificationDTO));
    }

    /**
     * DELETE  /thirdclassifications/:id : delete the "id" thirdclassification.
     *
     * @param id the id of the thirdclassificationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/thirdclassifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteThirdclassification(@PathVariable Long id) {
        log.debug("REST request to delete Thirdclassification : {}", id);
        thirdclassificationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
