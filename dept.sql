USE bamazon;

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs FLOAT(5,2) NOT NULL,
    PRIMARY KEY (department_id)
);