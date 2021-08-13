import { Factory } from 'miragejs';
import faker from 'faker';

export const eventServiceFactory = Factory.extend({
    type(i: number) {
        const types = ['photo', 'video', 'audio', 'entertainment', 'food', 'beverage'];
        return types[i % types.length];
    },
    executor: `${faker.name.firstName} ${faker.name.lastName}`,
    event: 'test',
});
