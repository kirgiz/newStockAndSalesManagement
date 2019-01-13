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

/**
 * Criteria class for the Currency entity. This class is used in CurrencyResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /currencies?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CurrencyCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter isoCode;

    private StringFilter name;

    private LongFilter companyBaseCurrencyId;

    private LongFilter currencyRateId;

    private LongFilter currencyDashboardId;

    private LongFilter lotBuyCurrencyId;

    public CurrencyCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(StringFilter isoCode) {
        this.isoCode = isoCode;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public LongFilter getCompanyBaseCurrencyId() {
        return companyBaseCurrencyId;
    }

    public void setCompanyBaseCurrencyId(LongFilter companyBaseCurrencyId) {
        this.companyBaseCurrencyId = companyBaseCurrencyId;
    }

    public LongFilter getCurrencyRateId() {
        return currencyRateId;
    }

    public void setCurrencyRateId(LongFilter currencyRateId) {
        this.currencyRateId = currencyRateId;
    }

    public LongFilter getCurrencyDashboardId() {
        return currencyDashboardId;
    }

    public void setCurrencyDashboardId(LongFilter currencyDashboardId) {
        this.currencyDashboardId = currencyDashboardId;
    }

    public LongFilter getLotBuyCurrencyId() {
        return lotBuyCurrencyId;
    }

    public void setLotBuyCurrencyId(LongFilter lotBuyCurrencyId) {
        this.lotBuyCurrencyId = lotBuyCurrencyId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CurrencyCriteria that = (CurrencyCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(isoCode, that.isoCode) &&
            Objects.equals(name, that.name) &&
            Objects.equals(companyBaseCurrencyId, that.companyBaseCurrencyId) &&
            Objects.equals(currencyRateId, that.currencyRateId) &&
            Objects.equals(currencyDashboardId, that.currencyDashboardId) &&
            Objects.equals(lotBuyCurrencyId, that.lotBuyCurrencyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        isoCode,
        name,
        companyBaseCurrencyId,
        currencyRateId,
        currencyDashboardId,
        lotBuyCurrencyId
        );
    }

    @Override
    public String toString() {
        return "CurrencyCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (isoCode != null ? "isoCode=" + isoCode + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (companyBaseCurrencyId != null ? "companyBaseCurrencyId=" + companyBaseCurrencyId + ", " : "") +
                (currencyRateId != null ? "currencyRateId=" + currencyRateId + ", " : "") +
                (currencyDashboardId != null ? "currencyDashboardId=" + currencyDashboardId + ", " : "") +
                (lotBuyCurrencyId != null ? "lotBuyCurrencyId=" + lotBuyCurrencyId + ", " : "") +
            "}";
    }

}
