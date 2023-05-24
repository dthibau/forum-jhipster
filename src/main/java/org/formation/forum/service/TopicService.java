package org.formation.forum.service;

import java.util.Optional;
import org.formation.forum.domain.Topic;
import org.formation.forum.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Topic}.
 */
@Service
@Transactional
public class TopicService {

    private final Logger log = LoggerFactory.getLogger(TopicService.class);

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    /**
     * Save a topic.
     *
     * @param topic the entity to save.
     * @return the persisted entity.
     */
    public Topic save(Topic topic) {
        log.debug("Request to save Topic : {}", topic);
        return topicRepository.save(topic);
    }

    /**
     * Update a topic.
     *
     * @param topic the entity to save.
     * @return the persisted entity.
     */
    public Topic update(Topic topic) {
        log.debug("Request to update Topic : {}", topic);
        return topicRepository.save(topic);
    }

    /**
     * Partially update a topic.
     *
     * @param topic the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Topic> partialUpdate(Topic topic) {
        log.debug("Just modifying partial update", topic);
        log.debug("Request to partially update Topic : {}", topic);

        return topicRepository
            .findById(topic.getId())
            .map(existingTopic -> {
                if (topic.getTitre() != null) {
                    existingTopic.setTitre(topic.getTitre());
                }
                if (topic.getDescription() != null) {
                    existingTopic.setDescription(topic.getDescription());
                }

                return existingTopic;
            })
            .map(topicRepository::save);
    }

    /**
     * Get all the topics.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Topic> findAll(Pageable pageable) {
        log.debug("Request to get all Topics");
        return topicRepository.findAll(pageable);
    }

    /**
     * Get one topic by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Topic> findOne(Long id) {
        log.debug("Request to get Topic : {}", id);
        return topicRepository.findById(id);
    }

    /**
     * Delete the topic by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Topic : {}", id);
        topicRepository.deleteById(id);
    }

    public String HelloWorld() {
        return "Hello World";
    }
}
