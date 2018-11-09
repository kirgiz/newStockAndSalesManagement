package com.kirgiz.stocksndsalesmanagement.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "code", length = 20, nullable = false)
    private String code;

    @NotNull
    @Size(max = 200)
    @Column(name = "description", length = 200, nullable = false)
    private String description;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @Size(max = 500)
    @Column(name = "comments", length = 500)
    private String comments;

    @Column(name = "current_location")
    private Integer currentLocation;

    @ManyToOne(optional = false)
    @NotNull
    private Materialclassification materialTypeDef;

    @ManyToOne(optional = false)
    @NotNull
    private Lot lotIdentifier;

    @ManyToOne(optional = false)
    @NotNull
    private Materialclassification materialTypeCat;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Material code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Material description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Material creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getComments() {
        return comments;
    }

    public Material comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Integer getCurrentLocation() {
        return currentLocation;
    }

    public Material currentLocation(Integer currentLocation) {
        this.currentLocation = currentLocation;
        return this;
    }

    public void setCurrentLocation(Integer currentLocation) {
        this.currentLocation = currentLocation;
    }

    public Materialclassification getMaterialTypeDef() {
        return materialTypeDef;
    }

    public Material materialTypeDef(Materialclassification materialclassification) {
        this.materialTypeDef = materialclassification;
        return this;
    }

    public void setMaterialTypeDef(Materialclassification materialclassification) {
        this.materialTypeDef = materialclassification;
    }

    public Lot getLotIdentifier() {
        return lotIdentifier;
    }

    public Material lotIdentifier(Lot lot) {
        this.lotIdentifier = lot;
        return this;
    }

    public void setLotIdentifier(Lot lot) {
        this.lotIdentifier = lot;
    }

    public Materialclassification getMaterialTypeCat() {
        return materialTypeCat;
    }

    public Material materialTypeCat(Materialclassification materialclassification) {
        this.materialTypeCat = materialclassification;
        return this;
    }

    public void setMaterialTypeCat(Materialclassification materialclassification) {
        this.materialTypeCat = materialclassification;
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
        Material material = (Material) o;
        if (material.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), material.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", comments='" + getComments() + "'" +
            ", currentLocation=" + getCurrentLocation() +
            "}";
    }
}
