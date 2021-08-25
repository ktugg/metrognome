document.addEventListener('DOMContentLoaded', function()
{
    let buttons = document.querySelectorAll('button');

    buttons.forEach(function(button)
    {
        button.addEventListener("click", function()
        {
            let buttonFunction = button.dataset.function;

            switch (buttonFunction)
            {
                case 'start':
                    let tempo = document.getElementById('tempo').value, // in beats per minute
                        beats = document.getElementById('beats').value, // beats per measure
                        unit = document.getElementById('unit').value; // what note duration gets the beat (normally multiples of 2)

                        measure.start(tempo, beats, unit);
                break;

                case 'stop': measure.stop();
                break;
                default: return false;
            }
        });
    });

    function Measure()
    {
        const BEAT_SOURCE = 'includes/sounds/beat.mp3',
              ACCENT_SOURCE = 'includes/sounds/accent.mp3';

        let metronome,
            beatsDisplay = document.getElementById('beatsDisplay'),
            unitDisplay = document.getElementById('unitDisplay'),
            beatIndex = 1;

        this.start = function(tempo, beats, unit)
        {
            const secondsPerMinute = 60,
                  milliseconds = 1000;

            let tempoSeconds = (milliseconds * secondsPerMinute / tempo);

            click(beats);

            metronome = setInterval(function()
            { click(beats); }, tempoSeconds);
        }

        function click(beats)
        {
            let beat = new Switcher(BEAT_SOURCE, 10),
                accent = new Switcher(ACCENT_SOURCE, 4);

            if (beatIndex < parseInt(beats))
            { beatIndex++; }

            else
            { beatIndex = 1; }

            if (beatIndex === 1)
            { beat.play(); }

            else
            { beat.play(); }

            beatsDisplay.textContent = beatIndex;
        }

        this.stop = function()
        {
            clearInterval(metronome);
        }
    }

    let measure = new Measure()

    let Channel = function (audio_uri)
    {
        this.audio_uri = audio_uri;
        this.resource = new Audio(audio_uri);

        this.play = function()
        { this.resource.play(); }

            this.pause = function()
            { this.resource.pause(); }
    }

    let Switcher = function(audio_uri, num)
    {
        this.channels = [];
        this.num = num;
        this.index = 0;

        for (var i = 0; i < num; i++)
        { this.channels.push(new Channel(audio_uri)); }

        this.play = function()
        {
            this.channels[this.index++].play();
            this.index = this.index < this.num ? this.index : 0;
        }

        this.pause = function()
        {
            this.channels[this.index].pause();
        }
    }
});