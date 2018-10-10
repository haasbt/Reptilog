package com.aws.codestar.reptilog.repository;

import com.aws.codestar.reptilog.domain.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class EventRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    static final String insertSql;
    static final String updateSql;
    static final String deleteSql;

    static {

        insertSql = "insert into events\n" +
                "(pet_id, user_id, event_type, event_data, event_data_unit, event_date, event_notes)\n" +
                "values\n" +
                "(:petId, :userId, :eventType, :eventData, :eventDataUnit, to_date(:eventDate, 'YYYY-MM-DD'), :eventNotes)";

        updateSql = "";

        deleteSql = "";
    }

    public int insert(Event event) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("petId", event.getPetId())
                .addValue("userId", event.getUserId())
                .addValue("eventType", event.getType())
                .addValue("eventData", event.getData())
                .addValue("eventDataUnit", event.getDataUnit())
                .addValue("eventDate", event.getDate())
                .addValue("eventNotes", event.getNotes());

        jdbcTemplate.update(insertSql, parameters, keyHolder, new String[]{"event_id"});
        return Integer.valueOf(keyHolder.getKeys().get(keyHolder.getKeys().keySet().toArray()[0]).toString());
    }
}
