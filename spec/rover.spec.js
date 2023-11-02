const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  // test 7
  test('constructor sets position and default values for mode and generatorWatts', function(){
    let testRover = new Rover(100);
    let testVals = [testRover.position, testRover.mode, testRover.generatorWatts];
    expect(testVals).toEqual([100, 'NORMAL', 110])
  })

  //test 8
  test('response returned by receiveMessage contains the name of the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test Message');
  })

  //test 9
  test('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}, {
      completed: true, 
      roverStatus: {
        mode: 'LOW_POWER',
        generatorWatts: 110, 
        position: 98382
      }
    }]);
  })
  //test 10
  test('responds correctly to the status check command', function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({
      completed: true,
      roverStatus: {
        mode: 'NORMAL', 
        generatorWatts: 110,
        position: 98382
      }
    })
  })

  //test 11
  test('responds correctly to the mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    let modeResult = [response.results, rover.mode];
    expect(modeResult).toEqual([[{completed: true}], 'LOW_POWER']);
    });

    //test 12
    test('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 369)];
    let message = new Message('Test Message', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    let modeResult = [response.results, rover.position];
    expect(modeResult).toEqual([[{completed: true}, {completed: false}], 98382])
    })

    //test 13
    test('responds with the position for the move command', function(){
      let commands = [new Command('MOVE', 369)];
      let message = new Message('Test Message', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      let modeResult = [response.results, rover.position];
      expect(modeResult).toEqual([[{completed: true}], 369]);
    })
  });
//finally past 13 tests, think this good, time to test student.
//^^ would have passed on first try but I learned I cant spell received... lol time to turn in.. finally.


