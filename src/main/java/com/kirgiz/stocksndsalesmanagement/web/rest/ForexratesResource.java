package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.service.ForexratesService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesDTO;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesCriteria;
import com.kirgiz.stocksndsalesmanagement.service.ForexratesQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Forexrates.
 */
@RestController
@RequestMapping("/api")
public class ForexratesResource {

    private final Logger log = LoggerFactory.getLogger(ForexratesResource.class);

    private static final String ENTITY_NAME = "forexrates";

    private final ForexratesService forexratesService;

    private final ForexratesQueryService forexratesQueryService;

    public ForexratesResource(ForexratesService forexratesService, ForexratesQueryService forexratesQueryService) {
        this.forexratesService = forexratesService;
        this.forexratesQueryService = forexratesQueryService;
    }

    /**
     * POST  /forexrates : Create a new forexrates.
     *
     * @param forexratesDTO the forexratesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new forexratesDTO, or with status 400 (Bad Request) if the forexrates has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/forexrates")
    @Timed
    public ResponseEntity<ForexratesDTO> createForexrates(@Valid @RequestBody ForexratesDTO forexratesDTO) throws URISyntaxException {
        log.debug("REST request to save Forexrates : {}", forexratesDTO);
        if (forexratesDTO.getId() != null) {
            throw new BadRequestAlertException("A new forexrates cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ForexratesDTO result = forexratesService.save(forexratesDTO);
        return ResponseEntity.created(new URI("/api/forexrates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /forexrates : Updates an existing forexrates.
     *
     * @param forexratesDTO the forexratesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated forexratesDTO,
     * or with status 400 (Bad Request) if the forexratesDTO is not valid,
     * or with status 500 (Internal Server Error) if the forexratesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/forexrates")
    @Timed
    public ResponseEntity<ForexratesDTO> updateForexrates(@Valid @RequestBody ForexratesDTO forexratesDTO) throws URISyntaxException {
        log.debug("REST request to update Forexrates : {}", forexratesDTO);
        if (forexratesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ForexratesDTO result = forexratesService.save(forexratesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, forexratesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /forexrates : get all the forexrates.
     *
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of forexrates in body
     */
    @GetMapping("/forexrates")
    @Timed
    public ResponseEntity<List<ForexratesDTO>> getAllForexrates(ForexratesCriteria criteria) {
        log.debug("REST request to get Forexrates by criteria: {}", criteria);
        List<ForexratesDTO> entityList = forexratesQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * GET  /forexrates/count : count all the forexrates.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/forexrates/count")
    @Timed
    public ResponseEntity<Long> countForexrates(ForexratesCriteria criteria) {
        log.debug("REST request to count Forexrates by criteria: {}", criteria);
        return ResponseEntity.ok().body(forexratesQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /forexrates/:id : get the "id" forexrates.
     *
     * @param id the id of the forexratesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the forexratesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/forexrates/{id}")
    @Timed
    public ResponseEntity<ForexratesDTO> getForexrates(@PathVariable Long id) {
        log.debug("REST request to get Forexrates : {}", id);
        Optional<ForexratesDTO> forexratesDTO = forexratesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(forexratesDTO);
    }

    /**
     * DELETE  /forexrates/:id : delete the "id" forexrates.
     *
     * @param id the id of the forexratesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/forexrates/{id}")
    @Timed
    public ResponseEntity<Void> deleteForexrates(@PathVariable Long id) {
        log.debug("REST request to delete Forexrates : {}", id);
        forexratesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
