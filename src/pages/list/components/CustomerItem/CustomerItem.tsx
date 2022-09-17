import {useNavigate} from 'react-router-dom';
import './CustomerItem.scss';
import { isThisMonth, formatBirthDate } from 'shared/helpers';
import {ICustomer} from 'shared/types/types';
import {IdeleteCustomer} from 'pages/list/hooks/UseCustomers';



type ICustomerItem = {
	customer: ICustomer,
	onDelete: IdeleteCustomer
}

export function CustomerItem({
	customer,
	onDelete
}: ICustomerItem) {

	const navigate = useNavigate();

	const {firstName, lastName, birthDate, email, avatar, hasContract} = customer;
	const isBirthdayThisMonth = isThisMonth(birthDate);
	const highlight = isBirthdayThisMonth ? 'highlight' : '';

	function handleOnDelete(e: React.SyntheticEvent) {
		e.stopPropagation();
		onDelete(customer);
	}

	function handleOnClick() {
		navigate(customer.id);
	}

	
	return (
		<div className={`list-item mb-3 px-3 py-2 ${highlight}`} onClick={handleOnClick}>
			<div className="photo mb-2">
				<img src={avatar} alt={`${firstName} ${lastName}`} />
			</div>
			<div className="row justify-content-between align-items-stretch">
				<div className="col">
					<div className="field-ct">Name: {firstName} {lastName}</div>
					<div className="field-ct">Birthday: {formatBirthDate(birthDate)}</div>
					<div className="field-ct">Email: {email}</div>
					<div className="field-ct hascontract">Contract: {hasContract ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</div>
				</div>
				<div className="col-auto d-flex align-items-center" onClick={handleOnDelete}>
					<div className="delete">
						<i className="fa-solid fa-trash"></i>
					</div>
				</div>
			</div>
		</div>
	)
}