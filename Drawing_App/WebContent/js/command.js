/**
 * @author Nick Sullivan
 *
 * Ported from http://www.codeproject.com/Articles/15207/Design-Patterns-Command-Pattern
 */

var Command_Module = ( function(){

    var commandModule = {};

//Base Class - Command

    Command = function(){

        undo = function(){};
        redo = function(){};
    };

//Contrete Class - ????Command

    commandModule.SubjectCommand = function( subject, action ){

        Command.call( this );
        SubjectCommand.prototype = Object.create( Command.prototype );
        SubjectCommand.constructor = SubjectCommand;

        _subject = subject;
        _action = action;

        return{

            undo : function(){

                _subject.write( _acton );
            },

            redo : function(){

                _subject.erase( _acton );
            }
        };
    };

//Invoker Class

    commandModule.SubjectInvoker = function(){

        _commands = [];
        _subject = new Subject(); /* The _subject acts as the receiver of the action of the request, and the invoker is the container for all the actions.  */

        return{

            redo : function( level ){

                console.log( "---- Redo level ", level );
                _commands[ level ].redo();
            },

            undo : function( level ){

                console.log( "---- Undo level ", level );
                _commands[ level ].undo();
            },

            read : function(){

                return /* _subject.ReadDocument() */;
            },

            write : function( action ){

                command = new commandModule.SubjectCommand( _subject, action );
                _commands.push( command );
            },
        };
    };

    return commandModule;

} )();

