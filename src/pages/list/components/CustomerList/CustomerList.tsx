import './CustomerList.scss';
import CustomerItem from '../CustomerItem';
import {ICustomer} from 'shared/types/types';
import {IdeleteCustomer} from 'pages/list/hooks/UseCustomers';


type ICustomerList = {
	isLoading: boolean,
	error: {message: string},
	data: ICustomer[],
	onItemDelete: IdeleteCustomer
}

export function CustomerList({
	isLoading,
	error,
	data: customers,
	onItemDelete
}: ICustomerList) {

	let message = null;

	if (isLoading) {
		message = 'Loading...';
	} else if (error) {
		message = error.message;
	} else if (!customers.length) {
		message = 'No results!';
	}

	return (
		<div className="list-ct col p-3">
			{message && <div className="message">{message}</div>}

			{!!customers.length && customers.map(customer => {
				return <CustomerItem
					key={`${customer.id}-${customer.firstName}`}
					customer={customer}
					onDelete={onItemDelete}
				/>
			})}

		</div>
	)
}