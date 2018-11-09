package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird;
import com.kirgiz.stocksndsalesmanagement.domain.User;
import com.kirgiz.stocksndsalesmanagement.domain.Third;
import com.kirgiz.stocksndsalesmanagement.repository.UserAuthorizedThirdRepository;
import com.kirgiz.stocksndsalesmanagement.service.UserAuthorizedThirdService;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.UserAuthorizedThirdMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdCriteria;
import com.kirgiz.stocksndsalesmanagement.service.UserAuthorizedThirdQueryService;

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
 * Test class for the UserAuthorizedThirdResource REST controller.
 *
 * @see UserAuthorizedThirdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class UserAuthorizedThirdResourceIntTest {

    private static final Boolean DEFAULT_DEFAULT_THIRD = false;
    private static final Boolean UPDATED_DEFAULT_THIRD = true;

    private static final Boolean DEFAULT_DEFAULT_DESTINATION = false;
    private static final Boolean UPDATED_DEFAULT_DESTINATION = true;

    @Autowired
    private UserAuthorizedThirdRepository userAuthorizedThirdRepository;

    @Autowired
    private UserAuthorizedThirdMapper userAuthorizedThirdMapper;

    @Autowired
    private UserAuthorizedThirdService userAuthorizedThirdService;

    @Autowired
    private UserAuthorizedThirdQueryService userAuthorizedThirdQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserAuthorizedThirdMockMvc;

    private UserAuthorizedThird userAuthorizedThird;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserAuthorizedThirdResource userAuthorizedThirdResource = new UserAuthorizedThirdResource(userAuthorizedThirdService, userAuthorizedThirdQueryService);
        this.restUserAuthorizedThirdMockMvc = MockMvcBuilders.standaloneSetup(userAuthorizedThirdResource)
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
    public static UserAuthorizedThird createEntity(EntityManager em) {
        UserAuthorizedThird userAuthorizedThird = new UserAuthorizedThird()
            .defaultThird(DEFAULT_DEFAULT_THIRD)
            .defaultDestination(DEFAULT_DEFAULT_DESTINATION);
        return userAuthorizedThird;
    }

    @Before
    public void initTest() {
        userAuthorizedThird = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserAuthorizedThird() throws Exception {
        int databaseSizeBeforeCreate = userAuthorizedThirdRepository.findAll().size();

        // Create the UserAuthorizedThird
        UserAuthorizedThirdDTO userAuthorizedThirdDTO = userAuthorizedThirdMapper.toDto(userAuthorizedThird);
        restUserAuthorizedThirdMockMvc.perform(post("/api/user-authorized-thirds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAuthorizedThirdDTO)))
            .andExpect(status().isCreated());

        // Validate the UserAuthorizedThird in the database
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeCreate + 1);
        UserAuthorizedThird testUserAuthorizedThird = userAuthorizedThirdList.get(userAuthorizedThirdList.size() - 1);
        assertThat(testUserAuthorizedThird.isDefaultThird()).isEqualTo(DEFAULT_DEFAULT_THIRD);
        assertThat(testUserAuthorizedThird.isDefaultDestination()).isEqualTo(DEFAULT_DEFAULT_DESTINATION);
    }

    @Test
    @Transactional
    public void createUserAuthorizedThirdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userAuthorizedThirdRepository.findAll().size();

        // Create the UserAuthorizedThird with an existing ID
        userAuthorizedThird.setId(1L);
        UserAuthorizedThirdDTO userAuthorizedThirdDTO = userAuthorizedThirdMapper.toDto(userAuthorizedThird);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAuthorizedThirdMockMvc.perform(post("/api/user-authorized-thirds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAuthorizedThirdDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserAuthorizedThird in the database
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirds() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList
        restUserAuthorizedThirdMockMvc.perform(get("/api/user-authorized-thirds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAuthorizedThird.getId().intValue())))
            .andExpect(jsonPath("$.[*].defaultThird").value(hasItem(DEFAULT_DEFAULT_THIRD.booleanValue())))
            .andExpect(jsonPath("$.[*].defaultDestination").value(hasItem(DEFAULT_DEFAULT_DESTINATION.booleanValue())));
    }

    @Test
    @Transactional
    public void getUserAuthorizedThird() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get the userAuthorizedThird
        restUserAuthorizedThirdMockMvc.perform(get("/api/user-authorized-thirds/{id}", userAuthorizedThird.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userAuthorizedThird.getId().intValue()))
            .andExpect(jsonPath("$.defaultThird").value(DEFAULT_DEFAULT_THIRD.booleanValue()))
            .andExpect(jsonPath("$.defaultDestination").value(DEFAULT_DEFAULT_DESTINATION.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultThirdIsEqualToSomething() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultThird equals to DEFAULT_DEFAULT_THIRD
        defaultUserAuthorizedThirdShouldBeFound("defaultThird.equals=" + DEFAULT_DEFAULT_THIRD);

        // Get all the userAuthorizedThirdList where defaultThird equals to UPDATED_DEFAULT_THIRD
        defaultUserAuthorizedThirdShouldNotBeFound("defaultThird.equals=" + UPDATED_DEFAULT_THIRD);
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultThirdIsInShouldWork() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultThird in DEFAULT_DEFAULT_THIRD or UPDATED_DEFAULT_THIRD
        defaultUserAuthorizedThirdShouldBeFound("defaultThird.in=" + DEFAULT_DEFAULT_THIRD + "," + UPDATED_DEFAULT_THIRD);

        // Get all the userAuthorizedThirdList where defaultThird equals to UPDATED_DEFAULT_THIRD
        defaultUserAuthorizedThirdShouldNotBeFound("defaultThird.in=" + UPDATED_DEFAULT_THIRD);
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultThirdIsNullOrNotNull() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultThird is not null
        defaultUserAuthorizedThirdShouldBeFound("defaultThird.specified=true");

        // Get all the userAuthorizedThirdList where defaultThird is null
        defaultUserAuthorizedThirdShouldNotBeFound("defaultThird.specified=false");
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultDestinationIsEqualToSomething() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultDestination equals to DEFAULT_DEFAULT_DESTINATION
        defaultUserAuthorizedThirdShouldBeFound("defaultDestination.equals=" + DEFAULT_DEFAULT_DESTINATION);

        // Get all the userAuthorizedThirdList where defaultDestination equals to UPDATED_DEFAULT_DESTINATION
        defaultUserAuthorizedThirdShouldNotBeFound("defaultDestination.equals=" + UPDATED_DEFAULT_DESTINATION);
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultDestinationIsInShouldWork() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultDestination in DEFAULT_DEFAULT_DESTINATION or UPDATED_DEFAULT_DESTINATION
        defaultUserAuthorizedThirdShouldBeFound("defaultDestination.in=" + DEFAULT_DEFAULT_DESTINATION + "," + UPDATED_DEFAULT_DESTINATION);

        // Get all the userAuthorizedThirdList where defaultDestination equals to UPDATED_DEFAULT_DESTINATION
        defaultUserAuthorizedThirdShouldNotBeFound("defaultDestination.in=" + UPDATED_DEFAULT_DESTINATION);
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByDefaultDestinationIsNullOrNotNull() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);

        // Get all the userAuthorizedThirdList where defaultDestination is not null
        defaultUserAuthorizedThirdShouldBeFound("defaultDestination.specified=true");

        // Get all the userAuthorizedThirdList where defaultDestination is null
        defaultUserAuthorizedThirdShouldNotBeFound("defaultDestination.specified=false");
    }

    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByUserAuthIsEqualToSomething() throws Exception {
        // Initialize the database
        User userAuth = UserResourceIntTest.createEntity(em);
        em.persist(userAuth);
        em.flush();
        userAuthorizedThird.setUserAuth(userAuth);
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);
        Long userAuthId = userAuth.getId();

        // Get all the userAuthorizedThirdList where userAuth equals to userAuthId
        defaultUserAuthorizedThirdShouldBeFound("userAuthId.equals=" + userAuthId);

        // Get all the userAuthorizedThirdList where userAuth equals to userAuthId + 1
        defaultUserAuthorizedThirdShouldNotBeFound("userAuthId.equals=" + (userAuthId + 1));
    }


    @Test
    @Transactional
    public void getAllUserAuthorizedThirdsByThirdAuthIsEqualToSomething() throws Exception {
        // Initialize the database
        Third thirdAuth = ThirdResourceIntTest.createEntity(em);
        em.persist(thirdAuth);
        em.flush();
        userAuthorizedThird.setThirdAuth(thirdAuth);
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);
        Long thirdAuthId = thirdAuth.getId();

        // Get all the userAuthorizedThirdList where thirdAuth equals to thirdAuthId
        defaultUserAuthorizedThirdShouldBeFound("thirdAuthId.equals=" + thirdAuthId);

        // Get all the userAuthorizedThirdList where thirdAuth equals to thirdAuthId + 1
        defaultUserAuthorizedThirdShouldNotBeFound("thirdAuthId.equals=" + (thirdAuthId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultUserAuthorizedThirdShouldBeFound(String filter) throws Exception {
        restUserAuthorizedThirdMockMvc.perform(get("/api/user-authorized-thirds?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAuthorizedThird.getId().intValue())))
            .andExpect(jsonPath("$.[*].defaultThird").value(hasItem(DEFAULT_DEFAULT_THIRD.booleanValue())))
            .andExpect(jsonPath("$.[*].defaultDestination").value(hasItem(DEFAULT_DEFAULT_DESTINATION.booleanValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultUserAuthorizedThirdShouldNotBeFound(String filter) throws Exception {
        restUserAuthorizedThirdMockMvc.perform(get("/api/user-authorized-thirds?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingUserAuthorizedThird() throws Exception {
        // Get the userAuthorizedThird
        restUserAuthorizedThirdMockMvc.perform(get("/api/user-authorized-thirds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserAuthorizedThird() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);
        int databaseSizeBeforeUpdate = userAuthorizedThirdRepository.findAll().size();

        // Update the userAuthorizedThird
        UserAuthorizedThird updatedUserAuthorizedThird = userAuthorizedThirdRepository.findOne(userAuthorizedThird.getId());
        // Disconnect from session so that the updates on updatedUserAuthorizedThird are not directly saved in db
        em.detach(updatedUserAuthorizedThird);
        updatedUserAuthorizedThird
            .defaultThird(UPDATED_DEFAULT_THIRD)
            .defaultDestination(UPDATED_DEFAULT_DESTINATION);
        UserAuthorizedThirdDTO userAuthorizedThirdDTO = userAuthorizedThirdMapper.toDto(updatedUserAuthorizedThird);

        restUserAuthorizedThirdMockMvc.perform(put("/api/user-authorized-thirds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAuthorizedThirdDTO)))
            .andExpect(status().isOk());

        // Validate the UserAuthorizedThird in the database
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeUpdate);
        UserAuthorizedThird testUserAuthorizedThird = userAuthorizedThirdList.get(userAuthorizedThirdList.size() - 1);
        assertThat(testUserAuthorizedThird.isDefaultThird()).isEqualTo(UPDATED_DEFAULT_THIRD);
        assertThat(testUserAuthorizedThird.isDefaultDestination()).isEqualTo(UPDATED_DEFAULT_DESTINATION);
    }

    @Test
    @Transactional
    public void updateNonExistingUserAuthorizedThird() throws Exception {
        int databaseSizeBeforeUpdate = userAuthorizedThirdRepository.findAll().size();

        // Create the UserAuthorizedThird
        UserAuthorizedThirdDTO userAuthorizedThirdDTO = userAuthorizedThirdMapper.toDto(userAuthorizedThird);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserAuthorizedThirdMockMvc.perform(put("/api/user-authorized-thirds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAuthorizedThirdDTO)))
            .andExpect(status().isCreated());

        // Validate the UserAuthorizedThird in the database
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserAuthorizedThird() throws Exception {
        // Initialize the database
        userAuthorizedThirdRepository.saveAndFlush(userAuthorizedThird);
        int databaseSizeBeforeDelete = userAuthorizedThirdRepository.findAll().size();

        // Get the userAuthorizedThird
        restUserAuthorizedThirdMockMvc.perform(delete("/api/user-authorized-thirds/{id}", userAuthorizedThird.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAuthorizedThird.class);
        UserAuthorizedThird userAuthorizedThird1 = new UserAuthorizedThird();
        userAuthorizedThird1.setId(1L);
        UserAuthorizedThird userAuthorizedThird2 = new UserAuthorizedThird();
        userAuthorizedThird2.setId(userAuthorizedThird1.getId());
        assertThat(userAuthorizedThird1).isEqualTo(userAuthorizedThird2);
        userAuthorizedThird2.setId(2L);
        assertThat(userAuthorizedThird1).isNotEqualTo(userAuthorizedThird2);
        userAuthorizedThird1.setId(null);
        assertThat(userAuthorizedThird1).isNotEqualTo(userAuthorizedThird2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAuthorizedThirdDTO.class);
        UserAuthorizedThirdDTO userAuthorizedThirdDTO1 = new UserAuthorizedThirdDTO();
        userAuthorizedThirdDTO1.setId(1L);
        UserAuthorizedThirdDTO userAuthorizedThirdDTO2 = new UserAuthorizedThirdDTO();
        assertThat(userAuthorizedThirdDTO1).isNotEqualTo(userAuthorizedThirdDTO2);
        userAuthorizedThirdDTO2.setId(userAuthorizedThirdDTO1.getId());
        assertThat(userAuthorizedThirdDTO1).isEqualTo(userAuthorizedThirdDTO2);
        userAuthorizedThirdDTO2.setId(2L);
        assertThat(userAuthorizedThirdDTO1).isNotEqualTo(userAuthorizedThirdDTO2);
        userAuthorizedThirdDTO1.setId(null);
        assertThat(userAuthorizedThirdDTO1).isNotEqualTo(userAuthorizedThirdDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userAuthorizedThirdMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userAuthorizedThirdMapper.fromId(null)).isNull();
    }
}
