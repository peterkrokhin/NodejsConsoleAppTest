import { Employee } from "../../core/entities/Employee";
import { IEmployeeRepository } from "../../app/interfaces/IEmployeeRepository";
import { ConnectionPool, config, Int, IResult, IRecordSet } from "mssql";

export class EmployeeRepository implements IEmployeeRepository {

    private _dbConfig: config;

    constructor(dbConfig: config) {
        this._dbConfig = dbConfig;
    }

    async GetAll(): Promise<Employee[]> {

        let connection = new ConnectionPool(this._dbConfig);

        try {
            let pool = await connection.connect()
            console.log('connection open');

            let result: IResult<Employee> = await pool.request()
                .query(`SELECT empid, firstname, lastname, region
                            FROM HR.Employees`);
            await connection.close();

            return result.recordset;
        }
        catch (err) {
            throw err;
        }
        finally {
            await connection.close();
            console.log('connection closed');
        }
    }


    async GetById(empid: number): Promise<Employee> {

        let connection = new ConnectionPool(this._dbConfig);

        try {
            let pool = await connection.connect()
            console.log('connection open');

            let result: IResult<Employee> = await pool.request()
                .input('empid', Int, empid)
                .query(`SELECT empid, firstname, lastname, region
                            FROM HR.Employees
                            WHERE empid = @empid`);

            let emp: Employee = result.recordset[0];

            if (typeof(emp) == 'undefined') {
                throw new Error(`Employee id=${empid} not found.`)
            }
            
            return emp;
        }
        catch (err) {
            throw err;
        }
        finally {
            await connection.close();
            console.log('connection closed');
        }
    }
}