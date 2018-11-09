package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.ThirdclassificationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Thirdclassification and its DTO ThirdclassificationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ThirdclassificationMapper extends EntityMapper<ThirdclassificationDTO, Thirdclassification> {


    @Mapping(target = "thirdCategories", ignore = true)
    Thirdclassification toEntity(ThirdclassificationDTO thirdclassificationDTO);

    default Thirdclassification fromId(Long id) {
        if (id == null) {
            return null;
        }
        Thirdclassification thirdclassification = new Thirdclassification();
        thirdclassification.setId(id);
        return thirdclassification;
    }
}
