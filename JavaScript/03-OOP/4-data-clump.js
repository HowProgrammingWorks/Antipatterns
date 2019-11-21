'use strict';

// Antipattern: Data clump

const countries = {
  379: 'Vatican',
  380: 'Ukraine',
  381: 'Serbia',
};

const areas = {
  43: 'Vinnitsa',
  44: 'Kiev',
  62: 'Donetsk',
};

const getCountryCode = name => Object
  .keys(countries)
  .find(key => countries[key] === name);

const getAreaCode = name => Object
  .keys(areas)
  .find(key => areas[key] === name);

const prepareCommand = (country, area, number) => {
  const countryCode = getCountryCode(country);
  const areaCode = getAreaCode(area);
  return `ATDP ${countryCode}${areaCode}${number}`;
};

class Person {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phone = phoneNumber;
  }

  parsePhone() {
    const phone = this.phone;
    const country = countries[phone.substring(1, 4)];
    const area = areas[phone.substring(4, 6)];
    const number = phone.substring(6, 13);
    return [country, area, number];
  }

  isValid(country, area, number) {
    if (!getCountryCode(country)) return false;
    if (!getAreaCode(area)) return false;
    if (number === '') return false;
    return true;
  }

  call() {
    const [country, area, number] = this.parsePhone();
    if (!this.isValid(country, area, number)) {
      throw new Error('Invalid phone number');
    }
    const command = prepareCommand(country, area, number);
    console.log(command);
  }
}

// Usage

const person = new Person('Marcus Aurelius', '+380441234567');
console.dir({ person });
person.call();
