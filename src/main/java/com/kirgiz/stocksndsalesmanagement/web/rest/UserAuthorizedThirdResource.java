package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.service.UserAuthorizedThirdService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.PaginationUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdCriteria;
import com.kirgiz.stocksndsalesmanagement.service.UserAuthorizedThirdQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserAuthorizedThird.
 */
@RestController
@RequestMapping("/api")
public class UserAuthorizedThirdResource {

    private final Logger log = LoggerFactory.getLogger(UserAuthorizedThirdResource.class);

    private static final String ENTITY_NAME = "userAuthorizedThird";

    private final UserAuthorizedThirdService userAuthorizedThirdService;

    private final UserAuthorizedThirdQueryService userAuthorizedThirdQueryService;

    public UserAuthorizedThirdResource(UserAuthorizedThirdService userAuthorizedThirdService, UserAuthorizedThirdQueryService userAuthorizedThirdQueryService) {
        this.userAuthorizedThirdService = userAuthorizedThirdService;
        this.userAuthorizedThirdQueryService = userAuthorizedThirdQueryService;
    }

    /**
     * POST  /user-authorized-thirds : Create a new userAuthorizedThird.
     *
     * @param userAuthorizedThirdDTO the userAuthorizedThirdDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userAuthorizedThirdDTO, or with status 400 (Bad Request) if the userAuthorizedThird has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-authorized-thirds")
    @Timed
    public ResponseEntity<UserAuthorizedThirdDTO> createUserAuthorizedThird(@RequestBody UserAuthorizedThirdDTO userAuthorizedThirdDTO) throws URISyntaxException {
        log.debug("REST request to save UserAuthorizedThird : {}", userAuthorizedThirdDTO);
        if (userAuthorizedThirdDTO.getId() != null) {
            throw new BadRequestAlertException("A new userAuthorizedThird cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserAuthorizedThirdDTO result = userAuthorizedThirdService.save(userAuthorizedThirdDTO);
        return ResponseEntity.created(new URI("/api/user-authorized-thirds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-authorized-thirds : Updates an existing userAuthorizedThird.
     *
     * @param userAuthorizedThirdDTO the userAuthorizedThirdDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userAuthorizedThirdDTO,
     * or with status 400 (Bad Request) if the userAuthorizedThirdDTO is not valid,
     * or with status 500 (Internal Server Error) if the userAuthorizedThirdDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-authorized-thirds")
    @Timed
    public ResponseEntity<UserAuthorizedThirdDTO> updateUserAuthorizedThird(@RequestBody UserAuthorizedThirdDTO userAuthorizedThirdDTO) throws URISyntaxException {
        log.debug("REST request to update UserAuthorizedThird : {}", userAuthorizedThirdDTO);
        if (userAuthorizedThirdDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserAuthorizedThirdDTO result = userAuthorizedThirdService.save(userAuthorizedThirdDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userAuthorizedThirdDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-authorized-thirds : get all the userAuthorizedThirds.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of userAuthorizedThirds in body
     */
    @GetMapping("/user-authorized-thirds")
    @Timed
    public ResponseEntity<List<UserAuthorizedThirdDTO>> getAllUserAuthorizedThirds(UserAuthorizedThirdCriteria criteria, Pageable pageable) {
        log.debug("REST request to get UserAuthorizedThirds by criteria: {}", criteria);
        Page<UserAuthorizedThirdDTO> page = userAuthorizedThirdQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-authorized-thirds");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /user-authorized-thirds/count : count all the userAuthorizedThirds.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/user-authorized-thirds/count")
    @Timed
    public ResponseEntity<Long> countUserAuthorizedThirds(UserAuthorizedThirdCriteria criteria) {
        log.debug("REST request to count UserAuthorizedThirds by criteria: {}", criteria);
        return ResponseEntity.ok().body(userAuthorizedThirdQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /user-authorized-thirds/:id : get the "id" userAuthorizedThird.
     *
     * @param id the id of the userAuthorizedThirdDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userAuthorizedThirdDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-authorized-thirds/{id}")
    @Timed
    public ResponseEntity<UserAuthorizedThirdDTO> getUserAuthorizedThird(@PathVariable Long id) {
        log.debug("REST request to get UserAuthorizedThird : {}", id);
        Optional<UserAuthorizedThirdDTO> userAuthorizedThirdDTO = userAuthorizedThirdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userAuthorizedThirdDTO);
    }

    /**
     * DELETE  /user-authorized-thirds/:id : delete the "id" userAuthorizedThird.
     *
     * @param id the id of the userAuthorizedThirdDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-authorized-thirds/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserAuthorizedThird(@PathVariable Long id) {
        log.debug("REST request to delete UserAuthorizedThird : {}", id);
        userAuthorizedThirdService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
