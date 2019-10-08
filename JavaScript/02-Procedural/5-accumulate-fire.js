'use strict';

// Antipattern: Accumulate and fire
{
  const name = 'Marcus Aurelius';
  const city = 'Rome';
  const birth = '212-04-26';
  const dynasty = 'Nerva-Antonine';
  const school = 'Stoicism';
  registerPerson();

  function registerPerson() {
    const date = new Date(birth);
    const person = { name, city, birth: date, dynasty, school };
    console.log({ person });
  }
}
