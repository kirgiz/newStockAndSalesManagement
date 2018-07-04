package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.LotDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lot and its DTO LotDTO.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class})
public interface LotMapper extends EntityMapper<LotDTO, Lot> {

    @Mapping(source = "buycurrencylot.id", target = "buycurrencylotId")
    @Mapping(source = "buycurrencylot.isoCode", target = "buycurrencylotIsoCode")
    LotDTO toDto(Lot lot);

    @Mapping(target = "materialLots", ignore = true)
    @Mapping(source = "buycurrencylotId", target = "buycurrencylot")
    Lot toEntity(LotDTO lotDTO);

    default Lot fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lot lot = new Lot();
        lot.setId(id);
        return lot;
    }
}
