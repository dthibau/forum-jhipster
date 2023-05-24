package org.formation.forum.repository;

import java.util.List;
import java.util.Optional;
import org.formation.forum.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Message entity.
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select message from Message message where message.author.login = ?#{principal.username}")
    List<Message> findByAuthorIsCurrentUser();

    default Optional<Message> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Message> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Message> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct message from Message message left join fetch message.author left join fetch message.topic",
        countQuery = "select count(distinct message) from Message message"
    )
    Page<Message> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct message from Message message left join fetch message.author left join fetch message.topic")
    List<Message> findAllWithToOneRelationships();

    @Query("select message from Message message left join fetch message.author left join fetch message.topic where message.id =:id")
    Optional<Message> findOneWithToOneRelationships(@Param("id") Long id);
}
