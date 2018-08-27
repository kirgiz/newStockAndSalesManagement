package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird;
import com.kirgiz.stocksndsalesmanagement.repository.UserAuthorizedThirdRepository;
import com.kirgiz.stocksndsalesmanagement.service.UserAuthorizedThirdService;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.UserAuthorizedThirdMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;

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

    @Autowired
    private UserAuthorizedThirdRepository userAuthorizedThirdRepository;

    @Autowired
    private UserAuthorizedThirdMapper userAuthorizedThirdMapper;

    @Autowired
    private UserAuthorizedThirdService userAuthorizedThirdService;

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
        final UserAuthorizedThirdResource userAuthorizedThirdResource = new UserAuthorizedThirdResource(userAuthorizedThirdService);
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
        UserAuthorizedThird userAuthorizedThird = new UserAuthorizedThird();
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
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAuthorizedThird.getId().intValue())));
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
            .andExpect(jsonPath("$.id").value(userAuthorizedThird.getId().intValue()));
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
        UserAuthorizedThirdDTO userAuthorizedThirdDTO = userAuthorizedThirdMapper.toDto(updatedUserAuthorizedThird);

        restUserAuthorizedThirdMockMvc.perform(put("/api/user-authorized-thirds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAuthorizedThirdDTO)))
            .andExpect(status().isOk());

        // Validate the UserAuthorizedThird in the database
        List<UserAuthorizedThird> userAuthorizedThirdList = userAuthorizedThirdRepository.findAll();
        assertThat(userAuthorizedThirdList).hasSize(databaseSizeBeforeUpdate);
        UserAuthorizedThird testUserAuthorizedThird = userAuthorizedThirdList.get(userAuthorizedThirdList.size() - 1);
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
