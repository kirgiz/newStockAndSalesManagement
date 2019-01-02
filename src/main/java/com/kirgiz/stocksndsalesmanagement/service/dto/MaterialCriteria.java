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
 * Criteria class for the Material entity. This class is used in MaterialResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /materials?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MaterialCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter code;

    private StringFilter description;

    private LocalDateFilter creationDate;

    private StringFilter comments;

    private IntegerFilter currentLocation;

    private LongFilter materialTypeDefId;

    private LongFilter lotIdentifierId;

    private LongFilter materialTypeCatId;

    public MaterialCriteria() {
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

    public StringFilter getComments() {
        return comments;
    }

    public void setComments(StringFilter comments) {
        this.comments = comments;
    }

    public IntegerFilter getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(IntegerFilter currentLocation) {
        this.currentLocation = currentLocation;
    }

    public LongFilter getMaterialTypeDefId() {
        return materialTypeDefId;
    }

    public void setMaterialTypeDefId(LongFilter materialTypeDefId) {
        this.materialTypeDefId = materialTypeDefId;
    }

    public LongFilter getLotIdentifierId() {
        return lotIdentifierId;
    }

    public void setLotIdentifierId(LongFilter lotIdentifierId) {
        this.lotIdentifierId = lotIdentifierId;
    }

    public LongFilter getMaterialTypeCatId() {
        return materialTypeCatId;
    }

    public void setMaterialTypeCatId(LongFilter materialTypeCatId) {
        this.materialTypeCatId = materialTypeCatId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final MaterialCriteria that = (MaterialCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(code, that.code) &&
            Objects.equals(description, that.description) &&
            Objects.equals(creationDate, that.creationDate) &&
            Objects.equals(comments, that.comments) &&
            Objects.equals(currentLocation, that.currentLocation) &&
            Objects.equals(materialTypeDefId, that.materialTypeDefId) &&
            Objects.equals(lotIdentifierId, that.lotIdentifierId) &&
            Objects.equals(materialTypeCatId, that.materialTypeCatId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        code,
        description,
        creationDate,
        comments,
        currentLocation,
        materialTypeDefId,
        lotIdentifierId,
        materialTypeCatId
        );
    }

    @Override
    public String toString() {
        return "MaterialCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (code != null ? "code=" + code + ", " : "") +
                (description != null ? "description=" + description + ", " : "") +
                (creationDate != null ? "creationDate=" + creationDate + ", " : "") +
                (comments != null ? "comments=" + comments + ", " : "") +
                (currentLocation != null ? "currentLocation=" + currentLocation + ", " : "") +
                (materialTypeDefId != null ? "materialTypeDefId=" + materialTypeDefId + ", " : "") +
                (lotIdentifierId != null ? "lotIdentifierId=" + lotIdentifierId + ", " : "") +
                (materialTypeCatId != null ? "materialTypeCatId=" + materialTypeCatId + ", " : "") +
            "}";
    }

}
