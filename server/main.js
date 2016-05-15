import { Meteor } from 'meteor/meteor';

import { Robot1 } from '/imports/api/robot1/robot1.js';

import Cylon from 'cylon';

import '/imports/api/robot1/server/publications.js';

Meteor.startup(() => {
   //code to run on server at startup

    let toogles = '';

    myRobot = new Cylon.robot({

        name: 'Bot1',

        connections: {
            arduino: {adaptor: "firmata", port: "/dev/cu.usbmodem1411"}
        },

        devices: {
            led1: {driver: "led", pin: 6},
            led2: { driver: "led", pin: 7 },
            led3: { driver: "led", pin: 8 },
            led4: { driver: "led", pin: 9 },
            led5: { driver: "led", pin: 10 },
            led6: { driver: "led", pin: 11 },
            led7: { driver: "led", pin: 12 },
            led8: { driver: "led", pin: 13 },
            button: { driver: 'button', pin: 2 }

        },

        totalLeds () {
            let totalLeds = 0;
            _.each(this.devices, function (device, index) {
                if (index.indexOf("led") > -1) {
                    totalLeds++;
                }
            });
            return totalLeds;
        },

        turnOnLed (led) {
            this.devices[led].turnOn();
            //every((1).second(), this.devices.led1.toggle);
            //return 'ok';
        },

        turnOffLed (led) {
            this.devices[led].turnOff();
            //return 'ok';
        },

        turnOffAll () {
            finish(toogles);
            const totalLeds = this.totalLeds();
            for(let i = 1; i <= totalLeds; i++) {
                let name = 'led'+i;
                this.devices[name].turnOff();
            }
        },

        turnOnAll () {
            this.turnOffAll();
            const totalLeds = this.totalLeds();
            for(let i = 1; i <= totalLeds; i++) {
                let name = 'led'+i;
                this.devices[name].turnOn();
            }
        },

        turnToogleAll () {
            toogles = every((1).seconds(), () => {
                    const totalLeds = this.totalLeds();
            for(let i = 1; i <= totalLeds; i++) {
                let name = 'led'+i;
                this.devices[name].toggle();
            }
        });
        },

        commands () {
            return {
                'turnOnLed': this.turnOnLed,
                'turnOffLed': this.turnOffLed,
                'turnOnAll': this.turnOnAll,
                'turnToogleAll': this.turnToogleAll,
                'turnOffAll': this.turnOffAll
            };
        },

        work: Meteor.bindEnvironment((my) => {
            my.button.on('push', Meteor.bindEnvironment(() => {
                //my.commands['turnOnAll'].call();
                Meteor.call('turnOnAll');
                console.log('pushed!');
            }));
            my.button.on('release', Meteor.bindEnvironment(() => {
                //my.commands['turnOffAll'].call();
                Meteor.call('turnOffAll');
                console.log('released!');
            }));
        })

    });

    myRobot.start();

    const totalLeds = myRobot.totalLeds();

    Robot1.remove({});

    for (let i = 1; i <= totalLeds; i++) {
        Robot1.insert({
            title: 'Led '+ i,
            name: 'led' + i,
            status: ''
        });
    }

});
