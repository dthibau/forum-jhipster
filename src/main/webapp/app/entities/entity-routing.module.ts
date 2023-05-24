import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'topic',
        data: { pageTitle: 'forumApp.topic.home.title' },
        loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule),
      },
      {
        path: 'message',
        data: { pageTitle: 'forumApp.message.home.title' },
        loadChildren: () => import('./message/message.module').then(m => m.MessageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
