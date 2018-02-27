describe('Howl', function() {
  var fixtureBaseUrl = 'http://localhost:9876/base/tests/audio/';
  var fixtureAudioUrl = fixtureBaseUrl + 'sound1.mp3';

  it('can play', function(done) {
    var sound = new Howl({
      src: [fixtureAudioUrl]
    });

    sound.once('play', function() {
      expect(sound.playing()).to.eq(true);
      done();
    });

    sound.play();
  });

  it('calling pause during play lock is not lost', function(done) {
    var sound = new Howl({
      src: [fixtureAudioUrl],
      html5: true
    });

    sound.once('load', function() {
      sound.play();
      sound.pause();

      setTimeout(function() {
        expect(sound.playing()).to.eq(false);
        done();
      }, 100);
    });
  });

  it('keeps order of volume and fade calls', function(done) {
    var sound = new Howl({
      src: [fixtureAudioUrl]
    });

    sound.fade(0, 0.5, 500);
    sound.volume(0);

    sound.once('load', function() {
      sound.volume(1);

      expect(sound.volume()).to.eq(1);
      done();
    });
  });

  it('queued calls to play ', function(done) {
    var sound = new Howl({
      src: [fixtureAudioUrl],
      html5: true
    });

    sound.play();
    sound.pause();
    sound.play();
    sound.volume(0);

    sound.once('load', function() {
      sound.volume(1);

      setTimeout(function() {
        expect(sound.volume()).to.eq(1);
        done();
      }, 100);
    });
  });

  it('calling mute ', function(done) {
    var sound = new Howl({
      src: [fixtureAudioUrl]
    });

    sound.mute();
    sound.play();

    sound.once('play', function() {
      expect(sound.playing()).to.eq(true);
    });
  });
});