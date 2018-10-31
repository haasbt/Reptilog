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
    static final String updateNotesSql;

    static {

        insertSql = "insert into pets\n" +
                "(user_id, pet_type, pet_name, hatch_date, pet_image, color, morph, notes, size)\n" +
                "values\n" +
                "(:userId, :petType, :petName, to_date(:hatchDate, 'YYYY-MM-DD'), :petImage, :color, :morph, :notes, :size)";

        getByUserSql = "select pet_id, user_id, pet_type, pet_name, hatch_date, color, morph, status, notes, pet_image, size, null as last_length, null as last_weight\n" +
                "from pets\n" +
                "where user_id = :userId";

        getByPetSql = "select p.pet_id, user_id, p.pet_type, p.pet_name, p.hatch_date, p.color, p.morph, p.status, p.notes, p.pet_image, p.size, (\n" +
                        "select e.event_data from events e where e.pet_id = p.pet_id and e.event_type = 'Length' and e.event_date = (\n" +
                            "select max(e2.event_date) from events e2 where e2.pet_id = p.pet_id and e2.event_type = 'Length'\n" +
                        ") limit 1) as last_length, (\n" +
                        "select e.event_data from events e where e.pet_id = p.pet_id and e.event_type = 'Weight' and e.event_date = (\n" +
                            "select max(e2.event_date) from events e2 where e2.pet_id = p.pet_id and e2.event_type = 'Weight'\n" +
                        ") limit 1) as last_weight\n" +
                "from pets p\n" +
                "where pet_id = :petId";

        updateSql = "update pets\n" +
                "set pet_type = :petType, pet_name = :petName, hatch_date = to_date(:hatchDate, 'YYYY-MM-DD'), pet_image = :petImage, color = :color, morph = :morph, notes = :notes, size = :size\n" +
                "where pet_id = :petId";

        updateNotesSql = "update pets\n" +
                "set notes = :notes\n" +
                "where pet_id = :petId";
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

    public void update(Pet pet) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("petType", pet.getType())
                .addValue("petName", pet.getName())
                .addValue("hatchDate", pet.getHatchDate())
                .addValue("petImage", pet.getImage())
                .addValue("color", pet.getColor())
                .addValue("morph", pet.getMorph())
                .addValue("notes", pet.getNotes())
                .addValue("size", pet.getSize())
                .addValue("petId", pet.getId());

        jdbcTemplate.update(updateSql, parameters);
    }

    public void updateNotes(int petId, String notes) {
        Map<String, Object> params = new HashMap<>();
        params.put("notes", notes);
        params.put("petId", petId);
        jdbcTemplate.update(updateNotesSql, params);
    }

    private class PetRowMapper implements RowMapper<Pet> {

        @Override
        public Pet mapRow(ResultSet rs, int rowNum) throws SQLException {
            Pet pet = new Pet();
            pet.setId(rs.getInt("pet_id"));
            pet.setUserId(rs.getInt("user_id"));
            pet.setType(rs.getString("pet_type"));
            pet.setName(rs.getString("pet_name"));
            pet.setHatchDate(rs.getString("hatch_date"));
            pet.setColor(rs.getString("color"));
            pet.setMorph(rs.getString("morph"));
            pet.setStatus(rs.getString("status"));
            pet.setNotes(rs.getString("notes"));
            pet.setImage(rs.getString("pet_image"));
            pet.setSize(rs.getString("size"));
            pet.setLastLength(rs.getString("last_length"));
            pet.setLastWeight(rs.getString("last_weight"));
            return pet;
        }
    }
}
