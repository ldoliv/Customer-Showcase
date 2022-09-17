import './CustomerDetails.scss';
import {formatBirthDate} from 'shared/helpers';
import type { ICustomer } from 'shared/types/types';


type IProps = {
	customer: ICustomer
}

export function CustomerDetails({customer}: IProps) {

	const {firstName, lastName, birthDate, email, avatar, hasContract} = customer;

	return (
		<>
			<div className="photo mb-2">
				<img src={avatar} alt={`${firstName} ${lastName}`} />
			</div>
			<div className="row justify-content-between align-items-center">
				<div className="col">
					<div className="field-ct">Name: {firstName} {lastName}</div>
					<div className="field-ct">Birthday: {formatBirthDate(birthDate)}</div>
					<div className="field-ct">Email: {email}</div>
					<div className="field-ct hascontract">Contract: {hasContract ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</div>
				</div>
			</div>
		</>
	)
}