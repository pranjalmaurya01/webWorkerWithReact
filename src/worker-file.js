const self = this;

const workercode = () => {
  let start = 1;
  self.onmessage = function (e) {
    let workerResult = 0;
    if (e.data === 'forLOOP') {
      start *= 10;
      let mul = 1;
      for (let i = 1; i <= start * 10; i++) {
        mul = i;
      }
      workerResult = mul;
    }
    self.postMessage(workerResult);
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
const blob = new Blob([code], {type: 'application/javascript'});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
