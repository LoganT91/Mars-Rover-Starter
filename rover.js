class Rover {
   // Write code here!
   constructor(position){
      this.position = position,
      this.mode = 'NORMAL',
      this.generatorWatts = 110
   };

   receiveMessage(message){
      let response = {
         message: '',
         results: []
      };

      for(let i = 0; i < message.commands.length; i++){
         let commandType = message.commands[i].commandType;
         let value = message.commands[i].value;

         if(commandType === 'STATUS_CHECK'){
            response.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            })
         } else if(commandType === 'MODE_CHANGE') {
            if(value === 'LOW_POWER'){
               this.mode = 'LOW_POWER';
               response.results.push(checkCompleted(true));
            } else {
               this.mode = 'NORMAL';
               response.results.push(checkCompleted(true));               
            } 
         } else if(commandType === 'MOVE'){
               if(this.mode === 'LOW_POWER'){
                  response.results.push(checkCompleted(false));
               } else {
                  this.position = value;
                  response.results.push(checkCompleted(true));
               }
            }
         }
         response.message = message.messageName;
         return response
      };
   };
let checkCompleted = function(response){
   return{
      completed: response
   }
};

module.exports = Rover;