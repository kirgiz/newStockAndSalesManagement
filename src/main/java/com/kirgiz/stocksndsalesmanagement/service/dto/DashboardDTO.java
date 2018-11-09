package com.kirgiz.stocksndsalesmanagement.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Dashboard entity.
 */
public class DashboardDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate transferDate;

    private Double profitAndLoss;

    private Long numberOfItems;

    private Long currencyForDashboardId;

    private String currencyForDashboardName;

    private Long transferForDashboardId;

    private String transferForDashboardName;

    private Long warehouseOutgId;

    private String warehouseOutgName;

    private Long materialTypeDefDashboardId;

    private String materialTypeDefDashboardCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDate transferDate) {
        this.transferDate = transferDate;
    }

    public Double getProfitAndLoss() {
        return profitAndLoss;
    }

    public void setProfitAndLoss(Double profitAndLoss) {
        this.profitAndLoss = profitAndLoss;
    }

    public Long getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(Long numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public Long getCurrencyForDashboardId() {
        return currencyForDashboardId;
    }

    public void setCurrencyForDashboardId(Long currencyId) {
        this.currencyForDashboardId = currencyId;
    }

    public String getCurrencyForDashboardName() {
        return currencyForDashboardName;
    }

    public void setCurrencyForDashboardName(String currencyName) {
        this.currencyForDashboardName = currencyName;
    }

    public Long getTransferForDashboardId() {
        return transferForDashboardId;
    }

    public void setTransferForDashboardId(Long transferclassificationId) {
        this.transferForDashboardId = transferclassificationId;
    }

    public String getTransferForDashboardName() {
        return transferForDashboardName;
    }

    public void setTransferForDashboardName(String transferclassificationName) {
        this.transferForDashboardName = transferclassificationName;
    }

    public Long getWarehouseOutgId() {
        return warehouseOutgId;
    }

    public void setWarehouseOutgId(Long thirdId) {
        this.warehouseOutgId = thirdId;
    }

    public String getWarehouseOutgName() {
        return warehouseOutgName;
    }

    public void setWarehouseOutgName(String thirdName) {
        this.warehouseOutgName = thirdName;
    }

    public Long getMaterialTypeDefDashboardId() {
        return materialTypeDefDashboardId;
    }

    public void setMaterialTypeDefDashboardId(Long materialclassificationId) {
        this.materialTypeDefDashboardId = materialclassificationId;
    }

    public String getMaterialTypeDefDashboardCode() {
        return materialTypeDefDashboardCode;
    }

    public void setMaterialTypeDefDashboardCode(String materialclassificationCode) {
        this.materialTypeDefDashboardCode = materialclassificationCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DashboardDTO dashboardDTO = (DashboardDTO) o;
        if (dashboardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dashboardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DashboardDTO{" +
            "id=" + getId() +
            ", transferDate='" + getTransferDate() + "'" +
            ", profitAndLoss=" + getProfitAndLoss() +
            ", numberOfItems=" + getNumberOfItems() +
            ", currencyForDashboard=" + getCurrencyForDashboardId() +
            ", currencyForDashboard='" + getCurrencyForDashboardName() + "'" +
            ", transferForDashboard=" + getTransferForDashboardId() +
            ", transferForDashboard='" + getTransferForDashboardName() + "'" +
            ", warehouseOutg=" + getWarehouseOutgId() +
            ", warehouseOutg='" + getWarehouseOutgName() + "'" +
            ", materialTypeDefDashboard=" + getMaterialTypeDefDashboardId() +
            ", materialTypeDefDashboard='" + getMaterialTypeDefDashboardCode() + "'" +
            "}";
    }
}
