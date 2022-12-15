DROP DATABASE IF EXISTS employee_data;

CREATE DATABASE employee_data;

USE employee_data;

CREATE TABLE department (
 id INT AUTO_INCREMENT PRIMARY KEY,
 department_name VARCHAR(30) NOT NULL
);

CREATE TABLE job (
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT Not NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 job_id INT NOT NULL,
 manager_id INT,
 FOREIGN KEY (job_id) REFERENCES job (id) ON DELETE SET NULL,
 FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE SET NULL
);