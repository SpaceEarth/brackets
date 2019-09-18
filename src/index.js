module.exports = function check(str, bracketsConfig) {
    const stack = [],
          configStr = bracketsConfig.join().replace(/,/g, ''),
          [open, close] = [...configStr].reduce((acc, value, indx) => {
            return acc[indx % 2].push(value), acc;
          }, [[], []]);

    return [...str].every((element) => {
      if ((configStr.match(new RegExp(`[${element}]`, 'g')) || []).length > 1) {
        if (stack.slice(-1)[0] === element) {
          stack.pop();
        } else {
          stack.push(element);
        }
      } else if (open.includes(element)) {
        stack.push(close[open.indexOf(element)]);
      } else if (close.includes(element)) {
        return stack.pop() === element;
      } else return false;
      return true;
    }) && !stack.length;
}
