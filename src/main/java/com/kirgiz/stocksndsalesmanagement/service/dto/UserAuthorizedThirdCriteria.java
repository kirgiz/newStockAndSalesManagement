package com.kirgiz.stocksndsalesmanagement.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the UserAuthorizedThird entity. This class is used in UserAuthorizedThirdResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /user-authorized-thirds?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class UserAuthorizedThirdCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private BooleanFilter defaultThird;

    private BooleanFilter defaultDestination;

    private LongFilter userAuthId;

    private LongFilter thirdAuthId;

    public UserAuthorizedThirdCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public BooleanFilter getDefaultThird() {
        return defaultThird;
    }

    public void setDefaultThird(BooleanFilter defaultThird) {
        this.defaultThird = defaultThird;
    }

    public BooleanFilter getDefaultDestination() {
        return defaultDestination;
    }

    public void setDefaultDestination(BooleanFilter defaultDestination) {
        this.defaultDestination = defaultDestination;
    }

    public LongFilter getUserAuthId() {
        return userAuthId;
    }

    public void setUserAuthId(LongFilter userAuthId) {
        this.userAuthId = userAuthId;
    }

    public LongFilter getThirdAuthId() {
        return thirdAuthId;
    }

    public void setThirdAuthId(LongFilter thirdAuthId) {
        this.thirdAuthId = thirdAuthId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final UserAuthorizedThirdCriteria that = (UserAuthorizedThirdCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(defaultThird, that.defaultThird) &&
            Objects.equals(defaultDestination, that.defaultDestination) &&
            Objects.equals(userAuthId, that.userAuthId) &&
            Objects.equals(thirdAuthId, that.thirdAuthId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        defaultThird,
        defaultDestination,
        userAuthId,
        thirdAuthId
        );
    }

    @Override
    public String toString() {
        return "UserAuthorizedThirdCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (defaultThird != null ? "defaultThird=" + defaultThird + ", " : "") +
                (defaultDestination != null ? "defaultDestination=" + defaultDestination + ", " : "") +
                (userAuthId != null ? "userAuthId=" + userAuthId + ", " : "") +
                (thirdAuthId != null ? "thirdAuthId=" + thirdAuthId + ", " : "") +
            "}";
    }

}
