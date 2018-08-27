package com.kirgiz.stocksndsalesmanagement.service.mapper;

import com.kirgiz.stocksndsalesmanagement.domain.*;
import com.kirgiz.stocksndsalesmanagement.service.dto.UserAuthorizedThirdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserAuthorizedThird and its DTO UserAuthorizedThirdDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ThirdMapper.class})
public interface UserAuthorizedThirdMapper extends EntityMapper<UserAuthorizedThirdDTO, UserAuthorizedThird> {

    @Mapping(source = "userAuth.id", target = "userAuthId")
    @Mapping(source = "userAuth.login", target = "userAuthLogin")
    @Mapping(source = "thirdName.id", target = "thirdNameId")
    @Mapping(source = "thirdName.name", target = "thirdNameName")
    UserAuthorizedThirdDTO toDto(UserAuthorizedThird userAuthorizedThird);

    @Mapping(source = "userAuthId", target = "userAuth")
    @Mapping(source = "thirdNameId", target = "thirdName")
    UserAuthorizedThird toEntity(UserAuthorizedThirdDTO userAuthorizedThirdDTO);

    default UserAuthorizedThird fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserAuthorizedThird userAuthorizedThird = new UserAuthorizedThird();
        userAuthorizedThird.setId(id);
        return userAuthorizedThird;
    }
}
