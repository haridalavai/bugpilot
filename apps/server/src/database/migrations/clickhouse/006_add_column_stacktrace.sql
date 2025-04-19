ALTER TABLE events
    ADD COLUMN stacktrace Array(String) DEFAULT [];