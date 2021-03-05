CREATE DATABASE chatterboxdb;

USE chatterboxdb;

CREATE TABLE messagesTABLE (
  /* Describe your table here.*/
  MessageID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  MessageTEXT varchar(255),
  User int,
  Room varchar(255)
  -- FOREIGN KEY (User) REFERENCES userTABLE (UserID),
  -- FOREIGN KEY (Room) REFERENCES roomTABLE (RoomID)
);

CREATE TABLE userTABLE (
  UserID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserNAME varchar(255)
  -- FOREIGN KEY (Messages) REFERENCES messagesTABLE (MessageID)
);

ALTER TABLE messagesTABLE ADD FOREIGN KEY (User) REFERENCES userTABLE (UserID);
-- CREATE TABLE roomTABLE (
--   RoomID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   RoomNAME varchar(255),
--   RoomMESSAGES int
--   -- FOREIGN KEY (RoomMESSAGES) REFERENCES messagesTABLE (MessageID)
-- );
/* Create other tables and define schemas for them here! */
-- ALTER TABLE messagesTABLE ADD FOREIGN KEY (Room) REFERENCES roomTABLE (RoomID);
-- ALTER TABLE userTABLE ADD FOREIGN KEY (Messages) REFERENCES messagesTABLE (MessageID);
-- ALTER TABLE roomTABLE ADD FOREIGN KEY (RoomMESSAGES) REFERENCES messagesTABLE (MessageID);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

