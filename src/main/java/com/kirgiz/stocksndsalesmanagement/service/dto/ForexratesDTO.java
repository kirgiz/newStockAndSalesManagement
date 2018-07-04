package com.kirgiz.stocksndsalesmanagement.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Forexrates entity.
 */
public class ForexratesDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate rateDate;

    @NotNull
    private Double straighRate;

    private Long rateForCurrencyId;

    private String rateForCurrencyIsoCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRateDate() {
        return rateDate;
    }

    public void setRateDate(LocalDate rateDate) {
        this.rateDate = rateDate;
    }

    public Double getStraighRate() {
        return straighRate;
    }

    public void setStraighRate(Double straighRate) {
        this.straighRate = straighRate;
    }

    public Long getRateForCurrencyId() {
        return rateForCurrencyId;
    }

    public void setRateForCurrencyId(Long currencyId) {
        this.rateForCurrencyId = currencyId;
    }

    public String getRateForCurrencyIsoCode() {
        return rateForCurrencyIsoCode;
    }

    public void setRateForCurrencyIsoCode(String currencyIsoCode) {
        this.rateForCurrencyIsoCode = currencyIsoCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ForexratesDTO forexratesDTO = (ForexratesDTO) o;
        if(forexratesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), forexratesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ForexratesDTO{" +
            "id=" + getId() +
            ", rateDate='" + getRateDate() + "'" +
            ", straighRate=" + getStraighRate() +
            "}";
    }
}
