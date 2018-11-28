package com.kirgiz.stocksndsalesmanagement.web.rest;

import com.kirgiz.stocksndsalesmanagement.StockAndSalesManagementApp;

import com.kirgiz.stocksndsalesmanagement.domain.Materialhistory;
import com.kirgiz.stocksndsalesmanagement.domain.Transferclassification;
import com.kirgiz.stocksndsalesmanagement.domain.Third;
import com.kirgiz.stocksndsalesmanagement.domain.Third;
import com.kirgiz.stocksndsalesmanagement.domain.Materialclassification;
import com.kirgiz.stocksndsalesmanagement.repository.MaterialhistoryRepository;
import com.kirgiz.stocksndsalesmanagement.service.MaterialhistoryService;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialhistoryDTO;
import com.kirgiz.stocksndsalesmanagement.service.mapper.MaterialhistoryMapper;
import com.kirgiz.stocksndsalesmanagement.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static com.kirgiz.stocksndsalesmanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaterialhistoryResource REST controller.
 *
 * @see MaterialhistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockAndSalesManagementApp.class)
public class MaterialhistoryResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";
    private static final Integer DEFAULT_USER_MOD = 1;
    private static final Integer UPDATED_USER_MOD = 2;


    @Autowired
    private MaterialhistoryRepository materialhistoryRepository;

    @Mock
    private MaterialhistoryRepository materialhistoryRepositoryMock;

    @Autowired
    private MaterialhistoryMapper materialhistoryMapper;

    @Mock
    private MaterialhistoryService materialhistoryServiceMock;

    @Autowired
    private MaterialhistoryService materialhistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaterialhistoryMockMvc;

    private Materialhistory materialhistory;

    // @Before
    // public void setup() {
    //     MockitoAnnotations.initMocks(this);
    //     final MaterialhistoryResource materialhistoryResource = new MaterialhistoryResource(materialhistoryService);
    //     this.restMaterialhistoryMockMvc = MockMvcBuilders.standaloneSetup(materialhistoryResource)
    //         .setCustomArgumentResolvers(pageableArgumentResolver)
    //         .setControllerAdvice(exceptionTranslator)
    //         .setConversionService(createFormattingConversionService())
    //         .setMessageConverters(jacksonMessageConverter).build();
    // }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    // public static Materialhistory createEntity(EntityManager em) {
    //     Materialhistory materialhistory = new Materialhistory()
    //         .code(DEFAULT_CODE)
    //         .creationDate(DEFAULT_CREATION_DATE)
    //         .price(DEFAULT_PRICE)
    //         .comments(DEFAULT_COMMENTS);
        // Add required entity
        // Transferclassification transferClassif = TransferclassificationResourceIntTest.createEntity(em);
        // em.persist(transferClassif);
        // em.flush();
        // materialhistory.setTransferClassif(transferClassif);
        // Add required entity
        // Third warehousefrom = ThirdResourceIntTest.createEntity(em);
        // em.persist(warehousefrom);
        // em.flush();
        // materialhistory.setWarehousefrom(warehousefrom);
  //  public static Materialhistory createEntity(EntityManager em) {
    //    Materialhistory materialhistory = new Materialhistory()
      //      .code(DEFAULT_CODE)
        //    .creationDate(DEFAULT_CREATION_DATE)
          //  .price(DEFAULT_PRICE)
            //.comments(DEFAULT_COMMENTS);
        // Add required entity
       // Transferclassification transferclassification = TransferclassificationResourceIntTest.createEntity(em);
        //em.persist(transferclassification);
       // em.flush();
        //materialhistory.setTransferClassif(transferclassification);
        // Add required entity
       // Third third = ThirdResourceIntTest.createEntity(em);
       // em.persist(third);
       // em.flush();
       // materialhistory.setWarehousefrom(third);
        // Add required entity
       // materialhistory.setWarehouseto(third);
        // Add required entity
    //     Third warehouseto = ThirdResourceIntTest.createEntity(em);
    //     em.persist(warehouseto);
    //     em.flush();
    //     materialhistory.setWarehouseto(warehouseto);
    //     // Add required entity
    //     // Materialclassification materialclassification = MaterialclassificationResourceIntTest.createEntity(em);
    //     em.persist(materialclassification);
    //     em.flush();
    //     materialhistory.setMaterialclassification(materialclassification);
    //     return materialhistory;
    // }

    // @Before
    // public void initTest() {
    //     materialhistory = createEntity(em);
    // }

    // @Test
    // @Transactional
    // public void createMaterialhistory() throws Exception {
    //     int databaseSizeBeforeCreate = materialhistoryRepository.findAll().size();

    //     // Create the Materialhistory
    //     MaterialhistoryDTO materialhistoryDTO = materialhistoryMapper.toDto(materialhistory);
    //     restMaterialhistoryMockMvc.perform(post("/api/materialhistories")
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
    //         .andExpect(status().isCreated());

    //     // Validate the Materialhistory in the database
    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeCreate + 1);
    //     Materialhistory testMaterialhistory = materialhistoryList.get(materialhistoryList.size() - 1);
    //     assertThat(testMaterialhistory.getCode()).isEqualTo(DEFAULT_CODE);
    //     assertThat(testMaterialhistory.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    //     assertThat(testMaterialhistory.getPrice()).isEqualTo(DEFAULT_PRICE);
    //     assertThat(testMaterialhistory.getComments()).isEqualTo(DEFAULT_COMMENTS);
    // }

    // @Test
    // @Transactional
    // public void createMaterialhistoryWithExistingId() throws Exception {
    //     int databaseSizeBeforeCreate = materialhistoryRepository.findAll().size();

        // Create the Materialhistory with an existing ID
        // materialhistory.setId(1L);
        // MaterialhistoryDTO materialhistoryDTO = materialhistoryMapper.toDto(materialhistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        // restMaterialhistoryMockMvc.perform(post("/api/materialhistories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
        //     .andExpect(status().isBadRequest());

        // Validate the Materialhistory in the database
    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeCreate);
    // }

    // @Test
    // @Transactional
    // public void checkCreationDateIsRequired() throws Exception {
    //     int databaseSizeBeforeTest = materialhistoryRepository.findAll().size();
        // set the field null
        // materialhistory.setCreationDate(null);

        // Create the Materialhistory, which fails.
    //     MaterialhistoryDTO materialhistoryDTO = materialhistoryMapper.toDto(materialhistory);

    //     restMaterialhistoryMockMvc.perform(post("/api/materialhistories")
    //         .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //         .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
    //         .andExpect(status().isBadRequest());

    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeTest);
    // }

   // @Test
    // @Transactional
    // public void getAllMaterialhistories() throws Exception {
        // Initialize the database
        // materialhistoryRepository.saveAndFlush(materialhistory);

        // Get all the materialhistoryList
    //     restMaterialhistoryMockMvc.perform(get("/api/materialhistories?sort=id,desc"))
    //         .andExpect(status().isOk())
    //         .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
    //         .andExpect(jsonPath("$.[*].id").value(hasItem(materialhistory.getId().intValue())))
    //         .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
    //         .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
    //         .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
    //         .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())));
    // }

    // @Test
    // @Transactional
    // public void getMaterialhistory() throws Exception {
   //     restMaterialhistoryMockMvc.perform(get("/api/materialhistories?sort=id,desc"))
     //       .andExpect(status().isOk())
      //      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
       //     .andExpect(jsonPath("$.[*].id").value(hasItem(materialhistory.getId().intValue())))
        //    .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
         //   .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
         //   .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
         //   .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())));
   // }
    
   // @SuppressWarnings({"unchecked"})
   // public void getAllMaterialhistoriesWithEagerRelationshipsIsEnabled() throws Exception {
    //    MaterialhistoryResource materialhistoryResource = new MaterialhistoryResource(materialhistoryServiceMock);
     //   when(materialhistoryServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

    //    MockMvc restMaterialhistoryMockMvc = MockMvcBuilders.standaloneSetup(materialhistoryResource)
     //       .setCustomArgumentResolvers(pageableArgumentResolver)
     //       .setControllerAdvice(exceptionTranslator)
     //       .setConversionService(createFormattingConversionService())
     //       .setMessageConverters(jacksonMessageConverter).build();

    //    restMaterialhistoryMockMvc.perform(get("/api/materialhistories?eagerload=true"))
    //    .andExpect(status().isOk());

   //     verify(materialhistoryServiceMock, times(1)).findAllWithEagerRelationships(any());
  //  }

  //  @SuppressWarnings({"unchecked"})
  //  public void getAllMaterialhistoriesWithEagerRelationshipsIsNotEnabled() throws Exception {
  //      MaterialhistoryResource materialhistoryResource = new MaterialhistoryResource(materialhistoryServiceMock);
  //          when(materialhistoryServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
  //          MockMvc restMaterialhistoryMockMvc = MockMvcBuilders.standaloneSetup(materialhistoryResource)
  //          .setCustomArgumentResolvers(pageableArgumentResolver)
  //          .setControllerAdvice(exceptionTranslator)
  //          .setConversionService(createFormattingConversionService())
  //          .setMessageConverters(jacksonMessageConverter).build();

  //      restMaterialhistoryMockMvc.perform(get("/api/materialhistories?eagerload=true"))
  //      .andExpect(status().isOk());

  //          verify(materialhistoryServiceMock, times(1)).findAllWithEagerRelationships(any());
  //  }

  //  @Test
  //  @Transactional
  //  public void getMaterialhistory() throws Exception {
        // Initialize the database
      //  materialhistoryRepository.saveAndFlush(materialhistory);

        // Get the materialhistory
    //     restMaterialhistoryMockMvc.perform(get("/api/materialhistories/{id}", materialhistory.getId()))
    //         .andExpect(status().isOk())
    //         .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
    //         .andExpect(jsonPath("$.id").value(materialhistory.getId().intValue()))
    //         .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
    //         .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
    //         .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
    //         .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS.toString()));
    // }

    // @Test
    // @Transactional
    // public void getNonExistingMaterialhistory() throws Exception {
        // Get the materialhistory
    //     restMaterialhistoryMockMvc.perform(get("/api/materialhistories/{id}", Long.MAX_VALUE))
    //         .andExpect(status().isNotFound());
    // }

    // @Test
    // @Transactional
    // public void updateMaterialhistory() throws Exception {
        // Initialize the database
      //  materialhistoryRepository.saveAndFlush(materialhistory);
       // int databaseSizeBeforeUpdate = materialhistoryRepository.findAll().size();

        // Update the materialhistory
       // Materialhistory updatedMaterialhistory = materialhistoryRepository.findOne(materialhistory.getId());
   //     materialhistoryRepository.saveAndFlush(materialhistory);

     //   int databaseSizeBeforeUpdate = materialhistoryRepository.findAll().size();

        // Update the materialhistory
     //   Materialhistory updatedMaterialhistory = materialhistoryRepository.findById(materialhistory.getId()).get();
        // Disconnect from session so that the updates on updatedMaterialhistory are not directly saved in db
        // em.detach(updatedMaterialhistory);
        // updatedMaterialhistory
        //     .code(UPDATED_CODE)
        //     .creationDate(UPDATED_CREATION_DATE)
        //     .price(UPDATED_PRICE)
        //     .comments(UPDATED_COMMENTS);
        // MaterialhistoryDTO materialhistoryDTO = materialhistoryMapper.toDto(updatedMaterialhistory);

        // restMaterialhistoryMockMvc.perform(put("/api/materialhistories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
        //     .andExpect(status().isOk());

        // Validate the Materialhistory in the database
    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeUpdate);
    //     Materialhistory testMaterialhistory = materialhistoryList.get(materialhistoryList.size() - 1);
    //     assertThat(testMaterialhistory.getCode()).isEqualTo(UPDATED_CODE);
    //     assertThat(testMaterialhistory.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    //     assertThat(testMaterialhistory.getPrice()).isEqualTo(UPDATED_PRICE);
    //     assertThat(testMaterialhistory.getComments()).isEqualTo(UPDATED_COMMENTS);
    // }

    // @Test
    // @Transactional
    // public void updateNonExistingMaterialhistory() throws Exception {
    //     int databaseSizeBeforeUpdate = materialhistoryRepository.findAll().size();

        // Create the Materialhistory
    //    MaterialhistoryDTO materialhistoryDTO = materialhistoryMapper.toDto(materialhistory);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        // restMaterialhistoryMockMvc.perform(put("/api/materialhistories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
        //     .andExpect(status().isCreated());

        // Validate the Materialhistory in the database
    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    // }
        // If the entity doesn't have an ID, it will throw BadRequestAlertException
    //    restMaterialhistoryMockMvc.perform(put("/api/materialhistories")
    //        .contentType(TestUtil.APPLICATION_JSON_UTF8)
    //        .content(TestUtil.convertObjectToJsonBytes(materialhistoryDTO)))
    //        .andExpect(status().isBadRequest());

        // Validate the Materialhistory in the database
    //    List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //    assertThat(materialhistoryList).hasSize(databaseSizeBeforeUpdate);
  //  }

    // @Test
    // @Transactional
    // public void deleteMaterialhistory() throws Exception {
        // Initialize the database
        // materialhistoryRepository.saveAndFlush(materialhistory);
        // int databaseSizeBeforeDelete = materialhistoryRepository.findAll().size();
      //  materialhistoryRepository.saveAndFlush(materialhistory);

      //  int databaseSizeBeforeDelete = materialhistoryRepository.findAll().size();

        // Get the materialhistory
        // restMaterialhistoryMockMvc.perform(delete("/api/materialhistories/{id}", materialhistory.getId())
        //     .accept(TestUtil.APPLICATION_JSON_UTF8))
        //     .andExpect(status().isOk());

        // Validate the database is empty
    //     List<Materialhistory> materialhistoryList = materialhistoryRepository.findAll();
    //     assertThat(materialhistoryList).hasSize(databaseSizeBeforeDelete - 1);
    // }

    // @Test
    // @Transactional
    // public void equalsVerifier() throws Exception {
    //     TestUtil.equalsVerifier(Materialhistory.class);
    //     Materialhistory materialhistory1 = new Materialhistory();
    //     materialhistory1.setId(1L);
    //     Materialhistory materialhistory2 = new Materialhistory();
    //     materialhistory2.setId(materialhistory1.getId());
    //     assertThat(materialhistory1).isEqualTo(materialhistory2);
    //     materialhistory2.setId(2L);
    //     assertThat(materialhistory1).isNotEqualTo(materialhistory2);
    //     materialhistory1.setId(null);
    //     assertThat(materialhistory1).isNotEqualTo(materialhistory2);
    // }

    // @Test
    // @Transactional
    // public void dtoEqualsVerifier() throws Exception {
    //     TestUtil.equalsVerifier(MaterialhistoryDTO.class);
    //     MaterialhistoryDTO materialhistoryDTO1 = new MaterialhistoryDTO();
    //     materialhistoryDTO1.setId(1L);
    //     MaterialhistoryDTO materialhistoryDTO2 = new MaterialhistoryDTO();
    //     assertThat(materialhistoryDTO1).isNotEqualTo(materialhistoryDTO2);
    //     materialhistoryDTO2.setId(materialhistoryDTO1.getId());
    //     assertThat(materialhistoryDTO1).isEqualTo(materialhistoryDTO2);
    //     materialhistoryDTO2.setId(2L);
    //     assertThat(materialhistoryDTO1).isNotEqualTo(materialhistoryDTO2);
    //     materialhistoryDTO1.setId(null);
    //     assertThat(materialhistoryDTO1).isNotEqualTo(materialhistoryDTO2);
    // }

    // @Test
    // @Transactional
    // public void testEntityFromId() {
    //     assertThat(materialhistoryMapper.fromId(42L).getId()).isEqualTo(42);
    //     assertThat(materialhistoryMapper.fromId(null)).isNull();
    // }
}
