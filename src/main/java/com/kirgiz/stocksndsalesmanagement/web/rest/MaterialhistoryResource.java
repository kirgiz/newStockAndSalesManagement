package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kirgiz.stocksndsalesmanagement.domain.User;
import com.kirgiz.stocksndsalesmanagement.repository.UserRepository;
import com.kirgiz.stocksndsalesmanagement.service.MaterialhistoryService;
import com.kirgiz.stocksndsalesmanagement.service.UserService;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.BadRequestAlertException;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.HeaderUtil;
import com.kirgiz.stocksndsalesmanagement.web.rest.util.PaginationUtil;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialhistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Materialhistory.
 */
@RestController
@RequestMapping("/api")
public class MaterialhistoryResource {

    private final Logger log = LoggerFactory.getLogger(MaterialhistoryResource.class);

    private static final String ENTITY_NAME = "materialhistory";

    private final MaterialhistoryService materialhistoryService;
    private final UserService userService;

    public MaterialhistoryResource(MaterialhistoryService materialhistoryService, UserService userService) {
        this.materialhistoryService = materialhistoryService;
        this.userService = userService;
    }

    /*  public static Long getCurrentUserId(UserDetails user) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        String id = null;
        if (authentication != null)
            if (authentication.getPrincipal() instanceof UserDetails)
                id = ((UserDetails) authentication.getPrincipal()).getUsername();
            else if (authentication.getPrincipal() instanceof String)
                id = (String) authentication.getPrincipal();
        try {
            return Long.valueOf(id != null ? id : "1"); //anonymoususer
        } catch (NumberFormatException e) {
            return 1L;
        }
}*/
    /**
     * POST  /materialhistories : Create a new materialhistory.
     *
     * @param materialhistoryDTO the materialhistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new materialhistoryDTO, or with status 400 (Bad Request) if the materialhistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/materialhistories")
    @Timed
    public ResponseEntity<MaterialhistoryDTO> createMaterialhistory(@Valid @RequestBody MaterialhistoryDTO materialhistoryDTO,
    @AuthenticationPrincipal UserDetails user) throws URISyntaxException {
        log.debug("REST request to save Materialhistory : {}", materialhistoryDTO);
        materialhistoryDTO.setUserMod(this.userService.getUserIdFromPrincipal(user));
        if (materialhistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new materialhistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialhistoryDTO result = materialhistoryService.save(materialhistoryDTO);
        return ResponseEntity.created(new URI("/api/materialhistories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /materialhistories : Updates an existing materialhistory.
     *
     * @param materialhistoryDTO the materialhistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated materialhistoryDTO,
     * or with status 400 (Bad Request) if the materialhistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the materialhistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/materialhistories")
    @Timed
    public ResponseEntity<MaterialhistoryDTO> updateMaterialhistory(@Valid @RequestBody MaterialhistoryDTO materialhistoryDTO,  @AuthenticationPrincipal UserDetails user) throws URISyntaxException {
        log.debug("REST request to update Materialhistory : {}", materialhistoryDTO);
        if (materialhistoryDTO.getId() == null) {
            return createMaterialhistory(materialhistoryDTO, user);
        }
        materialhistoryDTO.setUserMod(this.userService.getUserIdFromPrincipal(user));
        MaterialhistoryDTO result = materialhistoryService.save(materialhistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, materialhistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /materialhistories : get all the materialhistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of materialhistories in body
     */
    @GetMapping("/materialhistories")
    @Timed
    public ResponseEntity<List<MaterialhistoryDTO>> getAllMaterialhistories(Pageable pageable) {
        log.debug("REST request to get a page of Materialhistories");
        Page<MaterialhistoryDTO> page = materialhistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/materialhistories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /materialhistories/:id : get the "id" materialhistory.
     *
     * @param id the id of the materialhistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the materialhistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/materialhistories/{id}")
    @Timed
    public ResponseEntity<MaterialhistoryDTO> getMaterialhistory(@PathVariable Long id) {
        log.debug("REST request to get Materialhistory : {}", id);
        MaterialhistoryDTO materialhistoryDTO = materialhistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(materialhistoryDTO));
    }

    /**
     * DELETE  /materialhistories/:id : delete the "id" materialhistory.
     *
     * @param id the id of the materialhistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/materialhistories/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaterialhistory(@PathVariable Long id) {
        log.debug("REST request to delete Materialhistory : {}", id);
        materialhistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
