import { Employee } from "../../core/entities/Employee";

export interface IEmployeeRepository {
    GetAll(): Promise<Employee[]>;
    GetById(empid: number): Promise<Employee>;
}