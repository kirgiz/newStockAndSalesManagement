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
 * Criteria class for the Materialclassification entity. This class is used in MaterialclassificationResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /materialclassifications?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MaterialclassificationCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter code;

    private StringFilter name;

    private StringFilter comments;

    private LongFilter materialCategoryId;

    private LongFilter materialCatId;

    private LongFilter materialCategoryDashboardId;

    public MaterialclassificationCriteria() {
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

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getComments() {
        return comments;
    }

    public void setComments(StringFilter comments) {
        this.comments = comments;
    }

    public LongFilter getMaterialCategoryId() {
        return materialCategoryId;
    }

    public void setMaterialCategoryId(LongFilter materialCategoryId) {
        this.materialCategoryId = materialCategoryId;
    }

    public LongFilter getMaterialCatId() {
        return materialCatId;
    }

    public void setMaterialCatId(LongFilter materialCatId) {
        this.materialCatId = materialCatId;
    }

    public LongFilter getMaterialCategoryDashboardId() {
        return materialCategoryDashboardId;
    }

    public void setMaterialCategoryDashboardId(LongFilter materialCategoryDashboardId) {
        this.materialCategoryDashboardId = materialCategoryDashboardId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final MaterialclassificationCriteria that = (MaterialclassificationCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(code, that.code) &&
            Objects.equals(name, that.name) &&
            Objects.equals(comments, that.comments) &&
            Objects.equals(materialCategoryId, that.materialCategoryId) &&
            Objects.equals(materialCatId, that.materialCatId) &&
            Objects.equals(materialCategoryDashboardId, that.materialCategoryDashboardId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        code,
        name,
        comments,
        materialCategoryId,
        materialCatId,
        materialCategoryDashboardId
        );
    }

    @Override
    public String toString() {
        return "MaterialclassificationCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (code != null ? "code=" + code + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (comments != null ? "comments=" + comments + ", " : "") +
                (materialCategoryId != null ? "materialCategoryId=" + materialCategoryId + ", " : "") +
                (materialCatId != null ? "materialCatId=" + materialCatId + ", " : "") +
                (materialCategoryDashboardId != null ? "materialCategoryDashboardId=" + materialCategoryDashboardId + ", " : "") +
            "}";
    }

}
