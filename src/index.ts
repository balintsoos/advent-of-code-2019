const day = process.env.DAY ?? '01';
const part = process.env.PART ?? '1';

console.log(`Day ${day} Part ${part}`);

(async () => {
  const module = await import(`./days/day-${day}/part-${part}`);
  module.default();
})();
