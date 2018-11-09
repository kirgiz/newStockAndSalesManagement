package com.kirgiz.stocksndsalesmanagement.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(name = "default_third")
    private Boolean defaultThird;

    @Column(name = "default_destination")
    private Boolean defaultDestination;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User userAuth;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Third thirdAuth;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isDefaultThird() {
        return defaultThird;
    }

    public UserAuthorizedThird defaultThird(Boolean defaultThird) {
        this.defaultThird = defaultThird;
        return this;
    }

    public void setDefaultThird(Boolean defaultThird) {
        this.defaultThird = defaultThird;
    }

    public Boolean isDefaultDestination() {
        return defaultDestination;
    }

    public UserAuthorizedThird defaultDestination(Boolean defaultDestination) {
        this.defaultDestination = defaultDestination;
        return this;
    }

    public void setDefaultDestination(Boolean defaultDestination) {
        this.defaultDestination = defaultDestination;
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

    public Third getThirdAuth() {
        return thirdAuth;
    }

    public UserAuthorizedThird thirdAuth(Third third) {
        this.thirdAuth = third;
        return this;
    }

    public void setThirdAuth(Third third) {
        this.thirdAuth = third;
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
            ", defaultThird='" + isDefaultThird() + "'" +
            ", defaultDestination='" + isDefaultDestination() + "'" +
            "}";
    }
}
