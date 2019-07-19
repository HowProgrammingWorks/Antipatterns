'use strict';

// Antipattern: Too many parameters
{
  const build = (name, city, birth, dynasty, school) => {
    const date = new Date(birth);
    return { name, city, birth: date, dynasty, school };
  };

  const emperor = build(
    'Marcus Aurelius',
    'Rome',
    '212-04-26',
    'Nerva-Antonine',
    'Stoicism',
  );

  console.log({ emperor });
}
