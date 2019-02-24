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
 * Criteria class for the Lot entity. This class is used in LotResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /lots?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class LotCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter code;

    private StringFilter description;

    private LocalDateFilter creationDate;

    private LongFilter numberOfItems;

    private StringFilter comments;

    private DoubleFilter unitBuyPrice;

    private BooleanFilter itemsGenerated;

    private LongFilter materialLotId;

    private LongFilter buycurrencylotId;

    private LongFilter materialclassificationId;

    public LotCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getCode() {
        return code;
    }

    public void setCode(StringFilter code) {
        this.code = code;
    }

    public StringFilter getDescription() {
        return description;
    }

    public void setDescription(StringFilter description) {
        this.description = description;
    }

    public LocalDateFilter getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateFilter creationDate) {
        this.creationDate = creationDate;
    }

    public LongFilter getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(LongFilter numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public StringFilter getComments() {
        return comments;
    }

    public void setComments(StringFilter comments) {
        this.comments = comments;
    }

    public DoubleFilter getUnitBuyPrice() {
        return unitBuyPrice;
    }

    public void setUnitBuyPrice(DoubleFilter unitBuyPrice) {
        this.unitBuyPrice = unitBuyPrice;
    }

    public BooleanFilter getItemsGenerated() {
        return itemsGenerated;
    }

    public void setItemsGenerated(BooleanFilter itemsGenerated) {
        this.itemsGenerated = itemsGenerated;
    }

    public LongFilter getMaterialLotId() {
        return materialLotId;
    }

    public void setMaterialLotId(LongFilter materialLotId) {
        this.materialLotId = materialLotId;
    }

    public LongFilter getBuycurrencylotId() {
        return buycurrencylotId;
    }

    public void setBuycurrencylotId(LongFilter buycurrencylotId) {
        this.buycurrencylotId = buycurrencylotId;
    }

    public LongFilter getMaterialclassificationId() {
        return materialclassificationId;
    }

    public void setMaterialclassificationId(LongFilter materialclassificationId) {
        this.materialclassificationId = materialclassificationId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final LotCriteria that = (LotCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(code, that.code) &&
            Objects.equals(description, that.description) &&
            Objects.equals(creationDate, that.creationDate) &&
            Objects.equals(numberOfItems, that.numberOfItems) &&
            Objects.equals(comments, that.comments) &&
            Objects.equals(unitBuyPrice, that.unitBuyPrice) &&
            Objects.equals(itemsGenerated, that.itemsGenerated) &&
            Objects.equals(materialLotId, that.materialLotId) &&
            Objects.equals(buycurrencylotId, that.buycurrencylotId) &&
            Objects.equals(materialclassificationId, that.materialclassificationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        code,
        description,
        creationDate,
        numberOfItems,
        comments,
        unitBuyPrice,
        itemsGenerated,
        materialLotId,
        buycurrencylotId,
        materialclassificationId
        );
    }

    @Override
    public String toString() {
        return "LotCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (code != null ? "code=" + code + ", " : "") +
                (description != null ? "description=" + description + ", " : "") +
                (creationDate != null ? "creationDate=" + creationDate + ", " : "") +
                (numberOfItems != null ? "numberOfItems=" + numberOfItems + ", " : "") +
                (comments != null ? "comments=" + comments + ", " : "") +
                (unitBuyPrice != null ? "unitBuyPrice=" + unitBuyPrice + ", " : "") +
                (itemsGenerated != null ? "itemsGenerated=" + itemsGenerated + ", " : "") +
                (materialLotId != null ? "materialLotId=" + materialLotId + ", " : "") +
                (buycurrencylotId != null ? "buycurrencylotId=" + buycurrencylotId + ", " : "") +
                (materialclassificationId != null ? "materialclassificationId=" + materialclassificationId + ", " : "") +
            "}";
    }

}
