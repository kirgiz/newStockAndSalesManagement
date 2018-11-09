package com.kirgiz.stocksndsalesmanagement.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserAuthorizedThird entity.
 */
public class UserAuthorizedThirdDTO implements Serializable {

    private Long id;

    private Boolean defaultThird;

    private Boolean defaultDestination;

    private Long userAuthId;

    private String userAuthLogin;

    private Long thirdAuthId;

    private String thirdAuthName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isDefaultThird() {
        return defaultThird;
    }

    public void setDefaultThird(Boolean defaultThird) {
        this.defaultThird = defaultThird;
    }

    public Boolean isDefaultDestination() {
        return defaultDestination;
    }

    public void setDefaultDestination(Boolean defaultDestination) {
        this.defaultDestination = defaultDestination;
    }

    public Long getUserAuthId() {
        return userAuthId;
    }

    public void setUserAuthId(Long userId) {
        this.userAuthId = userId;
    }

    public String getUserAuthLogin() {
        return userAuthLogin;
    }

    public void setUserAuthLogin(String userLogin) {
        this.userAuthLogin = userLogin;
    }

    public Long getThirdAuthId() {
        return thirdAuthId;
    }

    public void setThirdAuthId(Long thirdId) {
        this.thirdAuthId = thirdId;
    }

    public String getThirdAuthName() {
        return thirdAuthName;
    }

    public void setThirdAuthName(String thirdName) {
        this.thirdAuthName = thirdName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserAuthorizedThirdDTO userAuthorizedThirdDTO = (UserAuthorizedThirdDTO) o;
        if (userAuthorizedThirdDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAuthorizedThirdDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAuthorizedThirdDTO{" +
            "id=" + getId() +
            ", defaultThird='" + isDefaultThird() + "'" +
            ", defaultDestination='" + isDefaultDestination() + "'" +
            ", userAuth=" + getUserAuthId() +
            ", userAuth='" + getUserAuthLogin() + "'" +
            ", thirdAuth=" + getThirdAuthId() +
            ", thirdAuth='" + getThirdAuthName() + "'" +
            "}";
    }
}
