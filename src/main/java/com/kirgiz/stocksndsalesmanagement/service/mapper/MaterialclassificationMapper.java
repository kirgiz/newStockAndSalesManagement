package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.MaterialclassificationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Materialclassification and its DTO MaterialclassificationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MaterialclassificationMapper extends EntityMapper<MaterialclassificationDTO, Materialclassification> {


    @Mapping(target = "materialCategories", ignore = true)
    @Mapping(target = "materialCats", ignore = true)
    @Mapping(target = "materialCategoryDashboards", ignore = true)
    Materialclassification toEntity(MaterialclassificationDTO materialclassificationDTO);

    default Materialclassification fromId(Long id) {
        if (id == null) {
            return null;
        }
        Materialclassification materialclassification = new Materialclassification();
        materialclassification.setId(id);
        return materialclassification;
    }
}
