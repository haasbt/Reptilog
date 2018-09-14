package com.aws.codestar.reptilog.controller;

import com.aws.codestar.reptilog.domain.Pet;
import com.aws.codestar.reptilog.repository.PetRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

@Controller
public class ServiceController {

    private PetRepository petRepo;

    public ServiceController(PetRepository petRepo) {
        this.petRepo = petRepo;
    }

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String home() {
        return "forward:index.html";
    }

    @RequestMapping(value = "/api/get-pets/{userId}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody List<Pet> getPets(HttpServletRequest request, @PathVariable("userId") int userId) {
        return petRepo.getByUserId(userId);
    }

}
