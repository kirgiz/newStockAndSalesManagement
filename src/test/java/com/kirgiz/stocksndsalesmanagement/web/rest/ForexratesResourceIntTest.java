package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import com.kirgiz.stocksndsalesmanagement.domain.Currency;
import com.kirgiz.stocksndsalesmanagement.repository.ForexratesRepository;
import com.kirgiz.stocksndsalesmanagement.service.ForexratesService;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.ForexratesMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;
import com.kirgiz.stocksndsalesmanagement.service.dto.ForexratesCriteria;
import com.kirgiz.stocksndsalesmanagement.service.ForexratesQueryService;

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
 * Test class for the ForexratesResource REST controller.
 *
 * @see ForexratesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class ForexratesResourceIntTest {

    private static final LocalDate DEFAULT_RATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RATE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_STRAIGH_RATE = 1D;
    private static final Double UPDATED_STRAIGH_RATE = 2D;

    @Autowired
    private ForexratesRepository forexratesRepository;

    @Autowired
    private ForexratesMapper forexratesMapper;

    @Autowired
    private ForexratesService forexratesService;

    @Autowired
    private ForexratesQueryService forexratesQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restForexratesMockMvc;

    private Forexrates forexrates;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ForexratesResource forexratesResource = new ForexratesResource(forexratesService, forexratesQueryService);
        this.restForexratesMockMvc = MockMvcBuilders.standaloneSetup(forexratesResource)
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
    public static Forexrates createEntity(EntityManager em) {
        Forexrates forexrates = new Forexrates()
            .rateDate(DEFAULT_RATE_DATE)
            .straighRate(DEFAULT_STRAIGH_RATE);
        // Add required entity
        Currency currency = CurrencyResourceIntTest.createEntity(em);
        em.persist(currency);
        em.flush();
        forexrates.setRateForCurrency(currency);
        return forexrates;
    }

    @Before
    public void initTest() {
        forexrates = createEntity(em);
    }

    @Test
    @Transactional
    public void createForexrates() throws Exception {
        int databaseSizeBeforeCreate = forexratesRepository.findAll().size();

        // Create the Forexrates
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(forexrates);
        restForexratesMockMvc.perform(post("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isCreated());

        // Validate the Forexrates in the database
        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeCreate + 1);
        Forexrates testForexrates = forexratesList.get(forexratesList.size() - 1);
        assertThat(testForexrates.getRateDate()).isEqualTo(DEFAULT_RATE_DATE);
        assertThat(testForexrates.getStraighRate()).isEqualTo(DEFAULT_STRAIGH_RATE);
    }

    @Test
    @Transactional
    public void createForexratesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = forexratesRepository.findAll().size();

        // Create the Forexrates with an existing ID
        forexrates.setId(1L);
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(forexrates);

        // An entity with an existing ID cannot be created, so this API call must fail
        restForexratesMockMvc.perform(post("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Forexrates in the database
        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRateDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = forexratesRepository.findAll().size();
        // set the field null
        forexrates.setRateDate(null);

        // Create the Forexrates, which fails.
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(forexrates);

        restForexratesMockMvc.perform(post("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isBadRequest());

        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStraighRateIsRequired() throws Exception {
        int databaseSizeBeforeTest = forexratesRepository.findAll().size();
        // set the field null
        forexrates.setStraighRate(null);

        // Create the Forexrates, which fails.
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(forexrates);

        restForexratesMockMvc.perform(post("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isBadRequest());

        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllForexrates() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList
        restForexratesMockMvc.perform(get("/api/forexrates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forexrates.getId().intValue())))
            .andExpect(jsonPath("$.[*].rateDate").value(hasItem(DEFAULT_RATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].straighRate").value(hasItem(DEFAULT_STRAIGH_RATE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getForexrates() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get the forexrates
        restForexratesMockMvc.perform(get("/api/forexrates/{id}", forexrates.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(forexrates.getId().intValue()))
            .andExpect(jsonPath("$.rateDate").value(DEFAULT_RATE_DATE.toString()))
            .andExpect(jsonPath("$.straighRate").value(DEFAULT_STRAIGH_RATE.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllForexratesByRateDateIsEqualToSomething() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where rateDate equals to DEFAULT_RATE_DATE
        defaultForexratesShouldBeFound("rateDate.equals=" + DEFAULT_RATE_DATE);

        // Get all the forexratesList where rateDate equals to UPDATED_RATE_DATE
        defaultForexratesShouldNotBeFound("rateDate.equals=" + UPDATED_RATE_DATE);
    }

    @Test
    @Transactional
    public void getAllForexratesByRateDateIsInShouldWork() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where rateDate in DEFAULT_RATE_DATE or UPDATED_RATE_DATE
        defaultForexratesShouldBeFound("rateDate.in=" + DEFAULT_RATE_DATE + "," + UPDATED_RATE_DATE);

        // Get all the forexratesList where rateDate equals to UPDATED_RATE_DATE
        defaultForexratesShouldNotBeFound("rateDate.in=" + UPDATED_RATE_DATE);
    }

    @Test
    @Transactional
    public void getAllForexratesByRateDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where rateDate is not null
        defaultForexratesShouldBeFound("rateDate.specified=true");

        // Get all the forexratesList where rateDate is null
        defaultForexratesShouldNotBeFound("rateDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllForexratesByRateDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where rateDate greater than or equals to DEFAULT_RATE_DATE
        defaultForexratesShouldBeFound("rateDate.greaterOrEqualThan=" + DEFAULT_RATE_DATE);

        // Get all the forexratesList where rateDate greater than or equals to UPDATED_RATE_DATE
        defaultForexratesShouldNotBeFound("rateDate.greaterOrEqualThan=" + UPDATED_RATE_DATE);
    }

    @Test
    @Transactional
    public void getAllForexratesByRateDateIsLessThanSomething() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where rateDate less than or equals to DEFAULT_RATE_DATE
        defaultForexratesShouldNotBeFound("rateDate.lessThan=" + DEFAULT_RATE_DATE);

        // Get all the forexratesList where rateDate less than or equals to UPDATED_RATE_DATE
        defaultForexratesShouldBeFound("rateDate.lessThan=" + UPDATED_RATE_DATE);
    }


    @Test
    @Transactional
    public void getAllForexratesByStraighRateIsEqualToSomething() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where straighRate equals to DEFAULT_STRAIGH_RATE
        defaultForexratesShouldBeFound("straighRate.equals=" + DEFAULT_STRAIGH_RATE);

        // Get all the forexratesList where straighRate equals to UPDATED_STRAIGH_RATE
        defaultForexratesShouldNotBeFound("straighRate.equals=" + UPDATED_STRAIGH_RATE);
    }

    @Test
    @Transactional
    public void getAllForexratesByStraighRateIsInShouldWork() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where straighRate in DEFAULT_STRAIGH_RATE or UPDATED_STRAIGH_RATE
        defaultForexratesShouldBeFound("straighRate.in=" + DEFAULT_STRAIGH_RATE + "," + UPDATED_STRAIGH_RATE);

        // Get all the forexratesList where straighRate equals to UPDATED_STRAIGH_RATE
        defaultForexratesShouldNotBeFound("straighRate.in=" + UPDATED_STRAIGH_RATE);
    }

    @Test
    @Transactional
    public void getAllForexratesByStraighRateIsNullOrNotNull() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        // Get all the forexratesList where straighRate is not null
        defaultForexratesShouldBeFound("straighRate.specified=true");

        // Get all the forexratesList where straighRate is null
        defaultForexratesShouldNotBeFound("straighRate.specified=false");
    }

    @Test
    @Transactional
    public void getAllForexratesByRateForCurrencyIsEqualToSomething() throws Exception {
        // Initialize the database
        Currency rateForCurrency = CurrencyResourceIntTest.createEntity(em);
        em.persist(rateForCurrency);
        em.flush();
        forexrates.setRateForCurrency(rateForCurrency);
        forexratesRepository.saveAndFlush(forexrates);
        Long rateForCurrencyId = rateForCurrency.getId();

        // Get all the forexratesList where rateForCurrency equals to rateForCurrencyId
        defaultForexratesShouldBeFound("rateForCurrencyId.equals=" + rateForCurrencyId);

        // Get all the forexratesList where rateForCurrency equals to rateForCurrencyId + 1
        defaultForexratesShouldNotBeFound("rateForCurrencyId.equals=" + (rateForCurrencyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultForexratesShouldBeFound(String filter) throws Exception {
        restForexratesMockMvc.perform(get("/api/forexrates?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forexrates.getId().intValue())))
            .andExpect(jsonPath("$.[*].rateDate").value(hasItem(DEFAULT_RATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].straighRate").value(hasItem(DEFAULT_STRAIGH_RATE.doubleValue())));

        // Check, that the count call also returns 1
        restForexratesMockMvc.perform(get("/api/forexrates/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultForexratesShouldNotBeFound(String filter) throws Exception {
        restForexratesMockMvc.perform(get("/api/forexrates?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restForexratesMockMvc.perform(get("/api/forexrates/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingForexrates() throws Exception {
        // Get the forexrates
        restForexratesMockMvc.perform(get("/api/forexrates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateForexrates() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        int databaseSizeBeforeUpdate = forexratesRepository.findAll().size();

        // Update the forexrates
        Forexrates updatedForexrates = forexratesRepository.findById(forexrates.getId()).get();
        // Disconnect from session so that the updates on updatedForexrates are not directly saved in db
        em.detach(updatedForexrates);
        updatedForexrates
            .rateDate(UPDATED_RATE_DATE)
            .straighRate(UPDATED_STRAIGH_RATE);
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(updatedForexrates);

        restForexratesMockMvc.perform(put("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isOk());

        // Validate the Forexrates in the database
        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeUpdate);
        Forexrates testForexrates = forexratesList.get(forexratesList.size() - 1);
        assertThat(testForexrates.getRateDate()).isEqualTo(UPDATED_RATE_DATE);
        assertThat(testForexrates.getStraighRate()).isEqualTo(UPDATED_STRAIGH_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingForexrates() throws Exception {
        int databaseSizeBeforeUpdate = forexratesRepository.findAll().size();

        // Create the Forexrates
        ForexratesDTO forexratesDTO = forexratesMapper.toDto(forexrates);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restForexratesMockMvc.perform(put("/api/forexrates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forexratesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Forexrates in the database
        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteForexrates() throws Exception {
        // Initialize the database
        forexratesRepository.saveAndFlush(forexrates);

        int databaseSizeBeforeDelete = forexratesRepository.findAll().size();

        // Get the forexrates
        restForexratesMockMvc.perform(delete("/api/forexrates/{id}", forexrates.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Forexrates> forexratesList = forexratesRepository.findAll();
        assertThat(forexratesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Forexrates.class);
        Forexrates forexrates1 = new Forexrates();
        forexrates1.setId(1L);
        Forexrates forexrates2 = new Forexrates();
        forexrates2.setId(forexrates1.getId());
        assertThat(forexrates1).isEqualTo(forexrates2);
        forexrates2.setId(2L);
        assertThat(forexrates1).isNotEqualTo(forexrates2);
        forexrates1.setId(null);
        assertThat(forexrates1).isNotEqualTo(forexrates2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ForexratesDTO.class);
        ForexratesDTO forexratesDTO1 = new ForexratesDTO();
        forexratesDTO1.setId(1L);
        ForexratesDTO forexratesDTO2 = new ForexratesDTO();
        assertThat(forexratesDTO1).isNotEqualTo(forexratesDTO2);
        forexratesDTO2.setId(forexratesDTO1.getId());
        assertThat(forexratesDTO1).isEqualTo(forexratesDTO2);
        forexratesDTO2.setId(2L);
        assertThat(forexratesDTO1).isNotEqualTo(forexratesDTO2);
        forexratesDTO1.setId(null);
        assertThat(forexratesDTO1).isNotEqualTo(forexratesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(forexratesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(forexratesMapper.fromId(null)).isNull();
    }
}
