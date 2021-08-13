import { Server, Model, Instantiate, Registry, } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';

// Factories
import { eventFactory } from './event';
import { eventServiceFactory } from './eventService';

const HOSTURL = process.env.REACT_APP_API_HOST;

export function startMockServer({ environment = 'development' } = {}): any {
  return new Server({
    environment,

    timing: 1000, // global timing parameter
    namespace: HOSTURL,

    models: {
      event: Model,
      eventService: Model,
    },

    factories: {
      event: eventFactory,
      eventService: eventServiceFactory,
    },

    seeds(server) {
      server.createList("event", 20).forEach((event: Partial<Instantiate<Registry<AnyModels, AnyFactories>, "event">>) => {
        server.createList("eventService", Math.ceil(Math.random() * 7));
        // server.createList("eventService", Math.ceil(Math.random() * 7), { event: 'test' }); // What type should I use for event?
      });
    },

    routes() {
      // @ts-ignore

      // GET EVENTS
      this.get(`/events`, (schema: any) => { // schema provides an access to Mirage's data layer
        return schema.events.all();
      }, { timing: 2000 }); // timing specific to this route

      // GET SINGLE EVENT
      this.get(`/events/:id`, (schema: any, request) => {
        const id = request.params.id;
        return schema.events.find(id);
      });

      // CREATE NEW EVENT
      this.post(`/events`, (schema: any, request) => { // what is the correct type for schema?
        let eventProps = JSON.parse(request.requestBody);
        return schema.events.create(eventProps);
      });

      // UPDATE EVENT
      this.post(`/events/:id`, (schema: any, request) => {
        const id = request.params.id;
        const event = schema.events.find(id);
        let eventProps = JSON.parse(request.requestBody);
        return event.update({ ...eventProps });
      });

      // DELETE EVENT
      this.post(`/events/:id`, (schema: any, request) => {
        const id = request.params.id;
        const event = schema.events.find(id);
        return event.destroy();
      })

    },
  });
}