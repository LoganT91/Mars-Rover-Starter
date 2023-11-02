class Message {
   constructor(messageName, commands = []) { 
      
      if (!messageName) {
         throw Error("Not a valid message name.");
      }
      this.messageName = messageName;
      this.commands = commands;
   }
};

module.exports = Message;