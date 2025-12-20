import { faker } from "@faker-js/faker/locale/en_IN";

const { person, internet } = faker;
const sexType = person.sexType();
const firstName = person.firstName(sexType);
const lastName = person.lastName(sexType);
const email = internet.email({ firstName, lastName });

export { email, firstName, lastName, sexType };
