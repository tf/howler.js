describe('Howl', function() {
  describe('with html5 audio', function() {
    includePlayerExamples({html5: true});
  });

  describe('with web audio', function() {
    includePlayerExamples({html5: false});
  });

  function includePlayerExamples(defaultOptions) {
    describe('#play', function() {
      it('sets playing to true once play event is emitted', function(done) {
        var howl = createHowl({
          src: [fixtureAudioUrl()]
        });

        howl.once('play', function() {
          expect(howl.playing()).to.eq(true);
          done();
        });

        howl.play();
      });
    });

    describe('#pause', function() {
      it('sets playing to false once pause event is emitted', function(done) {
        var howl = createHowl({
          src: [fixtureAudioUrl()]
        });

        howl.once('pause', function() {
          expect(howl.playing()).to.eq(false);
          done();
        });

        howl.play();
        howl.pause();
      });
    });

    describe('#fade', function() {
      it('sets volume to initial vale', function(done) {
        var howl = createHowl({
          src: [fixtureAudioUrl()]
        });

        whenLoaded(howl, function() {
          howl.fade(0.2, 0.8, 200);

          expect(howl.volume()).to.eq(0.2);
          done();
        });
      });

      it('emits fade event when fade is done', function(done) {
        var howl = createHowl({
          src: [fixtureAudioUrl()]
        });

        howl.once('fade', function() {
          done();
        });

        howl.fade(0.2, 0.8, 200);
      });

      it('emits fade event even when from and to values are equal', function(done) {
        var howl = createHowl({
          src: [fixtureAudioUrl()]
        });

        howl.once('fade', function() {
          done();
        });

        howl.fade(0.2, 0.2, 100);
      });
    });

    function createHowl(options) {
      return new Howl(Object.assign({}, options, defaultOptions));
    }
  }
});
