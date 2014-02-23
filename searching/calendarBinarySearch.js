//~ denotes infinity

function Calendar(events){
  this.events = events;

  this.scanEvents = function (event){
    var conflicts,
        left = 0,
        right = this.events.length - 1;

    while (left <= right){
      var mid = parseInt((left + right)/2, 10);
      if (this.events[mid].start >= event.end){
        if (mid === 0 || event.start >= this.events[mid-1].end)
          if (conflicts) return conflicts;
          else return mid;
        else right = mid - 1;   
      }
      else if (this.events[mid].end <= event.start) {
        if (mid === this.events.length - 1 || event.end <= this.events[mid+1].start)
          if (conflicts) return conflicts ;
          else return mid + 1;
        else left = mid + 1;
      }
      else return this.events[mid];
    }
  };

  this.getAvailableTimeFrames = function(){
    var availableTimeFrames = [],
        eventsLength = this.events.length,
        i = 0;
        
    while(i < eventsLength){
      if (i === 0)
        availableTimeFrames.push(new Event('~', this.events[i].start));
      
      if (i === eventsLength - 1)
        availableTimeFrames.push(new Event(this.events[i].end, '~'));
      else if(this.events[i].end < this.events[i+1].start)
        availableTimeFrames.push(new Event(this.events[i].end, this.events[i+1].start));
      i++;
    }
    return availableTimeFrames;
  };

  this.union = function(calendar){
    var unionCalendar = new Calendar(this.events.slice(0)),
        events = calendar.events,
        length = events.length;
    for(var i = 0; i < length; i++){
      unionCalendar.insertEvent(events[i]);
    }
    return unionCalendar;
  };  

  this.insertEvent = function (event){
    var result = this.scanEvents(event);

    if (typeof result === 'number')
      this.events.splice(result, 0, event);
    else console.log('There was a conflict.', result);  
  };
}

function Event(start, end){
  this.start = start;
  this.end = end;
}

var myCalendar = new Calendar([new Event(8, 9), new Event(9.5, 10.5), new Event(13, 14), new Event(14.5, 15)]);
var yourCalendar = new Calendar([new Event(9.5,10), new Event(10.5, 11), new Event(13.5, 13.7), new Event(15, 18)]);
myCalendar.insertEvent(new Event(8.7, 9.7));

var unionCalendar = myCalendar.union(yourCalendar);
console.table(unionCalendar.events);
console.table(unionCalendar.getAvailableTimeFrames());