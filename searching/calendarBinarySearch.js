// ∞ in Event denotes +/- infinity

function Calendar(events){
  this.events = events;

  this.scanEvents = function(event){
    var conflicts = [],
        left = 0,
        events = this.events,
        right = this.events.length - 1;

    while (left <= right){
      var mid = parseInt((left + right)/2, 10);
      if (events[mid].start >= event.end){
        if (mid === 0 || event.start >= this.events[mid-1].end)
          if (conflicts.length) break;
          else return mid;
        else right = mid - 1;   
      }
      else if (events[mid].end <= event.start) {
        if (mid === events.length - 1 || event.end <= events[mid+1].start)
          if (conflicts.length) break;
          else return mid + 1;
        else left = mid + 1;
      }
      else {
        conflicts.push(events[mid]);
        events = events.slice(0);
        events.splice(mid, 1);
        right = events.length - 1;
      }
    }
    return conflicts;
  };

  this.getAvailableTimeFrames = function(){
    var availableTimeFrames = [],
        eventsLength = this.events.length,
        i = 0;

    while(i < eventsLength){
      if (i === 0)
        availableTimeFrames.push(new Event('\u221E', this.events[i].start));
      
      if (i === eventsLength - 1)
        availableTimeFrames.push(new Event(this.events[i].end, '\u221E'));
      else if(this.events[i].end < this.events[i+1].start)
        availableTimeFrames.push(new Event(this.events[i].end, this.events[i+1].start));
      i++;
    }
    return availableTimeFrames;
  };

  this.resolveConflicts = function(result, event){
    var resultLength = result.length,
        insertIndex;
    for (var b = 0; b < resultLength; b++){
      var currentResult = result[b],
          currentIndex = this.events.indexOf(currentResult);
      this.events.splice(currentIndex, 1);
      insertIndex = !insertIndex || currentIndex < insertIndex ? currentIndex : insertIndex
      if (currentResult.start < event.start)
        event.start = currentResult.start;
      if (currentResult.end > event.end)
        event.end = currentResult.end;        
    }
    this.events.splice(insertIndex, 0, event)
  }

  this.getUnavailableRanges = function(calendars){
    var unionCalendar = new Calendar(this.events.slice(0)),
        calendarsLength = calendars.length;
    for(var i = 0; i < calendarsLength; i++){
      var currentCalendar = calendars[i],
          events = currentCalendar.events,
          eventsLength = events.length;
      for(var a = 0; a < eventsLength; a++){
        unionCalendar.insertEvent(events[a], unionCalendar.resolveConflicts.bind(unionCalendar));
      }
    }
    return unionCalendar;
  }; 

  this.insertEvent = function(event, conflictCallback){
    var result = this.scanEvents(event);
    conflictCallback = conflictCallback || function(result){console.log('There was a conflict with', result);};

    if (typeof result === 'number')
      this.events.splice(result, 0, event);
    else conflictCallback(result, event); 
  };
}

function Event(start, end){
  this.start = start;
  this.end = end;
}

var simpleCalendar = new Calendar([new Event(1,2), new Event(2.3, 2.7), new Event(2.7, 2.9), new Event(3,3.5), new Event(4.5,5.5), new Event(6, 7), new Event(7.5, 8)]);
simpleCalendar.insertEvent(new Event(2.2, 2.3));
console.table(simpleCalendar.events);

// var simpleCalendar2 = new Calendar([new Event(1.5, 2.8), new Event(7, 7.8)]);
// var simpleCalendar3 = new Calendar([new Event(5.4, 6.5)]);

// var simpleUnion = simpleCalendar.getUnavailableRanges([simpleCalendar2, simpleCalendar3]);
// console.table(simpleUnion.events);
// console.table(simpleUnion.getAvailableTimeFrames());

// var susiesCalendar = new Calendar([new Event(8, 9), new Event(9.5, 10.5), new Event(13, 14), new Event(14.5, 15)]);
// var jamiesCalendar = new Calendar([new Event(5.3, 7), new Event(8.5,10), new Event(10, 11), new Event(13.5, 14.2), new Event(14.7, 18)]);
// var bobsCalendar = new Calendar([new Event(4, 5), new Event(5.5, 6), new Event(6, 7), new Event(11, 13.4), new Event(17.4, 19)]);

// var unionCalendar = susiesCalendar.getUnavailableRanges([jamiesCalendar, bobsCalendar]);
// console.table(unionCalendar.events);
// console.table(unionCalendar.getAvailableTimeFrames());