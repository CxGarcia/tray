//made a mock api to simulate a real form scenario

export function submit(values) {
  console.log('form is being processed with the following info: ', values);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random();
      return num > 0.1 ? resolve(values) : reject();
    }, 1500);
  });
}
