function whenLoaded(howl, fn) {
  if (howl.state() === 'loaded') {
    fn();
  }
  else {
    howl.once('load', fn);
  }
}
