'use strict';

// Antipattern: Temporary field
// Antipattern: Handle object as instances and hashes at the same time
// Antipattern: Use fields instead of arguments

class Person {
  constructor(name, birth) {
    this.name = name;
    this.birth = birth;
    this.parseAge();
  }

  parseAge() {
    const difference = new Date() - new Date(this.birth);
    this.age = Math.floor(difference / 31536000000);
    delete this.birth;
  }
}

// Usage

const person = new Person('Marcus Aurelius', '121-04-26');
console.dir({ person });
