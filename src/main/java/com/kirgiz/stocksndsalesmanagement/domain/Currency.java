package com.kirgiz.stocksndsalesmanagement.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Currency.
 */
@Entity
@Table(name = "currency")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Currency implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 3)
    @Column(name = "iso_code", length = 3, nullable = false)
    private String isoCode;

    @NotNull
    @Size(max = 60)
    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @OneToMany(mappedBy = "baseCurrency")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Company> companyBaseCurrencies = new HashSet<>();
    @OneToMany(mappedBy = "rateForCurrency")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Forexrates> currencyRates = new HashSet<>();
    @OneToMany(mappedBy = "currencyForDashboard")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Dashboard> currencyDashboards = new HashSet<>();
    @OneToMany(mappedBy = "buycurrencylot")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lot> lotBuyCurrencies = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public Currency isoCode(String isoCode) {
        this.isoCode = isoCode;
        return this;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getName() {
        return name;
    }

    public Currency name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Company> getCompanyBaseCurrencies() {
        return companyBaseCurrencies;
    }

    public Currency companyBaseCurrencies(Set<Company> companies) {
        this.companyBaseCurrencies = companies;
        return this;
    }

    public Currency addCompanyBaseCurrency(Company company) {
        this.companyBaseCurrencies.add(company);
        company.setBaseCurrency(this);
        return this;
    }

    public Currency removeCompanyBaseCurrency(Company company) {
        this.companyBaseCurrencies.remove(company);
        company.setBaseCurrency(null);
        return this;
    }

    public void setCompanyBaseCurrencies(Set<Company> companies) {
        this.companyBaseCurrencies = companies;
    }

    public Set<Forexrates> getCurrencyRates() {
        return currencyRates;
    }

    public Currency currencyRates(Set<Forexrates> forexrates) {
        this.currencyRates = forexrates;
        return this;
    }

    public Currency addCurrencyRate(Forexrates forexrates) {
        this.currencyRates.add(forexrates);
        forexrates.setRateForCurrency(this);
        return this;
    }

    public Currency removeCurrencyRate(Forexrates forexrates) {
        this.currencyRates.remove(forexrates);
        forexrates.setRateForCurrency(null);
        return this;
    }

    public void setCurrencyRates(Set<Forexrates> forexrates) {
        this.currencyRates = forexrates;
    }

    public Set<Dashboard> getCurrencyDashboards() {
        return currencyDashboards;
    }

    public Currency currencyDashboards(Set<Dashboard> dashboards) {
        this.currencyDashboards = dashboards;
        return this;
    }

    public Currency addCurrencyDashboard(Dashboard dashboard) {
        this.currencyDashboards.add(dashboard);
        dashboard.setCurrencyForDashboard(this);
        return this;
    }

    public Currency removeCurrencyDashboard(Dashboard dashboard) {
        this.currencyDashboards.remove(dashboard);
        dashboard.setCurrencyForDashboard(null);
        return this;
    }

    public void setCurrencyDashboards(Set<Dashboard> dashboards) {
        this.currencyDashboards = dashboards;
    }

    public Set<Lot> getLotBuyCurrencies() {
        return lotBuyCurrencies;
    }

    public Currency lotBuyCurrencies(Set<Lot> lots) {
        this.lotBuyCurrencies = lots;
        return this;
    }

    public Currency addLotBuyCurrency(Lot lot) {
        this.lotBuyCurrencies.add(lot);
        lot.setBuycurrencylot(this);
        return this;
    }

    public Currency removeLotBuyCurrency(Lot lot) {
        this.lotBuyCurrencies.remove(lot);
        lot.setBuycurrencylot(null);
        return this;
    }

    public void setLotBuyCurrencies(Set<Lot> lots) {
        this.lotBuyCurrencies = lots;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Currency currency = (Currency) o;
        if (currency.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currency.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Currency{" +
            "id=" + getId() +
            ", isoCode='" + getIsoCode() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
