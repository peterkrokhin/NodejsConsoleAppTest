import { IEmployeeRepository } from "../app/interfaces/IEmployeeRepository";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { Employee } from "../core/entities/Employee";
import { config } from "mssql";

let dbConfig: config = {
    server: 'TMN-W-00016',
    database: 'TSQL2012',
    user: 'sql_client',
    password: 'qwerty',
    options: {
        enableArithAbort: true,
    }
};

let employees: IEmployeeRepository = new EmployeeRepository(dbConfig);

(async () => {
    try {
        let emp: Employee = await employees.GetById(1000);
        console.log(`empid=${emp.empid}, firstname=${emp.firstname} ` +
            `lastname=${emp.lastname}, region=${emp.region}`);
    }
    catch (err) {
        console.log(err);
    }
})();

(async () => {
    try {
        let emps: Employee[] = await employees.GetAll();

        emps.forEach((emp) => console.log(`empid=${emp.empid}, firstname=${emp.firstname} ` +
            `lastname=${emp.lastname}, region=${emp.region}`));
    }
    catch (err) {
        console.log(err);
    }
})();
