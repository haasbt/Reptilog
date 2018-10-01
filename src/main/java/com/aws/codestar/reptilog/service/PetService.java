package com.aws.codestar.reptilog.service;

import com.aws.codestar.reptilog.domain.Pet;
import com.aws.codestar.reptilog.repository.PetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static com.aws.codestar.reptilog.util.ServiceUtil.getIntegerVal;
import static com.aws.codestar.reptilog.util.ServiceUtil.getStrVal;

@Service
public class PetService {
    private PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Transactional
    public Pet createPet(Map json) {
        Pet pet = processPet(json);
        int petId = petRepository.insert(pet);
        pet.setId(petId);
        return pet;
    }

    @Transactional
    public void updateNotes(Map json) {
        int petId = getIntegerVal(json, "petId");
        String notes = getStrVal(json, "notes");
        petRepository.updateNotes(petId, notes);
    }

    private Pet processPet(Map json) {
        Pet pet = new Pet();
        if (getIntegerVal(json, "petId") != null) {
            pet.setId(getIntegerVal(json, "petId"));
        }
        pet.setUserId(getIntegerVal(json, "userId"));
        pet.setName(getStrVal(json, "name"));
        pet.setType(getStrVal(json, "type"));
        pet.setHatchDate(getStrVal(json, "hatchDate"));
        pet.setImage(getStrVal(json, "image"));
        pet.setColor(getStrVal(json, "color"));
        pet.setMorph(getStrVal(json, "morph"));
        pet.setStatus(getStrVal(json, "status"));
        pet.setNotes(getStrVal(json, "notes"));
        pet.setSize(getStrVal(json, "size"));
        return pet;
    }
}
