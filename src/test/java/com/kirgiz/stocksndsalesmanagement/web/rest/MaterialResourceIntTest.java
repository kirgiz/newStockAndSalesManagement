package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.Material;
import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.repository.MaterialRepository;
import com.kirgiz.stocksndsalesmanagement.service.MaterialService;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialCriteria;
import com.kirgiz.stocksndsalesmanagement.service.MaterialQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.kirgiz.stocksndsalesmanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaterialResource REST controller.
 *
 * @see MaterialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class MaterialResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final Integer DEFAULT_CURRENT_LOCATION = 1;
    private static final Integer UPDATED_CURRENT_LOCATION = 2;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private MaterialMapper materialMapper;

    @Autowired
    private MaterialService materialService;

    @Autowired
    private MaterialQueryService materialQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaterialMockMvc;

    private Material material;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterialResource materialResource = new MaterialResource(materialService, materialQueryService);
        this.restMaterialMockMvc = MockMvcBuilders.standaloneSetup(materialResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Material createEntity(EntityManager em) {
        Material material = new Material()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .comments(DEFAULT_COMMENTS)
            .currentLocation(DEFAULT_CURRENT_LOCATION);
        // Add required entity
        Materialclassification materialclassification = MaterialclassificationResourceIntTest.createEntity(em);
        em.persist(materialclassification);
        em.flush();
        material.setMaterialTypeDef(materialclassification);
        // Add required entity
        Lot lot = LotResourceIntTest.createEntity(em);
        em.persist(lot);
        em.flush();
        material.setLotIdentifier(lot);
        // Add required entity
        material.setMaterialTypeCat(materialclassification);
        return material;
    }

    @Before
    public void initTest() {
        material = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterial() throws Exception {
        int databaseSizeBeforeCreate = materialRepository.findAll().size();

        // Create the Material
        MaterialDTO materialDTO = materialMapper.toDto(material);
        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isCreated());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeCreate + 1);
        Material testMaterial = materialList.get(materialList.size() - 1);
        assertThat(testMaterial.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMaterial.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMaterial.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testMaterial.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testMaterial.getCurrentLocation()).isEqualTo(DEFAULT_CURRENT_LOCATION);
    }

    @Test
    @Transactional
    public void createMaterialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materialRepository.findAll().size();

        // Create the Material with an existing ID
        material.setId(1L);
        MaterialDTO materialDTO = materialMapper.toDto(material);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = materialRepository.findAll().size();
        // set the field null
        material.setCode(null);

        // Create the Material, which fails.
        MaterialDTO materialDTO = materialMapper.toDto(material);

        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isBadRequest());

        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = materialRepository.findAll().size();
        // set the field null
        material.setDescription(null);

        // Create the Material, which fails.
        MaterialDTO materialDTO = materialMapper.toDto(material);

        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isBadRequest());

        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = materialRepository.findAll().size();
        // set the field null
        material.setCreationDate(null);

        // Create the Material, which fails.
        MaterialDTO materialDTO = materialMapper.toDto(material);

        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isBadRequest());

        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaterials() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList
        restMaterialMockMvc.perform(get("/api/materials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(material.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())))
            .andExpect(jsonPath("$.[*].currentLocation").value(hasItem(DEFAULT_CURRENT_LOCATION)));
    }
    
    @Test
    @Transactional
    public void getMaterial() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get the material
        restMaterialMockMvc.perform(get("/api/materials/{id}", material.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(material.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS.toString()))
            .andExpect(jsonPath("$.currentLocation").value(DEFAULT_CURRENT_LOCATION));
    }

    @Test
    @Transactional
    public void getAllMaterialsByCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where code equals to DEFAULT_CODE
        defaultMaterialShouldBeFound("code.equals=" + DEFAULT_CODE);

        // Get all the materialList where code equals to UPDATED_CODE
        defaultMaterialShouldNotBeFound("code.equals=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCodeIsInShouldWork() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where code in DEFAULT_CODE or UPDATED_CODE
        defaultMaterialShouldBeFound("code.in=" + DEFAULT_CODE + "," + UPDATED_CODE);

        // Get all the materialList where code equals to UPDATED_CODE
        defaultMaterialShouldNotBeFound("code.in=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where code is not null
        defaultMaterialShouldBeFound("code.specified=true");

        // Get all the materialList where code is null
        defaultMaterialShouldNotBeFound("code.specified=false");
    }

    @Test
    @Transactional
    public void getAllMaterialsByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where description equals to DEFAULT_DESCRIPTION
        defaultMaterialShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the materialList where description equals to UPDATED_DESCRIPTION
        defaultMaterialShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllMaterialsByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultMaterialShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the materialList where description equals to UPDATED_DESCRIPTION
        defaultMaterialShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllMaterialsByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where description is not null
        defaultMaterialShouldBeFound("description.specified=true");

        // Get all the materialList where description is null
        defaultMaterialShouldNotBeFound("description.specified=false");
    }

    @Test
    @Transactional
    public void getAllMaterialsByCreationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where creationDate equals to DEFAULT_CREATION_DATE
        defaultMaterialShouldBeFound("creationDate.equals=" + DEFAULT_CREATION_DATE);

        // Get all the materialList where creationDate equals to UPDATED_CREATION_DATE
        defaultMaterialShouldNotBeFound("creationDate.equals=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCreationDateIsInShouldWork() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where creationDate in DEFAULT_CREATION_DATE or UPDATED_CREATION_DATE
        defaultMaterialShouldBeFound("creationDate.in=" + DEFAULT_CREATION_DATE + "," + UPDATED_CREATION_DATE);

        // Get all the materialList where creationDate equals to UPDATED_CREATION_DATE
        defaultMaterialShouldNotBeFound("creationDate.in=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCreationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where creationDate is not null
        defaultMaterialShouldBeFound("creationDate.specified=true");

        // Get all the materialList where creationDate is null
        defaultMaterialShouldNotBeFound("creationDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllMaterialsByCreationDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where creationDate greater than or equals to DEFAULT_CREATION_DATE
        defaultMaterialShouldBeFound("creationDate.greaterOrEqualThan=" + DEFAULT_CREATION_DATE);

        // Get all the materialList where creationDate greater than or equals to UPDATED_CREATION_DATE
        defaultMaterialShouldNotBeFound("creationDate.greaterOrEqualThan=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCreationDateIsLessThanSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where creationDate less than or equals to DEFAULT_CREATION_DATE
        defaultMaterialShouldNotBeFound("creationDate.lessThan=" + DEFAULT_CREATION_DATE);

        // Get all the materialList where creationDate less than or equals to UPDATED_CREATION_DATE
        defaultMaterialShouldBeFound("creationDate.lessThan=" + UPDATED_CREATION_DATE);
    }


    @Test
    @Transactional
    public void getAllMaterialsByCommentsIsEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where comments equals to DEFAULT_COMMENTS
        defaultMaterialShouldBeFound("comments.equals=" + DEFAULT_COMMENTS);

        // Get all the materialList where comments equals to UPDATED_COMMENTS
        defaultMaterialShouldNotBeFound("comments.equals=" + UPDATED_COMMENTS);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCommentsIsInShouldWork() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where comments in DEFAULT_COMMENTS or UPDATED_COMMENTS
        defaultMaterialShouldBeFound("comments.in=" + DEFAULT_COMMENTS + "," + UPDATED_COMMENTS);

        // Get all the materialList where comments equals to UPDATED_COMMENTS
        defaultMaterialShouldNotBeFound("comments.in=" + UPDATED_COMMENTS);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCommentsIsNullOrNotNull() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where comments is not null
        defaultMaterialShouldBeFound("comments.specified=true");

        // Get all the materialList where comments is null
        defaultMaterialShouldNotBeFound("comments.specified=false");
    }

    @Test
    @Transactional
    public void getAllMaterialsByCurrentLocationIsEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where currentLocation equals to DEFAULT_CURRENT_LOCATION
        defaultMaterialShouldBeFound("currentLocation.equals=" + DEFAULT_CURRENT_LOCATION);

        // Get all the materialList where currentLocation equals to UPDATED_CURRENT_LOCATION
        defaultMaterialShouldNotBeFound("currentLocation.equals=" + UPDATED_CURRENT_LOCATION);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCurrentLocationIsInShouldWork() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where currentLocation in DEFAULT_CURRENT_LOCATION or UPDATED_CURRENT_LOCATION
        defaultMaterialShouldBeFound("currentLocation.in=" + DEFAULT_CURRENT_LOCATION + "," + UPDATED_CURRENT_LOCATION);

        // Get all the materialList where currentLocation equals to UPDATED_CURRENT_LOCATION
        defaultMaterialShouldNotBeFound("currentLocation.in=" + UPDATED_CURRENT_LOCATION);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCurrentLocationIsNullOrNotNull() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where currentLocation is not null
        defaultMaterialShouldBeFound("currentLocation.specified=true");

        // Get all the materialList where currentLocation is null
        defaultMaterialShouldNotBeFound("currentLocation.specified=false");
    }

    @Test
    @Transactional
    public void getAllMaterialsByCurrentLocationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where currentLocation greater than or equals to DEFAULT_CURRENT_LOCATION
        defaultMaterialShouldBeFound("currentLocation.greaterOrEqualThan=" + DEFAULT_CURRENT_LOCATION);

        // Get all the materialList where currentLocation greater than or equals to UPDATED_CURRENT_LOCATION
        defaultMaterialShouldNotBeFound("currentLocation.greaterOrEqualThan=" + UPDATED_CURRENT_LOCATION);
    }

    @Test
    @Transactional
    public void getAllMaterialsByCurrentLocationIsLessThanSomething() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList where currentLocation less than or equals to DEFAULT_CURRENT_LOCATION
        defaultMaterialShouldNotBeFound("currentLocation.lessThan=" + DEFAULT_CURRENT_LOCATION);

        // Get all the materialList where currentLocation less than or equals to UPDATED_CURRENT_LOCATION
        defaultMaterialShouldBeFound("currentLocation.lessThan=" + UPDATED_CURRENT_LOCATION);
    }


    @Test
    @Transactional
    public void getAllMaterialsByMaterialTypeDefIsEqualToSomething() throws Exception {
        // Initialize the database
        Materialclassification materialTypeDef = MaterialclassificationResourceIntTest.createEntity(em);
        em.persist(materialTypeDef);
        em.flush();
        material.setMaterialTypeDef(materialTypeDef);
        materialRepository.saveAndFlush(material);
        Long materialTypeDefId = materialTypeDef.getId();

        // Get all the materialList where materialTypeDef equals to materialTypeDefId
        defaultMaterialShouldBeFound("materialTypeDefId.equals=" + materialTypeDefId);

        // Get all the materialList where materialTypeDef equals to materialTypeDefId + 1
        defaultMaterialShouldNotBeFound("materialTypeDefId.equals=" + (materialTypeDefId + 1));
    }


    @Test
    @Transactional
    public void getAllMaterialsByLotIdentifierIsEqualToSomething() throws Exception {
        // Initialize the database
        Lot lotIdentifier = LotResourceIntTest.createEntity(em);
        em.persist(lotIdentifier);
        em.flush();
        material.setLotIdentifier(lotIdentifier);
        materialRepository.saveAndFlush(material);
        Long lotIdentifierId = lotIdentifier.getId();

        // Get all the materialList where lotIdentifier equals to lotIdentifierId
        defaultMaterialShouldBeFound("lotIdentifierId.equals=" + lotIdentifierId);

        // Get all the materialList where lotIdentifier equals to lotIdentifierId + 1
        defaultMaterialShouldNotBeFound("lotIdentifierId.equals=" + (lotIdentifierId + 1));
    }


    @Test
    @Transactional
    public void getAllMaterialsByMaterialTypeCatIsEqualToSomething() throws Exception {
        // Initialize the database
        Materialclassification materialTypeCat = MaterialclassificationResourceIntTest.createEntity(em);
        em.persist(materialTypeCat);
        em.flush();
        material.setMaterialTypeCat(materialTypeCat);
        materialRepository.saveAndFlush(material);
        Long materialTypeCatId = materialTypeCat.getId();

        // Get all the materialList where materialTypeCat equals to materialTypeCatId
        defaultMaterialShouldBeFound("materialTypeCatId.equals=" + materialTypeCatId);

        // Get all the materialList where materialTypeCat equals to materialTypeCatId + 1
        defaultMaterialShouldNotBeFound("materialTypeCatId.equals=" + (materialTypeCatId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultMaterialShouldBeFound(String filter) throws Exception {
        restMaterialMockMvc.perform(get("/api/materials?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(material.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())))
            .andExpect(jsonPath("$.[*].currentLocation").value(hasItem(DEFAULT_CURRENT_LOCATION)));

        // Check, that the count call also returns 1
        restMaterialMockMvc.perform(get("/api/materials/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultMaterialShouldNotBeFound(String filter) throws Exception {
        restMaterialMockMvc.perform(get("/api/materials?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restMaterialMockMvc.perform(get("/api/materials/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingMaterial() throws Exception {
        // Get the material
        restMaterialMockMvc.perform(get("/api/materials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterial() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        int databaseSizeBeforeUpdate = materialRepository.findAll().size();

        // Update the material
        Material updatedMaterial = materialRepository.findById(material.getId()).get();
        // Disconnect from session so that the updates on updatedMaterial are not directly saved in db
        em.detach(updatedMaterial);
        updatedMaterial
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .comments(UPDATED_COMMENTS)
            .currentLocation(UPDATED_CURRENT_LOCATION);
        MaterialDTO materialDTO = materialMapper.toDto(updatedMaterial);

        restMaterialMockMvc.perform(put("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isOk());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeUpdate);
        Material testMaterial = materialList.get(materialList.size() - 1);
        assertThat(testMaterial.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMaterial.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMaterial.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testMaterial.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testMaterial.getCurrentLocation()).isEqualTo(UPDATED_CURRENT_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterial() throws Exception {
        int databaseSizeBeforeUpdate = materialRepository.findAll().size();

        // Create the Material
        MaterialDTO materialDTO = materialMapper.toDto(material);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterialMockMvc.perform(put("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaterial() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        int databaseSizeBeforeDelete = materialRepository.findAll().size();

        // Get the material
        restMaterialMockMvc.perform(delete("/api/materials/{id}", material.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Material.class);
        Material material1 = new Material();
        material1.setId(1L);
        Material material2 = new Material();
        material2.setId(material1.getId());
        assertThat(material1).isEqualTo(material2);
        material2.setId(2L);
        assertThat(material1).isNotEqualTo(material2);
        material1.setId(null);
        assertThat(material1).isNotEqualTo(material2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialDTO.class);
        MaterialDTO materialDTO1 = new MaterialDTO();
        materialDTO1.setId(1L);
        MaterialDTO materialDTO2 = new MaterialDTO();
        assertThat(materialDTO1).isNotEqualTo(materialDTO2);
        materialDTO2.setId(materialDTO1.getId());
        assertThat(materialDTO1).isEqualTo(materialDTO2);
        materialDTO2.setId(2L);
        assertThat(materialDTO1).isNotEqualTo(materialDTO2);
        materialDTO1.setId(null);
        assertThat(materialDTO1).isNotEqualTo(materialDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(materialMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(materialMapper.fromId(null)).isNull();
    }
}
