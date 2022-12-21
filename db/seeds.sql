-- seed file I created to see if values could be augmented
INSERT INTO department(department_name)
VALUES
    ("Engineering"),
    ("Operations"),
    ("Quality Assurance"),
    ("Executive");

INSERT INTO job(title,salary,department_id)
VALUES
    ("Lead Engineer", 120000.00, 1),
    ("Enginner", 95000.00, 1),
    ("Entry Engineer", 70000.00, 1),
    ("Planning Manager", 70000.00, 2),
    ("Sales",60000.00, 2),
    ("Accounting", 70000.00, 2),
    ("Product Testing", 50000.00, 3),
    ("COO", 250000.00, 4),
    ("CEO", 350000.00, 4);

INSERT INTO employee(first_name, last_name, job_id, manager_id)
VALUES
    ("Oliver","Queen",1,1),
    ("Dinah","Lance",2,1),
    ("Roy","Harper",3,1),
    ("Jack","White",4,2),
    ("Harleen","Quinzel",5,2),
    ("Edward","Nigma",6,2),
    ("Barry","Allen",7,3),
    ("Diana","Prince",8,4),
    ("Bruce","Wayne",9,4);