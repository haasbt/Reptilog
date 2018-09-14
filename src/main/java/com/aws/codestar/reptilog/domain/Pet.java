package com.aws.codestar.reptilog.domain;

public class Pet {

    private int id;
    private String type;
    private String name;
    private String hatchDate;
    private byte[] image;
    private String color;
    private String morph;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHatchDate() {
        return hatchDate;
    }

    public void setHatchDate(String hatchDate) {
        this.hatchDate = hatchDate;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMorph() {
        return morph;
    }

    public void setMorph(String morph) {
        this.morph = morph;
    }
}
