package com.ankit.school_management.config;

import javax.sql.DataSource;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.List;

@Component
public class StudentSchemaCleanup implements ApplicationRunner {

    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;

    public StudentSchemaCleanup(JdbcTemplate jdbcTemplate, DataSource dataSource) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!isPostgres()) {
            return;
        }

        List<String> constraintNames = jdbcTemplate.queryForList("""
                select tc.constraint_name
                from information_schema.table_constraints tc
                join information_schema.key_column_usage kcu
                  on tc.constraint_name = kcu.constraint_name
                 and tc.table_schema = kcu.table_schema
                where tc.table_name = 'students'
                  and tc.constraint_type = 'UNIQUE'
                  and kcu.column_name = 'roll_number'
                """, String.class);

        for (String constraintName : constraintNames) {
            jdbcTemplate.execute("ALTER TABLE students DROP CONSTRAINT IF EXISTS \"" + constraintName + "\"");
        }

        List<String> indexNames = jdbcTemplate.queryForList("""
                select indexname
                from pg_indexes
                where tablename = 'students'
                  and indexdef ilike '%unique%'
                  and indexdef ilike '%(roll_number)%'
                """, String.class);

        for (String indexName : indexNames) {
            jdbcTemplate.execute("DROP INDEX IF EXISTS \"" + indexName + "\"");
        }

        List<String> usernameConstraintNames = jdbcTemplate.queryForList("""
                select tc.constraint_name
                from information_schema.table_constraints tc
                join information_schema.key_column_usage kcu
                    on tc.constraint_name = kcu.constraint_name
                 and tc.table_schema = kcu.table_schema
                where tc.table_name = 'students'
                    and tc.constraint_type = 'UNIQUE'
                    and kcu.column_name = 'username'
                """, String.class);

        for (String constraintName : usernameConstraintNames) {
            jdbcTemplate.execute("ALTER TABLE students DROP CONSTRAINT IF EXISTS \"" + constraintName + "\"");
        }

        List<String> usernameIndexNames = jdbcTemplate.queryForList("""
                select indexname
                from pg_indexes
                where tablename = 'students'
                    and indexdef ilike '%unique%'
                    and indexdef ilike '%(username)%'
                """, String.class);

        for (String indexName : usernameIndexNames) {
            jdbcTemplate.execute("DROP INDEX IF EXISTS \"" + indexName + "\"");
        }
    }

    private boolean isPostgres() {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metadata = connection.getMetaData();
            return metadata.getDatabaseProductName() != null
                    && metadata.getDatabaseProductName().toLowerCase().contains("postgresql");
        } catch (SQLException ex) {
            return false;
        }
    }
}