import React from 'react';
import axios from 'axios';
import {config} from 'shared/constants/config';
import {getStoredCustomers, storeCustomers} from 'shared/store/customers';
import {excludeCustomer, mapFields} from 'shared/helpers/customers';
import {ICustomer} from 'shared/types/types';



export type IdeleteCustomer = (customer: ICustomer) => void

type IAction =
	| {type: 'INIT'}
	| {type: 'SUCCESS', payload: ICustomer[]}
	| {type: 'FAILURE', payload: unknown}


const dataReducer = (state: any, action: IAction) => {
	switch (action.type) {
		case 'INIT':
			return {...state, isLoading: true};
		case 'SUCCESS':
			return {...state, isLoading: false, data: action.payload};
		case 'FAILURE':
			return {...state, isLoading: false, error: action.payload};
		default:
			throw new Error();
	}
};


export default function useCustomers() {
	const {API_URL} = config;

	const [state, dispatch] = React.useReducer(dataReducer, {
		isLoading: false,
		error: false,
		data: getStoredCustomers(),
	});

	React.useEffect(() => {
		let didCancel = false;

		const fetchData = async () => {
			dispatch({type: 'INIT'});

			try {
				const result = await axios(API_URL);

				if (!didCancel) {
					const customers = mapFields(result.data);
					storeCustomers(customers);
					dispatch({type: 'SUCCESS', payload: customers});
				}

			} catch (error) {

				if (!didCancel) {
					dispatch({type: 'FAILURE', payload: error});
				}
			}
		};

		if (!state.data || !state.data.length) {
			fetchData();
		}

		return () => {
			didCancel = true;
		};

	}, [API_URL, state.data])


	const deleteCustomer: IdeleteCustomer = (customer) => {
		const remainingCustomers = excludeCustomer(customer);
		if (remainingCustomers) {
			storeCustomers(remainingCustomers);
			dispatch({type: 'SUCCESS', payload: remainingCustomers});
		} else {
			dispatch({type: 'FAILURE', payload: {message: 'Error while deleting customer.'}});
		}
	}

	return [state, deleteCustomer] as const;
}