package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.service.ThirdService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.ThirdDTO;
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
 * REST controller for managing Third.
 */
@RestController
@RequestMapping("/api")
public class ThirdResource {

    private final Logger log = LoggerFactory.getLogger(ThirdResource.class);

    private static final String ENTITY_NAME = "third";

    private final ThirdService thirdService;

    public ThirdResource(ThirdService thirdService) {
        this.thirdService = thirdService;
    }

    /**
     * POST  /thirds : Create a new third.
     *
     * @param thirdDTO the thirdDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thirdDTO, or with status 400 (Bad Request) if the third has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/thirds")
    @Timed
    public ResponseEntity<ThirdDTO> createThird(@Valid @RequestBody ThirdDTO thirdDTO) throws URISyntaxException {
        log.debug("REST request to save Third : {}", thirdDTO);
        if (thirdDTO.getId() != null) {
            throw new BadRequestAlertException("A new third cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThirdDTO result = thirdService.save(thirdDTO);
        return ResponseEntity.created(new URI("/api/thirds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /thirds : Updates an existing third.
     *
     * @param thirdDTO the thirdDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thirdDTO,
     * or with status 400 (Bad Request) if the thirdDTO is not valid,
     * or with status 500 (Internal Server Error) if the thirdDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/thirds")
    @Timed
    public ResponseEntity<ThirdDTO> updateThird(@Valid @RequestBody ThirdDTO thirdDTO) throws URISyntaxException {
        log.debug("REST request to update Third : {}", thirdDTO);
        if (thirdDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThirdDTO result = thirdService.save(thirdDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thirdDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /thirds : get all the thirds.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of thirds in body
     */
    @GetMapping("/thirds")
    @Timed
    public List<ThirdDTO> getAllThirds(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Thirds");
        return thirdService.findAll();
    }

    /**
     * GET  /thirds/:id : get the "id" third.
     *
     * @param id the id of the thirdDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thirdDTO, or with status 404 (Not Found)
     */
    @GetMapping("/thirds/{id}")
    @Timed
    public ResponseEntity<ThirdDTO> getThird(@PathVariable Long id) {
        log.debug("REST request to get Third : {}", id);
        Optional<ThirdDTO> thirdDTO = thirdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(thirdDTO);
    }

    /**
     * DELETE  /thirds/:id : delete the "id" third.
     *
     * @param id the id of the thirdDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/thirds/{id}")
    @Timed
    public ResponseEntity<Void> deleteThird(@PathVariable Long id) {
        log.debug("REST request to delete Third : {}", id);
        thirdService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
