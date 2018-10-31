package com.aws.codestar.reptilog.controller;

import com.aws.codestar.reptilog.domain.Event;
import com.aws.codestar.reptilog.domain.Pet;
import com.aws.codestar.reptilog.repository.EventRepository;
import com.aws.codestar.reptilog.repository.PetRepository;
import com.aws.codestar.reptilog.service.EventService;
import com.aws.codestar.reptilog.service.PetService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.simple.JSONObject;

@Controller
public class ServiceController {

    private PetRepository petRepo;
    private PetService petService;
    private EventService eventService;
    private EventRepository eventRepo;

    public ServiceController(PetRepository petRepo, PetService petService, EventService eventService, EventRepository eventRepo) {
        this.petRepo = petRepo;
        this.petService = petService;
        this.eventService = eventService;
        this.eventRepo = eventRepo;
    }

    @RequestMapping(value = {"/pets", "/pets/*", "/charts", "/charts/*", "/calendar", "/calendar/*"}, method = RequestMethod.GET)
    public String home() {
        return "forward:index.html";
    }

    @RequestMapping(value = "/api/get-pets/{userId}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody List<Pet> getPets(HttpServletRequest request, @PathVariable("userId") int userId) {
        return petRepo.getByUserId(userId);
    }

    @RequestMapping(value = "api/create-pet", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody Map createPet(HttpServletRequest request, @RequestBody JSONObject json) {
        Map<String, Object> response = new HashMap<>();
            Pet pet = petService.createPet(json);
            response.put("success", true);
            response.put("petId", pet.getId());
        return response;
    }

    @RequestMapping(value = "/api/get-pet/{petId}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody Pet getPet(HttpServletRequest request, @PathVariable("petId") int petId) {
        return petRepo.getByPetId(petId);
    }

    @RequestMapping(value = "/api/update-notes", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody Map updateNotes(HttpServletRequest request, @RequestBody JSONObject json) {
        Map<String, Object> response = new HashMap<>();
        petService.updateNotes(json);
        response.put("success", true);
        return response;
    }

    @RequestMapping(value = "/api/update-pet", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody Map updatePet(HttpServletRequest request, @RequestBody JSONObject json) {
        Map<String, Object> response = new HashMap<>();
        petService.updatePet(json);
        response.put("success", true);
        return response;
    }

    @RequestMapping(value = "api/create-event", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody Map createEvent(HttpServletRequest request, @RequestBody JSONObject json) {
        Map<String, Object> response = new HashMap<>();
        Event event = eventService.createEvent(json);
        response.put("success", true);
        response.put("eventId", event.getId());
        return response;
    }

    @RequestMapping(value = "/api/get-events/{petId}/{eventType}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    List<Event> getEvents(HttpServletRequest request, @PathVariable("petId") int petId, @PathVariable("eventType") String eventType) {
        return eventRepo.getEventsByPet(eventType, petId);
    }

    @RequestMapping(value = "/api/get-events-by-month/{userId}/{petId}/{month}/{year}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    List<Event> getEventsByMonth(HttpServletRequest request, @PathVariable("userId") int userId, @PathVariable("petId") int petId, @PathVariable("month") int month, @PathVariable("year") int year) {
        if (petId == 0) {
            return eventRepo.getEventsByMonth(userId, month, year);
        } else {
            return eventRepo.getEventsByPetMonth(petId, month, year);
        }
    }
}
