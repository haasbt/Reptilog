package com.aws.codestar.reptilog.repository;

import com.aws.codestar.reptilog.domain.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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
    static final String getByUserSql;
    static final String getByPetSql;
    static final String updateSql;

    static {

        insertSql = "insert into pets\n" +
                "(user_id, pet_type, pet_name, hatch_date, pet_image, color, morph, notes, size)\n" +
                "values\n" +
                "(:userId, :petType, :petName, to_date(:hatchDate, 'YYYY-MM-DD'), :petImage, :color, :morph, :notes, :size)";

        getByUserSql = "select pet_id, pet_type, pet_name, hatch_date, color, morph, status, notes, null as pet_image, size\n" +
                "from pets\n" +
                "where user_id = :userId";

        getByPetSql = "select pet_id, pet_type, pet_name, hatch_date, color, morph, status, notes, pet_image, size\n" +
                "from pets\n" +
                "where pet_id = :petId";

        updateSql = "";
    }

    public List<Pet> getByUserId(int userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        return jdbcTemplate.query(getByUserSql, params, new PetRowMapper());
    }

    public Pet getByPetId(int petId) {
        Map<String, Object> params = new HashMap<>();
        params.put("petId", petId);
        return jdbcTemplate.queryForObject(getByPetSql, params, new PetRowMapper());
    }

    public int insert(Pet pet) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("userId", pet.getUserId())
                .addValue("petType", pet.getType())
                .addValue("petName", pet.getName())
                .addValue("hatchDate", pet.getHatchDate())
                .addValue("petImage", pet.getImage())
                .addValue("color", pet.getColor())
                .addValue("morph", pet.getMorph())
                .addValue("notes", pet.getNotes())
                .addValue("size", pet.getSize());

        jdbcTemplate.update(insertSql, parameters, keyHolder, new String[]{"pet_id"});
        return Integer.valueOf(keyHolder.getKeys().get(keyHolder.getKeys().keySet().toArray()[0]).toString());
    }

    private class PetRowMapper implements RowMapper<Pet> {

        @Override
        public Pet mapRow(ResultSet rs, int rowNum) throws SQLException {
            Pet pet = new Pet();
            pet.setId(rs.getInt("pet_id"));
            pet.setType(rs.getString("pet_type"));
            pet.setName(rs.getString("pet_name"));
            pet.setHatchDate(rs.getString("hatch_date"));
            pet.setColor(rs.getString("color"));
            pet.setMorph(rs.getString("morph"));
            pet.setStatus(rs.getString("status"));
            pet.setNotes(rs.getString("notes"));
            pet.setImage(rs.getBytes("pet_image"));
            pet.setSize(rs.getString("size"));
            return pet;
        }
    }
}
