import {getUniquePropertyValues} from "shared/helpers";
import {getStoredCustomers} from "shared/store/customers";
import type {ICustomer} from "shared/types/types";
import type {IFieldBase} from "shared/types/types";



export const getCustomerByID = (id: string | undefined): ICustomer | undefined => {
	const customers = getStoredCustomers();
	return customers.find(customer => customer.id === id);
}

export const excludeCustomer = (customer: ICustomer): ICustomer[] | null => {
	const customers = getStoredCustomers();
	const foundIndex = customers.findIndex(cust => cust.id === customer.id);
	if (foundIndex > -1) {
		customers.splice(foundIndex, 1);
	} else {
		return null;
	}
	return customers;
}

export const getCustomerPropertyValues = (property: keyof ICustomer) => {
	const customers = getStoredCustomers();
	if (customers) {
		return getUniquePropertyValues(property, customers);
	}
	return []
}

export const mapFields = (customers: any[]): ICustomer[] => {
	return customers.map(customer => ({
		...customer,
		id: customer.id.toString()
	}))
}

export const getCustomerFilterFields = (): IFieldBase[] => {
	return [
		{
			name: 'hasContract',
			label: 'Has contract',
			fieldType: 'toggle',
		},
		{
			name: 'gender',
			label: 'Gender',
			fieldType: 'radio',
		}
	];
}
