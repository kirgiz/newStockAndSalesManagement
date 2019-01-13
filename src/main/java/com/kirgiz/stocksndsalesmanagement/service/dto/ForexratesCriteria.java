package com.kirgiz.stocksndsalesmanagement.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the Forexrates entity. This class is used in ForexratesResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /forexrates?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ForexratesCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter rateDate;

    private DoubleFilter straighRate;

    private LongFilter rateForCurrencyId;

    public ForexratesCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getRateDate() {
        return rateDate;
    }

    public void setRateDate(LocalDateFilter rateDate) {
        this.rateDate = rateDate;
    }

    public DoubleFilter getStraighRate() {
        return straighRate;
    }

    public void setStraighRate(DoubleFilter straighRate) {
        this.straighRate = straighRate;
    }

    public LongFilter getRateForCurrencyId() {
        return rateForCurrencyId;
    }

    public void setRateForCurrencyId(LongFilter rateForCurrencyId) {
        this.rateForCurrencyId = rateForCurrencyId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ForexratesCriteria that = (ForexratesCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(rateDate, that.rateDate) &&
            Objects.equals(straighRate, that.straighRate) &&
            Objects.equals(rateForCurrencyId, that.rateForCurrencyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        rateDate,
        straighRate,
        rateForCurrencyId
        );
    }

    @Override
    public String toString() {
        return "ForexratesCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (rateDate != null ? "rateDate=" + rateDate + ", " : "") +
                (straighRate != null ? "straighRate=" + straighRate + ", " : "") +
                (rateForCurrencyId != null ? "rateForCurrencyId=" + rateForCurrencyId + ", " : "") +
            "}";
    }

}
