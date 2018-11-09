package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Material and its DTO MaterialDTO.
 */
@Mapper(componentModel = "spring", uses = {MaterialclassificationMapper.class, LotMapper.class})
public interface MaterialMapper extends EntityMapper<MaterialDTO, Material> {

    @Mapping(source = "materialTypeDef.id", target = "materialTypeDefId")
    @Mapping(source = "materialTypeDef.name", target = "materialTypeDefName")
    @Mapping(source = "lotIdentifier.id", target = "lotIdentifierId")
    @Mapping(source = "lotIdentifier.code", target = "lotIdentifierCode")
    @Mapping(source = "materialTypeCat.id", target = "materialTypeCatId")
    @Mapping(source = "materialTypeCat.name", target = "materialTypeCatName")
    MaterialDTO toDto(Material material);

    @Mapping(source = "materialTypeDefId", target = "materialTypeDef")
    @Mapping(source = "lotIdentifierId", target = "lotIdentifier")
    @Mapping(source = "materialTypeCatId", target = "materialTypeCat")
    Material toEntity(MaterialDTO materialDTO);

    default Material fromId(Long id) {
        if (id == null) {
            return null;
        }
        Material material = new Material();
        material.setId(id);
        return material;
    }
}
