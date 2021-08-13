import { Factory } from 'miragejs';
import faker from 'faker';

export const eventFactory = Factory.extend({
    name(i: number) {
        return `Event ${i}`;
    },
    description: faker.lorem.paragraph(),
    creationDateStamp: faker.date.past(),
    deadlineDateStamp: faker.date.future(),
    // creator: ,
});
