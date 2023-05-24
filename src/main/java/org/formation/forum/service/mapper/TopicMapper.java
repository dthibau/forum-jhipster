package org.formation.forum.service.mapper;

import org.formation.forum.domain.Topic;
import org.formation.forum.service.dto.TopicDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Topic} and its DTO {@link TopicDTO}.
 */
@Mapper(componentModel = "spring")
public interface TopicMapper extends EntityMapper<TopicDTO, Topic> {}
