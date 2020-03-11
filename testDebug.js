(function foo() {
  let a = 1000;
  let b = 2000;
  const c = [a, b] = [b, a];
  console.log(c);
})();

