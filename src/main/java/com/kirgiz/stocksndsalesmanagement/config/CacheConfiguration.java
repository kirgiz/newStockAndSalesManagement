package com.kirgiz.stocksndsalesmanagement.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.kirgiz.stocksndsalesmanagement.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Country.class.getName() + ".addressCountries", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Currency.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Currency.class.getName() + ".companyBaseCurrencies", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Currency.class.getName() + ".currencyRates", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Currency.class.getName() + ".currencyDashboards", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Currency.class.getName() + ".lotBuyCurrencies", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Forexrates.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Thirdclassification.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Thirdclassification.class.getName() + ".thirdCategories", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Third.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Third.class.getName() + ".materialhistoryfroms", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Third.class.getName() + ".materialhistorytos", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Third.class.getName() + ".warehouseOuts", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Third.class.getName() + ".addressthirds", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Addressclassification.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Addressclassification.class.getName() + ".addressCategories", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Address.class.getName() + ".thirdaddresses", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Civility.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Civility.class.getName() + ".thirdCivilities", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Transferclassification.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Transferclassification.class.getName() + ".materialhistoryCategories", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Transferclassification.class.getName() + ".transferDashboards", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialclassification.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialclassification.class.getName() + ".materialCategories", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialclassification.class.getName() + ".materialCats", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialclassification.class.getName() + ".materialCategoryDashboards", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Lot.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Lot.class.getName() + ".materialLots", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Material.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialhistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Materialhistory.class.getName() + ".itemTransfereds", jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.Dashboard.class.getName(), jcacheConfiguration);
            cm.createCache(com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
