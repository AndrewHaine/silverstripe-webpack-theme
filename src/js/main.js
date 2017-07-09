import now from 'lodash/now';

export default function () {

  const helloWorld = {
    init() {

      console.log(now());

    }
  };

  helloWorld.init();

}
