package com.kirgiz.stocksndsalesmanagement.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserAuthorizedThird.
 */
@Entity
@Table(name = "user_authorized_third")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAuthorizedThird implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private User userAuth;

    @ManyToOne
    private Third thirdName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUserAuth() {
        return userAuth;
    }

    public UserAuthorizedThird userAuth(User user) {
        this.userAuth = user;
        return this;
    }

    public void setUserAuth(User user) {
        this.userAuth = user;
    }

    public Third getThirdName() {
        return thirdName;
    }

    public UserAuthorizedThird thirdName(Third third) {
        this.thirdName = third;
        return this;
    }

    public void setThirdName(Third third) {
        this.thirdName = third;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserAuthorizedThird userAuthorizedThird = (UserAuthorizedThird) o;
        if (userAuthorizedThird.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAuthorizedThird.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAuthorizedThird{" +
            "id=" + getId() +
            "}";
    }
}
