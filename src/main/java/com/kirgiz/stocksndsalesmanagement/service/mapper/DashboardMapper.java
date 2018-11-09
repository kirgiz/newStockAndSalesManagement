package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.DashboardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Dashboard and its DTO DashboardDTO.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class, TransferclassificationMapper.class, ThirdMapper.class, MaterialclassificationMapper.class})
public interface DashboardMapper extends EntityMapper<DashboardDTO, Dashboard> {

    @Mapping(source = "currencyForDashboard.id", target = "currencyForDashboardId")
    @Mapping(source = "currencyForDashboard.name", target = "currencyForDashboardName")
    @Mapping(source = "transferForDashboard.id", target = "transferForDashboardId")
    @Mapping(source = "transferForDashboard.name", target = "transferForDashboardName")
    @Mapping(source = "warehouseOutg.id", target = "warehouseOutgId")
    @Mapping(source = "warehouseOutg.name", target = "warehouseOutgName")
    @Mapping(source = "materialTypeDefDashboard.id", target = "materialTypeDefDashboardId")
    @Mapping(source = "materialTypeDefDashboard.code", target = "materialTypeDefDashboardCode")
    DashboardDTO toDto(Dashboard dashboard);

    @Mapping(source = "currencyForDashboardId", target = "currencyForDashboard")
    @Mapping(source = "transferForDashboardId", target = "transferForDashboard")
    @Mapping(source = "warehouseOutgId", target = "warehouseOutg")
    @Mapping(source = "materialTypeDefDashboardId", target = "materialTypeDefDashboard")
    Dashboard toEntity(DashboardDTO dashboardDTO);

    default Dashboard fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dashboard dashboard = new Dashboard();
        dashboard.setId(id);
        return dashboard;
    }
}
