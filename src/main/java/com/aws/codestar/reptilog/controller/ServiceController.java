package com.aws.codestar.reptilog.controller;

import com.aws.codestar.reptilog.domain.Pet;
import com.aws.codestar.reptilog.repository.PetRepository;
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

    public ServiceController(PetRepository petRepo, PetService petService) {
        this.petRepo = petRepo;
        this.petService = petService;
    }

    @RequestMapping(value = {"/", "/pet/*"}, method = RequestMethod.GET)
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
        //try {
            Pet pet = petService.createPet(json);
            response.put("success", true);
            response.put("petId", pet.getId());
        //} catch (Exception e) {
            //response.put("success", false);
            //response.put("errorMessage", e.toString());
        //}
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
}
