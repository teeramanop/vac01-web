import { ClientForm } from './ClientForm';

export class Customer{
    customerId: string;
	userId: string;
	firstName: string;
	lastName: string;
	idCard: string;
	email: string;
	tel_1: string;
	tel_2: string;
	gender: string;
	birthDate: string;
	type: string;
	clientStatus: string;
	
	clientType: string;
	cgType: string;
	onTimeStatus: string;
	
	customerClient: ClientForm[];
	customerOrders: [];
}