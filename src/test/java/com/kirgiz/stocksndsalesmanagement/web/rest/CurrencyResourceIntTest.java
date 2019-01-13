package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.Currency;
import com.kirgiz.stocksndsalesmanagement.domain.Company;
import com.kirgiz.stocksndsalesmanagement.domain.Forexrates;
import com.kirgiz.stocksndsalesmanagement.domain.Dashboard;
import com.kirgiz.stocksndsalesmanagement.domain.Lot;
import com.kirgiz.stocksndsalesmanagement.repository.CurrencyRepository;
import com.kirgiz.stocksndsalesmanagement.service.CurrencyService;
import com.kirgiz.stocksndsalesmanagement.service.dto.CurrencyDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.CurrencyMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;
import com.kirgiz.stocksndsalesmanagement.service.dto.CurrencyCriteria;
import com.kirgiz.stocksndsalesmanagement.service.CurrencyQueryService;

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
import java.util.List;


import static com.kirgiz.stocksndsalesmanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CurrencyResource REST controller.
 *
 * @see CurrencyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class CurrencyResourceIntTest {

    private static final String DEFAULT_ISO_CODE = "AAA";
    private static final String UPDATED_ISO_CODE = "BBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private CurrencyMapper currencyMapper;

    @Autowired
    private CurrencyService currencyService;

    @Autowired
    private CurrencyQueryService currencyQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCurrencyMockMvc;

    private Currency currency;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CurrencyResource currencyResource = new CurrencyResource(currencyService, currencyQueryService);
        this.restCurrencyMockMvc = MockMvcBuilders.standaloneSetup(currencyResource)
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
    public static Currency createEntity(EntityManager em) {
        Currency currency = new Currency()
            .isoCode(DEFAULT_ISO_CODE)
            .name(DEFAULT_NAME);
        return currency;
    }

    @Before
    public void initTest() {
        currency = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurrency() throws Exception {
        int databaseSizeBeforeCreate = currencyRepository.findAll().size();

        // Create the Currency
        CurrencyDTO currencyDTO = currencyMapper.toDto(currency);
        restCurrencyMockMvc.perform(post("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isCreated());

        // Validate the Currency in the database
        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeCreate + 1);
        Currency testCurrency = currencyList.get(currencyList.size() - 1);
        assertThat(testCurrency.getIsoCode()).isEqualTo(DEFAULT_ISO_CODE);
        assertThat(testCurrency.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCurrencyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = currencyRepository.findAll().size();

        // Create the Currency with an existing ID
        currency.setId(1L);
        CurrencyDTO currencyDTO = currencyMapper.toDto(currency);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCurrencyMockMvc.perform(post("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Currency in the database
        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIsoCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = currencyRepository.findAll().size();
        // set the field null
        currency.setIsoCode(null);

        // Create the Currency, which fails.
        CurrencyDTO currencyDTO = currencyMapper.toDto(currency);

        restCurrencyMockMvc.perform(post("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isBadRequest());

        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = currencyRepository.findAll().size();
        // set the field null
        currency.setName(null);

        // Create the Currency, which fails.
        CurrencyDTO currencyDTO = currencyMapper.toDto(currency);

        restCurrencyMockMvc.perform(post("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isBadRequest());

        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCurrencies() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList
        restCurrencyMockMvc.perform(get("/api/currencies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currency.getId().intValue())))
            .andExpect(jsonPath("$.[*].isoCode").value(hasItem(DEFAULT_ISO_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getCurrency() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get the currency
        restCurrencyMockMvc.perform(get("/api/currencies/{id}", currency.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(currency.getId().intValue()))
            .andExpect(jsonPath("$.isoCode").value(DEFAULT_ISO_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getAllCurrenciesByIsoCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where isoCode equals to DEFAULT_ISO_CODE
        defaultCurrencyShouldBeFound("isoCode.equals=" + DEFAULT_ISO_CODE);

        // Get all the currencyList where isoCode equals to UPDATED_ISO_CODE
        defaultCurrencyShouldNotBeFound("isoCode.equals=" + UPDATED_ISO_CODE);
    }

    @Test
    @Transactional
    public void getAllCurrenciesByIsoCodeIsInShouldWork() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where isoCode in DEFAULT_ISO_CODE or UPDATED_ISO_CODE
        defaultCurrencyShouldBeFound("isoCode.in=" + DEFAULT_ISO_CODE + "," + UPDATED_ISO_CODE);

        // Get all the currencyList where isoCode equals to UPDATED_ISO_CODE
        defaultCurrencyShouldNotBeFound("isoCode.in=" + UPDATED_ISO_CODE);
    }

    @Test
    @Transactional
    public void getAllCurrenciesByIsoCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where isoCode is not null
        defaultCurrencyShouldBeFound("isoCode.specified=true");

        // Get all the currencyList where isoCode is null
        defaultCurrencyShouldNotBeFound("isoCode.specified=false");
    }

    @Test
    @Transactional
    public void getAllCurrenciesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where name equals to DEFAULT_NAME
        defaultCurrencyShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the currencyList where name equals to UPDATED_NAME
        defaultCurrencyShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllCurrenciesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where name in DEFAULT_NAME or UPDATED_NAME
        defaultCurrencyShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the currencyList where name equals to UPDATED_NAME
        defaultCurrencyShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllCurrenciesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        // Get all the currencyList where name is not null
        defaultCurrencyShouldBeFound("name.specified=true");

        // Get all the currencyList where name is null
        defaultCurrencyShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllCurrenciesByCompanyBaseCurrencyIsEqualToSomething() throws Exception {
        // Initialize the database
        Company companyBaseCurrency = CompanyResourceIntTest.createEntity(em);
        em.persist(companyBaseCurrency);
        em.flush();
        currency.addCompanyBaseCurrency(companyBaseCurrency);
        currencyRepository.saveAndFlush(currency);
        Long companyBaseCurrencyId = companyBaseCurrency.getId();

        // Get all the currencyList where companyBaseCurrency equals to companyBaseCurrencyId
        defaultCurrencyShouldBeFound("companyBaseCurrencyId.equals=" + companyBaseCurrencyId);

        // Get all the currencyList where companyBaseCurrency equals to companyBaseCurrencyId + 1
        defaultCurrencyShouldNotBeFound("companyBaseCurrencyId.equals=" + (companyBaseCurrencyId + 1));
    }


    @Test
    @Transactional
    public void getAllCurrenciesByCurrencyRateIsEqualToSomething() throws Exception {
        // Initialize the database
        Forexrates currencyRate = ForexratesResourceIntTest.createEntity(em);
        em.persist(currencyRate);
        em.flush();
        currency.addCurrencyRate(currencyRate);
        currencyRepository.saveAndFlush(currency);
        Long currencyRateId = currencyRate.getId();

        // Get all the currencyList where currencyRate equals to currencyRateId
        defaultCurrencyShouldBeFound("currencyRateId.equals=" + currencyRateId);

        // Get all the currencyList where currencyRate equals to currencyRateId + 1
        defaultCurrencyShouldNotBeFound("currencyRateId.equals=" + (currencyRateId + 1));
    }


    @Test
    @Transactional
    public void getAllCurrenciesByCurrencyDashboardIsEqualToSomething() throws Exception {
        // Initialize the database
        Dashboard currencyDashboard = DashboardResourceIntTest.createEntity(em);
        em.persist(currencyDashboard);
        em.flush();
        currency.addCurrencyDashboard(currencyDashboard);
        currencyRepository.saveAndFlush(currency);
        Long currencyDashboardId = currencyDashboard.getId();

        // Get all the currencyList where currencyDashboard equals to currencyDashboardId
        defaultCurrencyShouldBeFound("currencyDashboardId.equals=" + currencyDashboardId);

        // Get all the currencyList where currencyDashboard equals to currencyDashboardId + 1
        defaultCurrencyShouldNotBeFound("currencyDashboardId.equals=" + (currencyDashboardId + 1));
    }


    @Test
    @Transactional
    public void getAllCurrenciesByLotBuyCurrencyIsEqualToSomething() throws Exception {
        // Initialize the database
        Lot lotBuyCurrency = LotResourceIntTest.createEntity(em);
        em.persist(lotBuyCurrency);
        em.flush();
        currency.addLotBuyCurrency(lotBuyCurrency);
        currencyRepository.saveAndFlush(currency);
        Long lotBuyCurrencyId = lotBuyCurrency.getId();

        // Get all the currencyList where lotBuyCurrency equals to lotBuyCurrencyId
        defaultCurrencyShouldBeFound("lotBuyCurrencyId.equals=" + lotBuyCurrencyId);

        // Get all the currencyList where lotBuyCurrency equals to lotBuyCurrencyId + 1
        defaultCurrencyShouldNotBeFound("lotBuyCurrencyId.equals=" + (lotBuyCurrencyId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultCurrencyShouldBeFound(String filter) throws Exception {
        restCurrencyMockMvc.perform(get("/api/currencies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currency.getId().intValue())))
            .andExpect(jsonPath("$.[*].isoCode").value(hasItem(DEFAULT_ISO_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));

        // Check, that the count call also returns 1
        restCurrencyMockMvc.perform(get("/api/currencies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultCurrencyShouldNotBeFound(String filter) throws Exception {
        restCurrencyMockMvc.perform(get("/api/currencies?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCurrencyMockMvc.perform(get("/api/currencies/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCurrency() throws Exception {
        // Get the currency
        restCurrencyMockMvc.perform(get("/api/currencies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurrency() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        int databaseSizeBeforeUpdate = currencyRepository.findAll().size();

        // Update the currency
        Currency updatedCurrency = currencyRepository.findById(currency.getId()).get();
        // Disconnect from session so that the updates on updatedCurrency are not directly saved in db
        em.detach(updatedCurrency);
        updatedCurrency
            .isoCode(UPDATED_ISO_CODE)
            .name(UPDATED_NAME);
        CurrencyDTO currencyDTO = currencyMapper.toDto(updatedCurrency);

        restCurrencyMockMvc.perform(put("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isOk());

        // Validate the Currency in the database
        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeUpdate);
        Currency testCurrency = currencyList.get(currencyList.size() - 1);
        assertThat(testCurrency.getIsoCode()).isEqualTo(UPDATED_ISO_CODE);
        assertThat(testCurrency.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCurrency() throws Exception {
        int databaseSizeBeforeUpdate = currencyRepository.findAll().size();

        // Create the Currency
        CurrencyDTO currencyDTO = currencyMapper.toDto(currency);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCurrencyMockMvc.perform(put("/api/currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currencyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Currency in the database
        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCurrency() throws Exception {
        // Initialize the database
        currencyRepository.saveAndFlush(currency);

        int databaseSizeBeforeDelete = currencyRepository.findAll().size();

        // Get the currency
        restCurrencyMockMvc.perform(delete("/api/currencies/{id}", currency.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Currency> currencyList = currencyRepository.findAll();
        assertThat(currencyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Currency.class);
        Currency currency1 = new Currency();
        currency1.setId(1L);
        Currency currency2 = new Currency();
        currency2.setId(currency1.getId());
        assertThat(currency1).isEqualTo(currency2);
        currency2.setId(2L);
        assertThat(currency1).isNotEqualTo(currency2);
        currency1.setId(null);
        assertThat(currency1).isNotEqualTo(currency2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrencyDTO.class);
        CurrencyDTO currencyDTO1 = new CurrencyDTO();
        currencyDTO1.setId(1L);
        CurrencyDTO currencyDTO2 = new CurrencyDTO();
        assertThat(currencyDTO1).isNotEqualTo(currencyDTO2);
        currencyDTO2.setId(currencyDTO1.getId());
        assertThat(currencyDTO1).isEqualTo(currencyDTO2);
        currencyDTO2.setId(2L);
        assertThat(currencyDTO1).isNotEqualTo(currencyDTO2);
        currencyDTO1.setId(null);
        assertThat(currencyDTO1).isNotEqualTo(currencyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(currencyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(currencyMapper.fromId(null)).isNull();
    }
}
