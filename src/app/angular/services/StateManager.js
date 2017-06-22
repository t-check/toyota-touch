app.factory('StateManager', ['$rootScope', function($rootScope){
        var states = [];
        $rootScope.stateName = '';
        var state = {};
        
        return {
            ok: function(){
                state.ok();
            },
            up: function(){
                state.up();
            },
            down: function(){
                state.down();
            },
            left: function(){
                state.left();
            },
            right: function(){
                state.right();
            },
            back: function(){
                if (states.length > 1){
                    states.pop();
                    $rootScope.visibleWidget = state.name;
                }
            },
            moveToState: function(sn){
                states.push(sn);
                //lastState = state;
                //$rootScope.stateName = sn;
            },
            takeOver: function(s){
                states.push(s);
                //state = s;
                $rootScope.stateName = s.name;
            },
            getStateName: function(){
                return state.name;
            },
            getState: function(){
                return states[states.length -1];
            },
            setState: function(s){
                states.push(s);
            }
        }
    }])