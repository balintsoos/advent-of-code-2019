const day = process.env.DAY ?? '01';
const part = process.env.PART ?? '1';

console.log(`Day ${day} Part ${part}`);

import(`./days/day-${day}/part-${part}`);
