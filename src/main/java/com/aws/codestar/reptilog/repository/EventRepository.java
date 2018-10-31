package com.aws.codestar.reptilog.repository;

import com.aws.codestar.reptilog.domain.Event;
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
public class EventRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    static final String insertSql;
    static final String getForGraphSql;
    static final String getForMonthSql;
    static final String updateSql;
    static final String deleteSql;

    static {

        insertSql = "insert into events\n" +
                "(pet_id, user_id, event_type, event_data, event_date, event_notes)\n" +
                "values\n" +
                "(:petId, :userId, :eventType, :eventData, to_date(:eventDate, 'YYYY-MM-DD'), :eventNotes)";

        getForGraphSql = "select event_id, pet_id, user_id, event_type, event_data, event_date, event_notes\n" +
                    "from events\n" +
                    "where pet_id = :petId\n" +
                    "and event_type = :eventType\n" +
                    "order by event_date";

        getForMonthSql = "select event_id, pet_id, user_id, event_type, event_data, event_date, event_notes\n" +
                "from events\n" +
                "where user_id = :userId\n" +
                "and extract(month from event_date) = :month\n" +
                "and extract(year from event_date) = :year\n" +
                "order by event_date, pet_id, event_type";

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
                .addValue("eventDate", event.getDate())
                .addValue("eventNotes", event.getNotes());

        jdbcTemplate.update(insertSql, parameters, keyHolder, new String[]{"event_id"});
        return Integer.valueOf(keyHolder.getKeys().get(keyHolder.getKeys().keySet().toArray()[0]).toString());
    }

    public List<Event> getEventsByPet(String eventType, int petId) {
        Map<String, Object> params = new HashMap<>();
        params.put("petId", petId);
        params.put("eventType", eventType);
        return jdbcTemplate.query(getForGraphSql, params, new EventRowMapper());
    }

    public List<Event> getEventsByMonth(int userId, int month, int year) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("month", month);
        params.put("year", year);
        return jdbcTemplate.query(getForMonthSql, params, new EventRowMapper());
    }

    private class EventRowMapper implements RowMapper<Event> {

        @Override
        public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
            Event event = new Event();
            event.setId(rs.getInt("event_id"));
            event.setPetId(rs.getInt("pet_id"));
            event.setUserId(rs.getInt("user_id"));
            event.setType(rs.getString("event_type"));
            event.setData(rs.getDouble("event_data"));
            event.setDate(rs.getString("event_date"));
            event.setNotes(rs.getString("event_notes"));
            return event;
        }
    }
}
