package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.CompanyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Company and its DTO CompanyDTO.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class})
public interface CompanyMapper extends EntityMapper<CompanyDTO, Company> {

    @Mapping(source = "baseCurrency.id", target = "baseCurrencyId")
    @Mapping(source = "baseCurrency.isoCode", target = "baseCurrencyIsoCode")
    CompanyDTO toDto(Company company);

    @Mapping(source = "baseCurrencyId", target = "baseCurrency")
    Company toEntity(CompanyDTO companyDTO);

    default Company fromId(Long id) {
        if (id == null) {
            return null;
        }
        Company company = new Company();
        company.setId(id);
        return company;
    }
}
