-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS employee;
USE employee;

-- Create users
CREATE USER 'aditya'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'venu'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges to users
GRANT ALL PRIVILEGES ON employee.* TO 'aditya'@'localhost';
GRANT ALL PRIVILEGES ON employee.* TO 'venu'@'localhost';

-- Create table employee if it doesn't exist
CREATE TABLE IF NOT EXISTS employee (
    S_no VARCHAR(20) NULL,
    Name VARCHAR(50) NULL,
    Email_id VARCHAR(50) NULL,
    Contact VARCHAR(50) NULL
);

-- Insert data into employee table
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('1', 'Manasa', 'manu@gmail.com', '9843562345');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('2', 'sravani', 'sravani@gmail.com', '2357896543');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('3', 'Radhika', 'radhika@gmail.com', '5687323254');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('4', 'srija', 'srija@gmail.com', '8976655657');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('6', 'gouthami', 'gouthami@gmail.com', '5688996643');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('7', 'Ashrath', 'ashrath@gmail.com', '3456678231');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('8', 'Akhila', 'Akhila@gmail.com', '9833445566');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('9', 'swetha', 'swetha@gmail.com', '4334564768');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('10', 'Archana', 'archana@gmail.com', '5443565964');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('11', 'Lavitha', 'lavitha@gmail.com', '2345657644');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('12', 'tejaswini', 'teja@gmail.com', '3445566577');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('13', 'preethi', 'preethi@gmail.com', '4532678878');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('14', 'raju', 'raju@gmail.com', '3434567589');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('15', 'ramu', 'ramu@gmail.com', '9843434456');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('16', 'ravi', 'ravi@gmail.com', '3244588755');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('17', 'rama', 'rama@gmail.com', '3455874356');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('18', 'rakesh', 'raki@gmail.com', '8542357746');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('19', 'teja', 'teja@gmail.com', '3556467678');
INSERT INTO employee (S_no, Name, Email_id, Contact) VALUES ('20', 'bunny', 'bunny@gmail.com', '3576788987');
