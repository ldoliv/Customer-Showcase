import {useParams, useNavigate} from 'react-router-dom';
import { getCustomerByID } from 'shared/helpers/customers';
import CustomerDetails from './components/CustomerDetails';


export function DetailPage() {

	const navigate = useNavigate();
	const params = useParams();
	const {id} = params;

	const customer = getCustomerByID(id);

	
	let output = null;
	if (customer) {
		output =
			<CustomerDetails
				customer={customer}
			/>
	} else {
		output = <div className='message'>No customer information</div>
	}
	
	return (
		<div className="d-flex flex-column h-100">

			<div className="inner-detail col" style={{overflow: 'hidden'}}>
				<div className="list-ct h-100 p-3 py-4">
					<div className="form-ct">
						{output}
					</div>
				</div>
			</div>

			<div className="btns-ct p-3">
				<div className="row justify-content-between">
					<div className="col-auto">
						<button className="btn btn-back" onClick={() => navigate(-1)}>
							<div className="icon me-2">
								<i className="fa-solid fa-arrow-left"></i>
							</div>
							Back
						</button>
					</div>
				</div>
			</div>

		</div>
	)
}
