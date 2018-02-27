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

      describe('while howl is not yet loaded', function() {
        it('does not postpone other queued commands', function(done) {
          var howl = new Howl({
            src: [fixtureAudioUrl()]
          });

          howl.play();
          howl.pause();
          howl.play();
          howl.volume(0);

          whenLoaded(howl, function() {
            howl.volume(1);

            setTimeout(function() {
              expect(howl.volume()).to.eq(1);
              done();
            }, 100);
          });
        });
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

      describe('during play lock', function() {
        it('is queued and performed asyncronously', function(done) {
          var howl = new createHowl({
            src: [fixtureAudioUrl()]
          });

          whenLoaded(howl, function() {
            howl.play();
            howl.pause();

            setTimeout(function() {
              expect(howl.playing()).to.eq(false);
              done();
            }, 100);
          });
        });
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

      describe('while howl is not yet loaded', function() {
        it('does not postpone other queued commands', function(done) {
          var howl = new Howl({
            src: [fixtureAudioUrl()]
          });

          howl.fade(0, 0.5, 500);
          howl.volume(0);

          whenLoaded(howl, function() {
            howl.volume(1);

            expect(howl.volume()).to.eq(1);
            done();
          });
        });
      });
    });

    describe('#volume', function() {
      describe('while howl is not yet loaded', function() {
        it('only emits a single volume event for multiple calls', function(done) {
          var howl = new Howl({
            src: [fixtureAudioUrl()]
          });
          var volumeListener = sinon.spy();

          howl.on('volume', volumeListener);

          howl.volume(0);
          howl.volume(0.4);
          howl.volume(1);

          whenLoaded(howl, function() {
            setTimeout(function() {
              expect(volumeListener).to.have.been.calledOnce;
              done();
            }, 100);
          });
        });

        it('supresses queued fades', function(done) {
          var howl = new Howl({
            src: [fixtureAudioUrl()]
          });
          var fadeListener = sinon.spy();

          howl.on('fade', fadeListener);

          howl.fade(0, 0.5, 500);
          howl.volume(1);

          howl.once('volume', function() {
            expect(fadeListener).not.to.have.been.called;
            done();
          });
        });
      });
    });

    function createHowl(options) {
      return new Howl(Object.assign({}, options, defaultOptions));
    }
  }
});
