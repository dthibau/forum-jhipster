package org.formation.forum.service.mapper;

import org.formation.forum.domain.Message;
import org.formation.forum.domain.Topic;
import org.formation.forum.domain.User;
import org.formation.forum.service.dto.MessageDTO;
import org.formation.forum.service.dto.TopicDTO;
import org.formation.forum.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Message} and its DTO {@link MessageDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {
    @Mapping(target = "author", source = "author", qualifiedByName = "userLogin")
    @Mapping(target = "topic", source = "topic", qualifiedByName = "topicTitre")
    @Mapping(target = "message", source = "message", qualifiedByName = "messageId")
    MessageDTO toDto(Message s);

    @Named("messageId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MessageDTO toDtoMessageId(Message message);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("topicTitre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "titre", source = "titre")
    TopicDTO toDtoTopicTitre(Topic topic);
}
