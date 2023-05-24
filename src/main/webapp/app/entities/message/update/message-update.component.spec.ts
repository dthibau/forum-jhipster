import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MessageFormService } from './message-form.service';
import { MessageService } from '../service/message.service';
import { IMessage } from '../message.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ITopic } from 'app/entities/topic/topic.model';
import { TopicService } from 'app/entities/topic/service/topic.service';

import { MessageUpdateComponent } from './message-update.component';

describe('Message Management Update Component', () => {
  let comp: MessageUpdateComponent;
  let fixture: ComponentFixture<MessageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let messageFormService: MessageFormService;
  let messageService: MessageService;
  let userService: UserService;
  let topicService: TopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MessageUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MessageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MessageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    messageFormService = TestBed.inject(MessageFormService);
    messageService = TestBed.inject(MessageService);
    userService = TestBed.inject(UserService);
    topicService = TestBed.inject(TopicService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Message query and add missing value', () => {
      const message: IMessage = { id: 456 };
      const message: IMessage = { id: 68539 };
      message.message = message;

      const messageCollection: IMessage[] = [{ id: 62707 }];
      jest.spyOn(messageService, 'query').mockReturnValue(of(new HttpResponse({ body: messageCollection })));
      const additionalMessages = [message];
      const expectedCollection: IMessage[] = [...additionalMessages, ...messageCollection];
      jest.spyOn(messageService, 'addMessageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ message });
      comp.ngOnInit();

      expect(messageService.query).toHaveBeenCalled();
      expect(messageService.addMessageToCollectionIfMissing).toHaveBeenCalledWith(
        messageCollection,
        ...additionalMessages.map(expect.objectContaining)
      );
      expect(comp.messagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const message: IMessage = { id: 456 };
      const author: IUser = { id: 27859 };
      message.author = author;

      const userCollection: IUser[] = [{ id: 78929 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [author];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ message });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Topic query and add missing value', () => {
      const message: IMessage = { id: 456 };
      const topic: ITopic = { id: 56833 };
      message.topic = topic;

      const topicCollection: ITopic[] = [{ id: 41584 }];
      jest.spyOn(topicService, 'query').mockReturnValue(of(new HttpResponse({ body: topicCollection })));
      const additionalTopics = [topic];
      const expectedCollection: ITopic[] = [...additionalTopics, ...topicCollection];
      jest.spyOn(topicService, 'addTopicToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ message });
      comp.ngOnInit();

      expect(topicService.query).toHaveBeenCalled();
      expect(topicService.addTopicToCollectionIfMissing).toHaveBeenCalledWith(
        topicCollection,
        ...additionalTopics.map(expect.objectContaining)
      );
      expect(comp.topicsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const message: IMessage = { id: 456 };
      const message: IMessage = { id: 25176 };
      message.message = message;
      const author: IUser = { id: 77711 };
      message.author = author;
      const topic: ITopic = { id: 55048 };
      message.topic = topic;

      activatedRoute.data = of({ message });
      comp.ngOnInit();

      expect(comp.messagesSharedCollection).toContain(message);
      expect(comp.usersSharedCollection).toContain(author);
      expect(comp.topicsSharedCollection).toContain(topic);
      expect(comp.message).toEqual(message);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessage>>();
      const message = { id: 123 };
      jest.spyOn(messageFormService, 'getMessage').mockReturnValue(message);
      jest.spyOn(messageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ message });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: message }));
      saveSubject.complete();

      // THEN
      expect(messageFormService.getMessage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(messageService.update).toHaveBeenCalledWith(expect.objectContaining(message));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessage>>();
      const message = { id: 123 };
      jest.spyOn(messageFormService, 'getMessage').mockReturnValue({ id: null });
      jest.spyOn(messageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ message: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: message }));
      saveSubject.complete();

      // THEN
      expect(messageFormService.getMessage).toHaveBeenCalled();
      expect(messageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMessage>>();
      const message = { id: 123 };
      jest.spyOn(messageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ message });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(messageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMessage', () => {
      it('Should forward to messageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(messageService, 'compareMessage');
        comp.compareMessage(entity, entity2);
        expect(messageService.compareMessage).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTopic', () => {
      it('Should forward to topicService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(topicService, 'compareTopic');
        comp.compareTopic(entity, entity2);
        expect(topicService.compareTopic).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
