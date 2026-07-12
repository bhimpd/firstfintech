import { faker } from '@faker-js/faker';

function getUserRegisterData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "P@ssword123!@#",
    };
}

export { getUserRegisterData };