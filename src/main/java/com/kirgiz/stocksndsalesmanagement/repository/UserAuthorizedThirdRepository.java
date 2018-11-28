package com.kirgiz.stocksndsalesmanagement.repository;

import com.kirgiz.stocksndsalesmanagement.domain.UserAuthorizedThird;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserAuthorizedThird entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserAuthorizedThirdRepository extends JpaRepository<UserAuthorizedThird, Long>, JpaSpecificationExecutor<UserAuthorizedThird> {

    @Query("select user_authorized_third from UserAuthorizedThird user_authorized_third where user_authorized_third.userAuth.login = ?#{principal.username}")
    List<UserAuthorizedThird> findByUserAuthIsCurrentUser();

}
