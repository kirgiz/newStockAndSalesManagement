package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import com.kirgiz.stocksndsalesmanagement.domain.Material;
import com.kirgiz.stocksndsalesmanagement.domain.Currency;
import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.repository.LotRepository;
import com.kirgiz.stocksndsalesmanagement.service.LotService;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.LotMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotCriteria;
import com.kirgiz.stocksndsalesmanagement.service.LotQueryService;

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
 * Test class for the LotResource REST controller.
 *
 * @see LotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class LotResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_NUMBER_OF_ITEMS = 1L;
    private static final Long UPDATED_NUMBER_OF_ITEMS = 2L;

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final Double DEFAULT_UNIT_BUY_PRICE = 1D;
    private static final Double UPDATED_UNIT_BUY_PRICE = 2D;

    private static final Boolean DEFAULT_ITEMS_GENERATED = false;
    private static final Boolean UPDATED_ITEMS_GENERATED = true;

    @Autowired
    private LotRepository lotRepository;

    @Autowired
    private LotMapper lotMapper;

    @Autowired
    private LotService lotService;

    @Autowired
    private LotQueryService lotQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLotMockMvc;

    private Lot lot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LotResource lotResource = new LotResource(lotService, lotQueryService);
        this.restLotMockMvc = MockMvcBuilders.standaloneSetup(lotResource)
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
    public static Lot createEntity(EntityManager em) {
        Lot lot = new Lot()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .numberOfItems(DEFAULT_NUMBER_OF_ITEMS)
            .comments(DEFAULT_COMMENTS)
            .unitBuyPrice(DEFAULT_UNIT_BUY_PRICE)
            .itemsGenerated(DEFAULT_ITEMS_GENERATED);
        // Add required entity
        Currency currency = CurrencyResourceIntTest.createEntity(em);
        em.persist(currency);
        em.flush();
        lot.setBuycurrencylot(currency);
        // Add required entity
        Materialclassification materialclassification = MaterialclassificationResourceIntTest.createEntity(em);
        em.persist(materialclassification);
        em.flush();
        lot.setMaterialclassification(materialclassification);
        return lot;
    }

    @Before
    public void initTest() {
        lot = createEntity(em);
    }

    @Test
    @Transactional
    public void createLot() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot
        LotDTO lotDTO = lotMapper.toDto(lot);
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isCreated());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate + 1);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testLot.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLot.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testLot.getNumberOfItems()).isEqualTo(DEFAULT_NUMBER_OF_ITEMS);
        assertThat(testLot.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testLot.getUnitBuyPrice()).isEqualTo(DEFAULT_UNIT_BUY_PRICE);
        assertThat(testLot.isItemsGenerated()).isEqualTo(DEFAULT_ITEMS_GENERATED);
    }

    @Test
    @Transactional
    public void createLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot with an existing ID
        lot.setId(1L);
        LotDTO lotDTO = lotMapper.toDto(lot);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setCode(null);

        // Create the Lot, which fails.
        LotDTO lotDTO = lotMapper.toDto(lot);

        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setDescription(null);

        // Create the Lot, which fails.
        LotDTO lotDTO = lotMapper.toDto(lot);

        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setCreationDate(null);

        // Create the Lot, which fails.
        LotDTO lotDTO = lotMapper.toDto(lot);

        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberOfItemsIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setNumberOfItems(null);

        // Create the Lot, which fails.
        LotDTO lotDTO = lotMapper.toDto(lot);

        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLots() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList
        restLotMockMvc.perform(get("/api/lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].numberOfItems").value(hasItem(DEFAULT_NUMBER_OF_ITEMS.intValue())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())))
            .andExpect(jsonPath("$.[*].unitBuyPrice").value(hasItem(DEFAULT_UNIT_BUY_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].itemsGenerated").value(hasItem(DEFAULT_ITEMS_GENERATED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", lot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lot.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.numberOfItems").value(DEFAULT_NUMBER_OF_ITEMS.intValue()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS.toString()))
            .andExpect(jsonPath("$.unitBuyPrice").value(DEFAULT_UNIT_BUY_PRICE.doubleValue()))
            .andExpect(jsonPath("$.itemsGenerated").value(DEFAULT_ITEMS_GENERATED.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllLotsByCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where code equals to DEFAULT_CODE
        defaultLotShouldBeFound("code.equals=" + DEFAULT_CODE);

        // Get all the lotList where code equals to UPDATED_CODE
        defaultLotShouldNotBeFound("code.equals=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllLotsByCodeIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where code in DEFAULT_CODE or UPDATED_CODE
        defaultLotShouldBeFound("code.in=" + DEFAULT_CODE + "," + UPDATED_CODE);

        // Get all the lotList where code equals to UPDATED_CODE
        defaultLotShouldNotBeFound("code.in=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllLotsByCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where code is not null
        defaultLotShouldBeFound("code.specified=true");

        // Get all the lotList where code is null
        defaultLotShouldNotBeFound("code.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where description equals to DEFAULT_DESCRIPTION
        defaultLotShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the lotList where description equals to UPDATED_DESCRIPTION
        defaultLotShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllLotsByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultLotShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the lotList where description equals to UPDATED_DESCRIPTION
        defaultLotShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllLotsByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where description is not null
        defaultLotShouldBeFound("description.specified=true");

        // Get all the lotList where description is null
        defaultLotShouldNotBeFound("description.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByCreationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where creationDate equals to DEFAULT_CREATION_DATE
        defaultLotShouldBeFound("creationDate.equals=" + DEFAULT_CREATION_DATE);

        // Get all the lotList where creationDate equals to UPDATED_CREATION_DATE
        defaultLotShouldNotBeFound("creationDate.equals=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllLotsByCreationDateIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where creationDate in DEFAULT_CREATION_DATE or UPDATED_CREATION_DATE
        defaultLotShouldBeFound("creationDate.in=" + DEFAULT_CREATION_DATE + "," + UPDATED_CREATION_DATE);

        // Get all the lotList where creationDate equals to UPDATED_CREATION_DATE
        defaultLotShouldNotBeFound("creationDate.in=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllLotsByCreationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where creationDate is not null
        defaultLotShouldBeFound("creationDate.specified=true");

        // Get all the lotList where creationDate is null
        defaultLotShouldNotBeFound("creationDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByCreationDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where creationDate greater than or equals to DEFAULT_CREATION_DATE
        defaultLotShouldBeFound("creationDate.greaterOrEqualThan=" + DEFAULT_CREATION_DATE);

        // Get all the lotList where creationDate greater than or equals to UPDATED_CREATION_DATE
        defaultLotShouldNotBeFound("creationDate.greaterOrEqualThan=" + UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void getAllLotsByCreationDateIsLessThanSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where creationDate less than or equals to DEFAULT_CREATION_DATE
        defaultLotShouldNotBeFound("creationDate.lessThan=" + DEFAULT_CREATION_DATE);

        // Get all the lotList where creationDate less than or equals to UPDATED_CREATION_DATE
        defaultLotShouldBeFound("creationDate.lessThan=" + UPDATED_CREATION_DATE);
    }


    @Test
    @Transactional
    public void getAllLotsByNumberOfItemsIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where numberOfItems equals to DEFAULT_NUMBER_OF_ITEMS
        defaultLotShouldBeFound("numberOfItems.equals=" + DEFAULT_NUMBER_OF_ITEMS);

        // Get all the lotList where numberOfItems equals to UPDATED_NUMBER_OF_ITEMS
        defaultLotShouldNotBeFound("numberOfItems.equals=" + UPDATED_NUMBER_OF_ITEMS);
    }

    @Test
    @Transactional
    public void getAllLotsByNumberOfItemsIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where numberOfItems in DEFAULT_NUMBER_OF_ITEMS or UPDATED_NUMBER_OF_ITEMS
        defaultLotShouldBeFound("numberOfItems.in=" + DEFAULT_NUMBER_OF_ITEMS + "," + UPDATED_NUMBER_OF_ITEMS);

        // Get all the lotList where numberOfItems equals to UPDATED_NUMBER_OF_ITEMS
        defaultLotShouldNotBeFound("numberOfItems.in=" + UPDATED_NUMBER_OF_ITEMS);
    }

    @Test
    @Transactional
    public void getAllLotsByNumberOfItemsIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where numberOfItems is not null
        defaultLotShouldBeFound("numberOfItems.specified=true");

        // Get all the lotList where numberOfItems is null
        defaultLotShouldNotBeFound("numberOfItems.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByNumberOfItemsIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where numberOfItems greater than or equals to DEFAULT_NUMBER_OF_ITEMS
        defaultLotShouldBeFound("numberOfItems.greaterOrEqualThan=" + DEFAULT_NUMBER_OF_ITEMS);

        // Get all the lotList where numberOfItems greater than or equals to UPDATED_NUMBER_OF_ITEMS
        defaultLotShouldNotBeFound("numberOfItems.greaterOrEqualThan=" + UPDATED_NUMBER_OF_ITEMS);
    }

    @Test
    @Transactional
    public void getAllLotsByNumberOfItemsIsLessThanSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where numberOfItems less than or equals to DEFAULT_NUMBER_OF_ITEMS
        defaultLotShouldNotBeFound("numberOfItems.lessThan=" + DEFAULT_NUMBER_OF_ITEMS);

        // Get all the lotList where numberOfItems less than or equals to UPDATED_NUMBER_OF_ITEMS
        defaultLotShouldBeFound("numberOfItems.lessThan=" + UPDATED_NUMBER_OF_ITEMS);
    }


    @Test
    @Transactional
    public void getAllLotsByCommentsIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where comments equals to DEFAULT_COMMENTS
        defaultLotShouldBeFound("comments.equals=" + DEFAULT_COMMENTS);

        // Get all the lotList where comments equals to UPDATED_COMMENTS
        defaultLotShouldNotBeFound("comments.equals=" + UPDATED_COMMENTS);
    }

    @Test
    @Transactional
    public void getAllLotsByCommentsIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where comments in DEFAULT_COMMENTS or UPDATED_COMMENTS
        defaultLotShouldBeFound("comments.in=" + DEFAULT_COMMENTS + "," + UPDATED_COMMENTS);

        // Get all the lotList where comments equals to UPDATED_COMMENTS
        defaultLotShouldNotBeFound("comments.in=" + UPDATED_COMMENTS);
    }

    @Test
    @Transactional
    public void getAllLotsByCommentsIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where comments is not null
        defaultLotShouldBeFound("comments.specified=true");

        // Get all the lotList where comments is null
        defaultLotShouldNotBeFound("comments.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByUnitBuyPriceIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where unitBuyPrice equals to DEFAULT_UNIT_BUY_PRICE
        defaultLotShouldBeFound("unitBuyPrice.equals=" + DEFAULT_UNIT_BUY_PRICE);

        // Get all the lotList where unitBuyPrice equals to UPDATED_UNIT_BUY_PRICE
        defaultLotShouldNotBeFound("unitBuyPrice.equals=" + UPDATED_UNIT_BUY_PRICE);
    }

    @Test
    @Transactional
    public void getAllLotsByUnitBuyPriceIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where unitBuyPrice in DEFAULT_UNIT_BUY_PRICE or UPDATED_UNIT_BUY_PRICE
        defaultLotShouldBeFound("unitBuyPrice.in=" + DEFAULT_UNIT_BUY_PRICE + "," + UPDATED_UNIT_BUY_PRICE);

        // Get all the lotList where unitBuyPrice equals to UPDATED_UNIT_BUY_PRICE
        defaultLotShouldNotBeFound("unitBuyPrice.in=" + UPDATED_UNIT_BUY_PRICE);
    }

    @Test
    @Transactional
    public void getAllLotsByUnitBuyPriceIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where unitBuyPrice is not null
        defaultLotShouldBeFound("unitBuyPrice.specified=true");

        // Get all the lotList where unitBuyPrice is null
        defaultLotShouldNotBeFound("unitBuyPrice.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByItemsGeneratedIsEqualToSomething() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where itemsGenerated equals to DEFAULT_ITEMS_GENERATED
        defaultLotShouldBeFound("itemsGenerated.equals=" + DEFAULT_ITEMS_GENERATED);

        // Get all the lotList where itemsGenerated equals to UPDATED_ITEMS_GENERATED
        defaultLotShouldNotBeFound("itemsGenerated.equals=" + UPDATED_ITEMS_GENERATED);
    }

    @Test
    @Transactional
    public void getAllLotsByItemsGeneratedIsInShouldWork() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where itemsGenerated in DEFAULT_ITEMS_GENERATED or UPDATED_ITEMS_GENERATED
        defaultLotShouldBeFound("itemsGenerated.in=" + DEFAULT_ITEMS_GENERATED + "," + UPDATED_ITEMS_GENERATED);

        // Get all the lotList where itemsGenerated equals to UPDATED_ITEMS_GENERATED
        defaultLotShouldNotBeFound("itemsGenerated.in=" + UPDATED_ITEMS_GENERATED);
    }

    @Test
    @Transactional
    public void getAllLotsByItemsGeneratedIsNullOrNotNull() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList where itemsGenerated is not null
        defaultLotShouldBeFound("itemsGenerated.specified=true");

        // Get all the lotList where itemsGenerated is null
        defaultLotShouldNotBeFound("itemsGenerated.specified=false");
    }

    @Test
    @Transactional
    public void getAllLotsByMaterialLotIsEqualToSomething() throws Exception {
        // Initialize the database
        Material materialLot = MaterialResourceIntTest.createEntity(em);
        em.persist(materialLot);
        em.flush();
        lot.addMaterialLot(materialLot);
        lotRepository.saveAndFlush(lot);
        Long materialLotId = materialLot.getId();

        // Get all the lotList where materialLot equals to materialLotId
        defaultLotShouldBeFound("materialLotId.equals=" + materialLotId);

        // Get all the lotList where materialLot equals to materialLotId + 1
        defaultLotShouldNotBeFound("materialLotId.equals=" + (materialLotId + 1));
    }


    @Test
    @Transactional
    public void getAllLotsByBuycurrencylotIsEqualToSomething() throws Exception {
        // Initialize the database
        Currency buycurrencylot = CurrencyResourceIntTest.createEntity(em);
        em.persist(buycurrencylot);
        em.flush();
        lot.setBuycurrencylot(buycurrencylot);
        lotRepository.saveAndFlush(lot);
        Long buycurrencylotId = buycurrencylot.getId();

        // Get all the lotList where buycurrencylot equals to buycurrencylotId
        defaultLotShouldBeFound("buycurrencylotId.equals=" + buycurrencylotId);

        // Get all the lotList where buycurrencylot equals to buycurrencylotId + 1
        defaultLotShouldNotBeFound("buycurrencylotId.equals=" + (buycurrencylotId + 1));
    }


    @Test
    @Transactional
    public void getAllLotsByMaterialclassificationIsEqualToSomething() throws Exception {
        // Initialize the database
        Materialclassification materialclassification = MaterialclassificationResourceIntTest.createEntity(em);
        em.persist(materialclassification);
        em.flush();
        lot.setMaterialclassification(materialclassification);
        lotRepository.saveAndFlush(lot);
        Long materialclassificationId = materialclassification.getId();

        // Get all the lotList where materialclassification equals to materialclassificationId
        defaultLotShouldBeFound("materialclassificationId.equals=" + materialclassificationId);

        // Get all the lotList where materialclassification equals to materialclassificationId + 1
        defaultLotShouldNotBeFound("materialclassificationId.equals=" + (materialclassificationId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultLotShouldBeFound(String filter) throws Exception {
        restLotMockMvc.perform(get("/api/lots?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].numberOfItems").value(hasItem(DEFAULT_NUMBER_OF_ITEMS.intValue())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())))
            .andExpect(jsonPath("$.[*].unitBuyPrice").value(hasItem(DEFAULT_UNIT_BUY_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].itemsGenerated").value(hasItem(DEFAULT_ITEMS_GENERATED.booleanValue())));

        // Check, that the count call also returns 1
        restLotMockMvc.perform(get("/api/lots/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultLotShouldNotBeFound(String filter) throws Exception {
        restLotMockMvc.perform(get("/api/lots?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restLotMockMvc.perform(get("/api/lots/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingLot() throws Exception {
        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Update the lot
        Lot updatedLot = lotRepository.findById(lot.getId()).get();
        // Disconnect from session so that the updates on updatedLot are not directly saved in db
        em.detach(updatedLot);
        updatedLot
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .numberOfItems(UPDATED_NUMBER_OF_ITEMS)
            .comments(UPDATED_COMMENTS)
            .unitBuyPrice(UPDATED_UNIT_BUY_PRICE)
            .itemsGenerated(UPDATED_ITEMS_GENERATED);
        LotDTO lotDTO = lotMapper.toDto(updatedLot);

        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isOk());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testLot.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLot.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testLot.getNumberOfItems()).isEqualTo(UPDATED_NUMBER_OF_ITEMS);
        assertThat(testLot.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testLot.getUnitBuyPrice()).isEqualTo(UPDATED_UNIT_BUY_PRICE);
        assertThat(testLot.isItemsGenerated()).isEqualTo(UPDATED_ITEMS_GENERATED);
    }

    @Test
    @Transactional
    public void updateNonExistingLot() throws Exception {
        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Create the Lot
        LotDTO lotDTO = lotMapper.toDto(lot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeDelete = lotRepository.findAll().size();

        // Get the lot
        restLotMockMvc.perform(delete("/api/lots/{id}", lot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lot.class);
        Lot lot1 = new Lot();
        lot1.setId(1L);
        Lot lot2 = new Lot();
        lot2.setId(lot1.getId());
        assertThat(lot1).isEqualTo(lot2);
        lot2.setId(2L);
        assertThat(lot1).isNotEqualTo(lot2);
        lot1.setId(null);
        assertThat(lot1).isNotEqualTo(lot2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LotDTO.class);
        LotDTO lotDTO1 = new LotDTO();
        lotDTO1.setId(1L);
        LotDTO lotDTO2 = new LotDTO();
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
        lotDTO2.setId(lotDTO1.getId());
        assertThat(lotDTO1).isEqualTo(lotDTO2);
        lotDTO2.setId(2L);
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
        lotDTO1.setId(null);
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lotMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lotMapper.fromId(null)).isNull();
    }
}
