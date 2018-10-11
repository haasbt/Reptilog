package com.aws.codestar.reptilog.service;

import com.aws.codestar.reptilog.domain.Event;
import com.aws.codestar.reptilog.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.aws.codestar.reptilog.util.ServiceUtil.getIntegerVal;
import static com.aws.codestar.reptilog.util.ServiceUtil.getStrVal;
import static com.aws.codestar.reptilog.util.ServiceUtil.getDoubleVal;

@Service
public class EventService {

    private EventRepository eventRepo;

    public EventService(EventRepository eventRepository) {this.eventRepo = eventRepository;}

    public Event createEvent(Map json) {
        Event event = processJson(json);
        int id = eventRepo.insert(event);
        event.setId(id);
        return event;
    }

    private Event processJson(Map json) {
        Event event = new Event();
        if (getIntegerVal(json, "eventId") != null) {
            event.setId(getIntegerVal(json, "eventId"));
        }
        event.setPetId(getIntegerVal(json, "petId"));
        event.setUserId(getIntegerVal(json, "userId"));
        event.setType(getStrVal(json, "eventType"));
        if (getDoubleVal(json, "eventData") != null) {
            event.setData(getDoubleVal(json, "eventData"));
        }
        event.setDate(getStrVal(json, "eventDate"));
        event.setNotes(getStrVal(json, "eventNotes"));
        return event;
    }
}
