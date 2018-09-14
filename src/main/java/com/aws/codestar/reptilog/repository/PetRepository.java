package com.aws.codestar.reptilog.repository;

import com.aws.codestar.reptilog.domain.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PetRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    static final String insertSql;
    static final String getSql;
    static final String updateSql;

    static {

        insertSql = "insert into pets\n" +
                "(user_id, pet_type, pet_name, hatch_date, pet_image, color, morph)\n" +
                "values\n" +
                "(:userId, :petType, :petName, :hatchDate, :petImage, :color, :morph)";

        getSql = "select pet_id, pet_type, pet_name, hatch_date, pet_image, color, morph\n" +
                "from pets\n" +
                "where user_id = :userId";

        updateSql = "";
    }

    public List<Pet> getByUserId(int userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        return jdbcTemplate.query(getSql, params, new PetRowMapper());
    }

    private class PetRowMapper implements RowMapper<Pet> {

        @Override
        public Pet mapRow(ResultSet rs, int rowNum) throws SQLException {
            Pet pet = new Pet();
            pet.setId(rs.getInt("pet_id"));
            pet.setType(rs.getString("pet_type"));
            pet.setName(rs.getString("pet_name"));
            pet.setHatchDate(rs.getString("hatch_date"));
            pet.setImage(rs.getBytes("pet_image"));
            pet.setColor(rs.getString("color"));
            pet.setMorph(rs.getString("morph"));
            return pet;
        }
    }
}
